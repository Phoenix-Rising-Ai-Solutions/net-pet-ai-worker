import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const nodeExecutable = process.execPath;

function fail(message) {
  console.error(`[predeploy] ${message}`);
  process.exit(1);
}

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const child = spawn(nodeExecutable, [path.join(__dirname, scriptName)], {
      cwd: rootDir,
      stdio: "inherit",
      shell: false,
      env: process.env
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${scriptName} exited with code ${code}`));
    });
  });
}

async function main() {
  await runScript("verify-wrangler-config.mjs");
  await runScript("verify-cloudflare-token.mjs");
  console.log("[predeploy] All cloud preflight checks passed.");
}

main().catch((error) => {
  fail(error?.message || String(error));
});
