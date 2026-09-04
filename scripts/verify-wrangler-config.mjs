import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const wranglerPath = path.join(rootDir, "wrangler.toml");
const expectedBindings = new Map([
  ["SESSIONS", "SessionDO"],
  ["PROFILES", "ProfileDO"],
  ["PETS", "PetDO"]
]);
const requiredVars = ["APP_NAME", "APP_COACH_NAME"];

function fail(message) {
  console.error(`[predeploy] ${message}`);
  process.exit(1);
}

function normalizeValue(raw) {
  const value = raw.trim();
  if (value.startsWith("\"") && value.endsWith("\"")) {
    return value.slice(1, -1);
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => normalizeValue(item));
  }
  return value;
}

async function main() {
  const text = await readFile(wranglerPath, "utf8");
  const lines = text.split(/\r?\n/);

  const state = {
    topLevel: new Map(),
    assets: new Map(),
    bindings: [],
    migrations: [],
    vars: new Map()
  };

  let section = "root";
  let block = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const sectionMatch = trimmed.match(/^\[\[(.+)\]\]$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      block = section === "durable_objects.bindings" || section === "migrations" ? {} : null;
      if (section === "durable_objects.bindings") state.bindings.push(block);
      if (section === "migrations") state.migrations.push(block);
      continue;
    }

    const tableMatch = trimmed.match(/^\[(.+)\]$/);
    if (tableMatch) {
      section = tableMatch[1];
      block = null;
      continue;
    }

    const entryMatch = trimmed.match(/^([A-Za-z0-9_]+)\s*=\s*(.+)$/);
    if (!entryMatch) continue;

    const [, key, raw] = entryMatch;
    const value = normalizeValue(raw);

    if (section === "root") {
      state.topLevel.set(key, value);
      continue;
    }

    if (section === "assets") {
      state.assets.set(key, value);
      continue;
    }

    if (section === "durable_objects.bindings" && block) {
      block[key] = value;
      continue;
    }

    if (section === "migrations" && block) {
      block[key] = value;
      continue;
    }

    if (section === "vars") {
      state.vars.set(key, value);
    }
  }

  const name = state.topLevel.get("name");
  if (name !== "net-pet-ai") {
    fail(`wrangler.toml name must be "net-pet-ai" but found ${JSON.stringify(name)}`);
  }

  const main = state.topLevel.get("main");
  if (main !== "src/index.js") {
    fail(`wrangler.toml main must be "src/index.js" but found ${JSON.stringify(main)}`);
  }

  const compatibilityDate = state.topLevel.get("compatibility_date");
  if (!compatibilityDate) {
    fail("wrangler.toml compatibility_date is required");
  }

  const mainPath = path.join(rootDir, main);
  const assetsDir = state.assets.get("directory");
  const assetsBinding = state.assets.get("binding");
  const assetsPath = assetsDir ? path.join(rootDir, assetsDir) : "";

  if (!assetsDir) {
    fail("wrangler.toml is missing [assets].directory");
  }
  if (assetsBinding !== "ASSETS") {
    fail(`wrangler.toml [assets].binding must be "ASSETS" but found ${JSON.stringify(assetsBinding)}`);
  }
  if (!assetsPath) {
    fail("wrangler.toml assets directory could not be resolved");
  }

  const actualBindings = new Map();
  for (const binding of state.bindings) {
    if (!binding?.name || !binding?.class_name) continue;
    actualBindings.set(binding.name, binding.class_name);
  }
  const bindingProblems = [];
  for (const [bindingName, className] of expectedBindings.entries()) {
    const actualClass = actualBindings.get(bindingName);
    if (!actualClass) {
      bindingProblems.push(`${bindingName} -> ${className} (missing)`);
      continue;
    }
    if (actualClass !== className) {
      bindingProblems.push(`${bindingName} -> expected ${className}, found ${actualClass}`);
    }
  }
  if (bindingProblems.length > 0) {
    fail(`durable object binding mismatch: ${bindingProblems.join(", ")}`);
  }

  const migration = state.migrations[0] || {};
  if (migration.tag !== "v1-net-pet-core") {
    fail(`migration tag must be "v1-net-pet-core" but found ${JSON.stringify(migration.tag)}`);
  }
  const newSqliteClasses = Array.isArray(migration.new_sqlite_classes) ? migration.new_sqlite_classes : [];
  const requiredClasses = ["SessionDO", "ProfileDO", "PetDO"];
  const missingClasses = requiredClasses.filter((className) => !newSqliteClasses.includes(className));
  if (missingClasses.length > 0) {
    fail(`migration v1-net-pet-core is missing sqlite classes: ${missingClasses.join(", ")}`);
  }

  const compatibilityFlags = state.topLevel.get("compatibility_flags");
  if (!Array.isArray(compatibilityFlags) || !compatibilityFlags.includes("nodejs_compat")) {
    fail('wrangler.toml compatibility_flags must include "nodejs_compat"');
  }

  const missingVars = requiredVars.filter((key) => !state.vars.has(key));
  if (missingVars.length > 0) {
    fail(`wrangler.toml vars missing: ${missingVars.join(", ")}`);
  }

  const missingFiles = [];
  if (!await isFile(mainPath)) missingFiles.push(main);
  if (!await isDirectory(assetsPath)) missingFiles.push(assetsDir);
  if (missingFiles.length > 0) {
    fail(`required project paths are missing: ${missingFiles.join(", ")}`);
  }

  console.log("[predeploy] wrangler.toml and local project layout look good.");
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function isDirectory(dirPath) {
  try {
    return (await stat(dirPath)).isDirectory();
  } catch {
    return false;
  }
}

main().catch((error) => {
  fail(error?.message || String(error));
});
