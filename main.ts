import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entryText =
  "I skipped that spot because my map puts it in another apartment, and my bumper has no jurisdiction there.";

function validateEntryText(value) {
  const characterCount = [...value].length;
  const hasLineBreak = /[\r\n]/.test(value);
  const isBlank = value.trim().length === 0;

  if (characterCount < 1 || characterCount > 140 || hasLineBreak || isBlank) {
    throw new Error(`entry failed validation: ${characterCount} characters`);
  }
}

validateEntryText(entryText);

function publishEntry(outputDirectory, text) {
  mkdirSync(outputDirectory, { recursive: true });

  const temporaryPath = join(outputDirectory, ".entry.txt.tmp");
  const finalPath = join(outputDirectory, "entry.txt");
  writeFileSync(temporaryPath, text, "utf8");
  renameSync(temporaryPath, finalPath);
}

publishEntry(process.env.MAKEFUN_OUTPUT_DIR || "/output", entryText);
