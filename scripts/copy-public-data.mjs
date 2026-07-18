import { cpSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src/data");
const dest = join(root, "public/data");

mkdirSync(dest, { recursive: true });

for (const file of [
  "products-index.json",
  "filters.json",
  "collections.json",
  "categories.json",
  "meta.json",
]) {
  const from = join(src, file);
  if (existsSync(from)) {
    cpSync(from, join(dest, file));
    console.log("copied", file);
  }
}
