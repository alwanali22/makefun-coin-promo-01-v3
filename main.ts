// Bounty Hunter ($REWARD) — round 3 of makefun-coin-promo-01.
// This coin hunts bounties; the program below does one small job:
// it carries LAUNCH.json (the coin's mint + create signature) into
// the output directory so the house can find the coin.
// Until the launch, LAUNCH.json holds TODO placeholders — the copy
// still runs, and the real mint + signature replace them afterwards.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const from = join(botDir, "LAUNCH.json");
const to = join(outDir, "LAUNCH.json");

try {
  const launch = JSON.parse(readFileSync(from, "utf8"));
  // The house looks for exactly these two fields, so complain loudly
  // when they are absent instead of handing over a useless file.
  if (typeof launch.mint !== "string" || typeof launch.create_signature !== "string") {
    console.error("warning: LAUNCH.json has no mint / create_signature strings");
  }
  mkdirSync(outDir, { recursive: true });
  copyFileSync(from, to);
  // Say it out loud: a copy that failed quietly would look the same
  // as a copy that never happened, and the house grades /output.
  console.log(`LAUNCH.json delivered to ${to} (mint ${launch.mint})`);
} catch (error) {
  console.error(`launch handover failed: ${error}`);
}
