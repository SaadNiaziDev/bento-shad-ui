import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { format } from "prettier";
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(`${dir}/${e.name}`)
      : e.name.endsWith(".md")
        ? [`${dir}/${e.name}`]
        : [],
  );
let count = 0;
const failures = [];
for (const file of walk("docs")) {
  const source = readFileSync(file, "utf8");
  let result = "",
    last = 0;
  for (const m of source.matchAll(
    /^```(html|tsx|ts|js|css|json)([^\n]*)\n([\s\S]*?)^```/gm,
  )) {
    const parser = {
      html: "html",
      tsx: "typescript",
      ts: "typescript",
      js: "babel",
      css: "css",
      json: "json",
    }[m[1]];
    let code = m[3];
    try {
      code = await format(code, {
        parser,
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        htmlWhitespaceSensitivity: "ignore",
        singleAttributePerLine: true,
      });
      count++;
    } catch {
      // Usage snippets often show adjacent JSX alternatives after their imports.
      // Format them as a fragment, then remove that temporary wrapper.
      const jsxStart = code.search(/^</m);
      if (m[1] === "tsx" && jsxStart >= 0) {
        try {
          const imports = await format(code.slice(0, jsxStart), {
            parser,
            tabWidth: 4,
            singleQuote: true,
            printWidth: 80,
          });
          const wrapped = await format(
            "<>\n" + code.slice(jsxStart) + "\n</>",
            { parser, tabWidth: 4, singleQuote: true, printWidth: 80 },
          );
          const body = wrapped
            .replace(/^<>\n/, "")
            .replace(/\n<\/>;?\n?$/, "")
            .split("\n")
            .map((line) => (line.startsWith("    ") ? line.slice(4) : line))
            .join("\n");
          code = imports + "\n" + body + "\n";
          count++;
        } catch {
          failures.push(`${file}: ${m[1]}`);
        }
      } else failures.push(`${file}: ${m[1]}`);
    }
    result +=
      source.slice(last, m.index) + "```" + m[1] + m[2] + "\n" + code + "```";
    last = m.index + m[0].length;
  }
  result += source.slice(last);
  if (result !== source) writeFileSync(file, result);
}
console.log(`Formatted ${count} documentation code blocks.`);
console.log("Preserved partial snippets:", failures);
