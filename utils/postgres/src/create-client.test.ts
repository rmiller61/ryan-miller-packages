import { createClient } from "./create-client"
import { PostgresError } from "./errors"
import {
  MOCKED_DIRECT_CONNECTION_STRING,
  MOCKED_LOCALHOST_CONNECTION_STRING,
  MOCKED_POOLED_CONNECTION_STRING,
} from "./mocks"
import type { Client } from "./types"
import { afterAll, afterEach, beforeEach, expect, it, vi } from "vitest"

vi.mock("@neondatabase/serverless", () => {
  return {
    Client: vi.fn().mockImplementation((config: { connectionString: string }) => {
      return {
        query: vi.fn().mockImplementation(() => config.connectionString),
      }
    }),
  }
})

describe("createClient", () => {
  beforeEach(() => {
    process.env.POSTGRES_URL_NON_POOLING = undefined
    process.env.POSTGRES_URL = undefined
  })

  afterEach(() => {
    process.env.POSTGRES_URL_NON_POOLING = undefined
    process.env.POSTGRES_URL = undefined
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it("creates a client with config", async () => {
    const client = createClient({
      connectionString: MOCKED_DIRECT_CONNECTION_STRING,
    })
    expect(await client.query("SELECT now()")).toEqual(MOCKED_DIRECT_CONNECTION_STRING)
  })

  it("creates a client with NON_POOLING env var", async () => {
    process.env.POSTGRES_URL_NON_POOLING = MOCKED_DIRECT_CONNECTION_STRING
    const client = createClient()
    expect(await client.query("SELECT now()")).toEqual(MOCKED_DIRECT_CONNECTION_STRING)
  })

  it("if both config and env var are present, uses config", async () => {
    process.env.POSTGRES_URL_NON_POOLING = "a"
    const client = createClient({ connectionString: "b" })
    expect(await client.query("SELECT now()")).toEqual("b")
  })

  it("throws `PostgresError` if no env var or connection string", () => {
    process.env.POSTGRES_URL_NON_POOLING = undefined
    process.env.POSTGRES_URL = undefined
    expect(createClient).toThrow(PostgresError)
    expect(createClient).toThrow("missing_connection_string")
  })

  it("throws error if provided with pooled connection string", () => {
    const bad = (): Client => createClient({ connectionString: MOCKED_POOLED_CONNECTION_STRING })
    expect(bad).toThrow(PostgresError)
    expect(bad).toThrow("invalid_connection_string")
  })

  it("does not throw error if provided with local connection string", () => {
    const good = (): Client =>
      createClient({ connectionString: MOCKED_LOCALHOST_CONNECTION_STRING })
    expect(good).not.toThrow(PostgresError)
  })
})
