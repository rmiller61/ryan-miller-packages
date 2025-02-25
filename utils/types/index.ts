export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Compute<T> = { [K in keyof T]: T[K] } | never

type AllKeys<T> = T extends any ? keyof T : never

export type MergedUnion<T, Keys extends keyof T = keyof T> = Compute<
  {
    [K in Keys]: T[Keys]
  } & {
    [K in AllKeys<T>]?: T extends any ? (K extends keyof T ? T[K] : never) : never
  }
>

export type MappedKeys<A, B> = {
  [K in keyof A & keyof B]: A[K] extends B[K] // Basic check for simplicity here.
    ? K // Value becomes same as key
    : never // Or `never` if check did not pass
}

export type IsomorphicKeys<A, B> = MappedKeys<A, B>[keyof A & keyof B]

export type Isomorphic<A, B> = {
  [K in IsomorphicKeys<A, B>]: A[K]
}

export type RecordKey = string | number | symbol

export type RecursiveObject<T> = {
  [K in RecordKey]: T | RecursiveObject<T>
}

export type Primitive = string | number | boolean | bigint | symbol | undefined | null

export type CSSUnit =
  | "em"
  | "ex"
  | "ch"
  | "rem"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "%"
  | "px"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"

/**
 * Utils for working with Maps
 * @url https://stackoverflow.com/questions/60737502/what-is-the-equivalent-of-keyof-for-an-es-map-type
 */
export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never
export type ValueOfMap<M extends Map<unknown, unknown>> = M extends Map<unknown, infer V>
  ? V
  : never

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
