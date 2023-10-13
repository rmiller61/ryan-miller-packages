import { type Primitive } from "./sql-template"
import type {
  ClientBase,
  ClientConfig,
  PoolConfig,
  QueryResult,
  QueryResultRow,
} from "@neondatabase/serverless"

export type {
  Pool,
  Client,
  Query,
  QueryArrayConfig,
  QueryArrayResult,
  QueryConfig,
  QueryParse,
  QueryResult,
  QueryResultBase,
  QueryResultRow,
  FieldDef,
} from "@neondatabase/serverless"

type ConfigItemsToOmit = "user" | "database" | "password" | "host" | "port"
export type PostgresClientConfig = Omit<ClientConfig, ConfigItemsToOmit>
export type PostgresPoolConfig = Omit<PoolConfig, ConfigItemsToOmit>

export interface PostgresClientBase extends ClientBase {
  sql: <O extends QueryResultRow>(
    strings: TemplateStringsArray,
    ...values: Primitive[]
  ) => Promise<QueryResult<O>>
}

export interface PostgresPoolClient extends PostgresClientBase {
  release: (err?: Error | boolean) => void
}
