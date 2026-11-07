#!/usr/bin/env node
// Builds static/brand/wopee-brand-kit-2026.zip (gitignored) at `yarn start` and `yarn build`:
//   DESIGN.md, svg/ and png/ (static/brand), examples/ (static/brand/examples),
//   favicons/ (the favicon and app-icon set from static/img).
// No dependencies and no system zip (Node 22 zlib); a fixed date, so the same files give the same bytes.
"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..");
const BRAND = path.join(ROOT, "static", "brand");
const OUT = path.join(BRAND, "wopee-brand-kit-2026.zip");

const FAVICONS = [
  "favicon.svg",
  "favicon-16.svg",
  "favicon.ico",
  "favicon-16.png",
  "favicon-32.png",
  "favicon-48.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-192.png",
  "icon-maskable-512.png",
];

const dirEntries = (dir, prefix) =>
  fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith("."))
    .sort()
    .map((f) => [`${prefix}/${f}`, path.join(dir, f)]);

const entries = [
  ["DESIGN.md", path.join(ROOT, "DESIGN.md")],
  ...dirEntries(path.join(BRAND, "svg"), "svg"),
  ...dirEntries(path.join(BRAND, "png"), "png"),
  ...dirEntries(path.join(BRAND, "examples"), "examples"),
  ...FAVICONS.map((f) => [`favicons/${f}`, path.join(ROOT, "static", "img", f)]),
];

const DOS_TIME = 0; // 00:00:00
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1; // 2026-01-01
const locals = [];
const centrals = [];
let offset = 0;
for (const [name, file] of entries) {
  const data = fs.readFileSync(file);
  const nameBuf = Buffer.from(name, "utf8");
  const crc = zlib.crc32(data);
  const packed = zlib.deflateRawSync(data, { level: 9 });
  const deflate = packed.length < data.length;
  const body = deflate ? packed : data;
  const method = deflate ? 8 : 0;
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(DOS_TIME, 10);
  local.writeUInt16LE(DOS_DATE, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  locals.push(local, nameBuf, body);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(0x0314, 4); // made by: Unix, 2.0
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(method, 10);
  central.writeUInt16LE(DOS_TIME, 12);
  central.writeUInt16LE(DOS_DATE, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(nameBuf.length, 28);
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38); // -rw-r--r--
  central.writeUInt32LE(offset, 42);
  centrals.push(central, nameBuf);
  offset += 30 + nameBuf.length + body.length;
}
const centralSize = centrals.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(entries.length, 8);
end.writeUInt16LE(entries.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);

fs.writeFileSync(OUT, Buffer.concat([...locals, ...centrals, end]));
console.log(`brand kit: ${entries.length} files, ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(1)} MB → ${path.relative(ROOT, OUT)}`);
