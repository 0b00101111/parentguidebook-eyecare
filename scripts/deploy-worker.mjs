#!/usr/bin/env node
/**
 * Run wrangler versions upload with retries.
 * Cloudflare's API sometimes returns 504 Gateway Timeout on assets-upload-session;
 * retrying usually succeeds.
 */
import { spawn } from 'node:child_process';

const MAX_ATTEMPTS = 3;
const DELAY_MS = 15000;

function run() {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['wrangler', 'versions', 'upload'], {
      stdio: 'inherit',
      shell: true,
    });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
    child.on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await run();
      process.exit(0);
    } catch (err) {
      if (attempt === MAX_ATTEMPTS) {
        console.error(`Deploy failed after ${MAX_ATTEMPTS} attempts.`);
        process.exit(1);
      }
      console.error(`Attempt ${attempt} failed. Retrying in ${DELAY_MS / 1000}s...`);
      await sleep(DELAY_MS);
    }
  }
}

main();
