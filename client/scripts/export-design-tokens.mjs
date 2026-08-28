import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, "..");
const tokenJsonPath = path.join(clientRoot, "src", "design-tokens.json");
const outputDir = path.join(clientRoot, "src", "styles", "tokens", "exports");

const raw = fs.readFileSync(tokenJsonPath, "utf8");
const tokenDoc = JSON.parse(raw);

function getPathValue(obj, tokenPath) {
  const segments = tokenPath.split(".");
  let current = obj;
  for (const segment of segments) {
    if (current == null || !(segment in current)) {
      throw new Error(`Unresolved token path: ${tokenPath}`);
    }
    current = current[segment];
  }
  return current;
}

function resolveTokenRefs(value, root, seen = new Set()) {
  if (typeof value === "string") {
    const match = value.match(/^\{(.+)\}$/);
    if (!match) {
      return value;
    }

    const tokenPath = match[1];
    if (seen.has(tokenPath)) {
      throw new Error(`Circular token reference: ${tokenPath}`);
    }

    const nextSeen = new Set(seen);
    nextSeen.add(tokenPath);
    return resolveTokenRefs(getPathValue(root, tokenPath), root, nextSeen);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveTokenRefs(item, root, seen));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveTokenRefs(item, root, seen)]),
    );
  }

  return value;
}

function flattenObject(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, nextKey, out);
    } else {
      out[nextKey] = value;
    }
  }
  return out;
}

function cssVarNameFromPath(tokenPath) {
  return `--${tokenPath.replace(/\./g, "-")}`;
}

const resolved = resolveTokenRefs(tokenDoc, tokenDoc);
const flat = flattenObject(resolved);
const cssLines = Object.entries(flat)
  .filter(([, value]) => typeof value === "string" || typeof value === "number")
  .map(([tokenPath, value]) => `  ${cssVarNameFromPath(tokenPath)}: ${value};`);

const cssOutput = `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */\n/* Source: src/design-tokens.json */\n:root {\n${cssLines.join("\n")}\n}\n`;

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, "design-tokens.resolved.json"), `${JSON.stringify(resolved, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputDir, "design-tokens.flat.json"), `${JSON.stringify(flat, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputDir, "design-tokens.css"), cssOutput, "utf8");

console.log("Exported design tokens to src/styles/tokens/exports");
