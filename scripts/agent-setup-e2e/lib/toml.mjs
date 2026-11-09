// Minimal TOML reader for MCP client configs (Codex `config.toml`): tables, dotted and
// quoted keys, basic and literal strings, numbers, booleans, arrays (also multi-line)
// and inline tables. Not a full TOML 1.0 parser: no dates, no multi-line strings,
// no arrays of tables. Throws on anything it does not understand, and on a table or
// key defined twice, so a config the agent broke fails loudly.

export function parseToml(text) {
  const root = {};
  let table = root;
  let i = 0;

  const error = (msg) => {
    const line = text.slice(0, i).split("\n").length;
    throw new Error(`TOML line ${line}: ${msg}`);
  };
  const skipSpace = () => {
    while (i < text.length && (text[i] === " " || text[i] === "\t")) i++;
  };
  const skipSpaceNewlinesComments = () => {
    for (;;) {
      skipSpace();
      if (text[i] === "#") while (i < text.length && text[i] !== "\n") i++;
      else if (text[i] === "\n" || text[i] === "\r") i++;
      else return;
    }
  };
  const endOfLine = () => {
    skipSpace();
    if (text[i] === "#") while (i < text.length && text[i] !== "\n") i++;
    if (i < text.length && text[i] !== "\n" && text[i] !== "\r") error(`unexpected "${text[i]}"`);
  };

  const parseBasicString = () => {
    i++; // opening "
    let out = "";
    while (i < text.length && text[i] !== '"') {
      if (text[i] === "\n") error("newline in string");
      if (text[i] === "\\") {
        const c = text[++i];
        const map = { n: "\n", t: "\t", r: "\r", '"': '"', "\\": "\\", b: "\b", f: "\f" };
        if (c in map) out += map[c];
        else if (c === "u" || c === "U") {
          const len = c === "u" ? 4 : 8;
          out += String.fromCodePoint(parseInt(text.slice(i + 1, i + 1 + len), 16));
          i += len;
        } else error(`bad escape \\${c}`);
        i++;
      } else out += text[i++];
    }
    if (text[i] !== '"') error("unterminated string");
    i++;
    return out;
  };
  const parseLiteralString = () => {
    const end = text.indexOf("'", i + 1);
    if (end < 0 || text.slice(i + 1, end).includes("\n")) error("unterminated literal string");
    const out = text.slice(i + 1, end);
    i = end + 1;
    return out;
  };
  const parseKeyPart = () => {
    skipSpace();
    if (text[i] === '"') {
      if (text.startsWith('"""', i)) error("multi-line strings are not supported");
      return parseBasicString();
    }
    if (text[i] === "'") return parseLiteralString();
    const m = /^[A-Za-z0-9_-]+/.exec(text.slice(i));
    if (!m) error("expected a key");
    i += m[0].length;
    return m[0];
  };
  const parseKey = () => {
    const parts = [parseKeyPart()];
    skipSpace();
    while (text[i] === ".") {
      i++;
      parts.push(parseKeyPart());
      skipSpace();
    }
    return parts;
  };

  const parseValue = () => {
    skipSpace();
    const c = text[i];
    if (c === '"') {
      if (text.startsWith('"""', i)) error("multi-line strings are not supported");
      return parseBasicString();
    }
    if (c === "'") {
      if (text.startsWith("'''", i)) error("multi-line strings are not supported");
      return parseLiteralString();
    }
    if (c === "[") {
      i++;
      const arr = [];
      for (;;) {
        skipSpaceNewlinesComments();
        if (text[i] === "]") {
          i++;
          return arr;
        }
        arr.push(parseValue());
        skipSpaceNewlinesComments();
        if (text[i] === ",") i++;
        else if (text[i] !== "]") error("expected , or ] in array");
      }
    }
    if (c === "{") {
      i++;
      const obj = {};
      skipSpace();
      if (text[i] === "}") {
        i++;
        return obj;
      }
      for (;;) {
        const key = parseKey();
        if (text[i] !== "=") error("expected = in inline table");
        i++;
        assign(obj, key, parseValue());
        skipSpace();
        if (text[i] === ",") i++;
        else if (text[i] === "}") {
          i++;
          return obj;
        } else error("expected , or } in inline table");
      }
    }
    const m = /^(true|false|[+-]?(?:inf|nan)|[+-]?[0-9][0-9_]*(?:\.[0-9_]+)?(?:[eE][+-]?[0-9]+)?)/.exec(text.slice(i));
    if (!m) error(`unsupported value starting with "${c}"`);
    i += m[0].length;
    if (m[0] === "true") return true;
    if (m[0] === "false") return false;
    return Number(m[0].replace(/_/g, ""));
  };

  const defined = new Set();
  const assign = (obj, keyParts, value) => {
    let target = obj;
    for (const part of keyParts.slice(0, -1)) {
      if (target[part] === undefined) target[part] = {};
      else if (typeof target[part] !== "object" || Array.isArray(target[part])) error(`key ${part} is not a table`);
      target = target[part];
    }
    const last = keyParts[keyParts.length - 1];
    if (Object.prototype.hasOwnProperty.call(target, last)) error(`duplicate key ${keyParts.join(".")}`);
    target[last] = value;
  };

  for (;;) {
    skipSpaceNewlinesComments();
    if (i >= text.length) break;
    if (text[i] === "[") {
      if (text[i + 1] === "[") error("arrays of tables are not supported");
      i++;
      const key = parseKey();
      if (text[i] !== "]") error("expected ] after table name");
      i++;
      endOfLine();
      const name = JSON.stringify(key);
      if (defined.has(name)) error(`duplicate table [${key.join(".")}]`);
      defined.add(name);
      table = root;
      for (const part of key) {
        if (table[part] === undefined) table[part] = {};
        else if (typeof table[part] !== "object" || Array.isArray(table[part])) error(`[${key.join(".")}] is not a table`);
        table = table[part];
      }
    } else {
      const key = parseKey();
      if (text[i] !== "=") error("expected =");
      i++;
      assign(table, key, parseValue());
      endOfLine();
    }
  }
  return root;
}
