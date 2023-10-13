import type { UserConfig, EnumRuleConfig } from "@commitlint/types"

const typeEnum: EnumRuleConfig = [
  2,
  "always",
  [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "test",
    "revert",
    "db", // Custom type - for database changes
    "content", // Custom type - for images, videos, etc.
    "chore", // Custom type - for chores, e.g. updating apps/packages
    "wip", // Custom type - for work in progress
    "release", // Custom type - for releases
    "ci", // Custom type - for CI/CD
    "perf", // Custom type - for performance improvements
    "build", // Custom type - for build system changes
    "deps", // Custom type - for dependency updates
    "mgmt", // Custom type - for internal monorepo management changes
    "crud", // Custom type - for CRUD operations
    "security", // Custom type - for security changes
    "config", // Custom type - for configuration changes
    "lint", // Custom type - for linting changes
    "types", // Custom type - for type system changes
    "design", // Custom type - for design changes
    "ui", // Custom type - for UI changes
  ],
]

const commitlintConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": typeEnum,
  },
}

module.exports = commitlintConfig
