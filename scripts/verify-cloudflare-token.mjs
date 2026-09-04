const token = process.env.CLOUDFLARE_API_TOKEN?.trim();

function fail(message) {
  console.error(`[predeploy] ${message}`);
  process.exit(1);
}

async function main() {
  if (!token) {
    fail("CLOUDFLARE_API_TOKEN is missing.");
  }

  const response = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok || !body?.success) {
    const details = body?.errors?.length
      ? body.errors.map((error) => error.message || JSON.stringify(error)).join("; ")
      : `HTTP ${response.status}`;
    fail(`Cloudflare token verification failed: ${details}`);
  }

  const status = body?.result?.status || "unknown";
  console.log(`[predeploy] Cloudflare token verified (${status}).`);
}

main().catch((error) => {
  fail(error?.message || String(error));
});
