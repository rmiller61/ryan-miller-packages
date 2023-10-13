type PostgresErrorCode =
  | "invalid_connection_string"
  | "missing_connection_string"
  | "invalid_connection_type"
  | "incorrect_tagged_template_call"

export class PostgresError extends Error {
  public constructor(public code: PostgresErrorCode, message: string) {
    super(`PostgresError - '${code}': ${message}`)
    this.name = "PostgresError"
  }
}
