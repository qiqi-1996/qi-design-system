import pkg from "../package.json"

// Bun v1.3.0 has bug
// await Bun.build({
//     entrypoints: ["./src/index.ts"],
//     outdir: "./dist",
//     naming: {
//         entry: "cli/main",
//     },
//     format: "cjs",
//     target: "node",
//     packages: "external",
//     banner: "#!/usr/bin/env node",
// })

pkg.type = "commonjs"
await Bun.write("./dist/cli/package.json", JSON.stringify(pkg))
