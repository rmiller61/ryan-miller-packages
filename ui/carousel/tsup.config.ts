import fs from "fs"
import path from "path"
import { defineConfig } from "tsup"

// INFO: This is the only place you need to update when adding new entry folders
const entryFolders = ["components"]

function getAllFilesInDirectory(dirPath: string): string[] {
  return fs.readdirSync(dirPath).reduce<string[]>((allFiles, file) => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      return allFiles.concat(getAllFilesInDirectory(fullPath))
    } else {
      return allFiles.concat("./" + fullPath)
    }
  }, [])
}

export default defineConfig({
  entry: entryFolders
    .map((folder) => getAllFilesInDirectory(`./src/${folder}`))
    .flat()
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx")),
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  outDir: "dist",
  tsconfig: "tsconfig.prod.json",
  onSuccess: async () => {
    const packageJsonPath = "./package.json"
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
    const distFiles = getAllFilesInDirectory("./dist").filter(
      (file) => file.endsWith(".mjs") && !file.includes("chunk")
    )

    packageJson.exports = distFiles.reduce<Record<string, { import: string; types: string }>>(
      (exports, file) => {
        const key = file.replace("dist/", "").replace(".mjs", "").toLocaleLowerCase()
        exports[key] = { import: file, types: file.replace(".mjs", ".d.ts") }
        return exports
      },
      {}
    )

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  },
})
