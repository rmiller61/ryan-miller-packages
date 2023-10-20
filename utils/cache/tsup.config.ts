import { defineConfig, type Options, type Format } from "tsup"

const runAfterLast =
  (commands: Array<string | false>) =>
  (...configs: Options[]) => {
    const [last, ...rest] = configs.reverse()
    return [
      ...rest.reverse(),
      { ...last, onSuccess: [last?.onSuccess, ...commands].filter(Boolean).join(" && ") },
    ]
  }

// Inspo: https://github.com/clerkinc/javascript/blob/main/packages/nextjs/tsup.config.ts

const tsupConfig = defineConfig((overrideOptions) => {
  const common: Options = {
    entry: ["./src/**/*.{ts,tsx,js,jsx}"],
    sourcemap: true,
    legacyOutput: true,
    minify: false,
    clean: true,
    tsconfig: "tsconfig.prod.json",
    bundle: false,
    external: ["node_modules"],
  }

  const esm = {
    ...common,
    format: "esm",
  }

  const cjs = {
    ...common,
    format: "cjs",
    outDir: "./dist/cjs",
  }

  const copyPackageJson = (format: Format) =>
    `cp ./package.${format}.json ./dist/${format}/package.json`

  return runAfterLast(["pnpm build:types", copyPackageJson("esm"), copyPackageJson("cjs")])(
    esm,
    cjs
  )
})

// eslint-disable-next-line import/no-default-export
export default tsupConfig
