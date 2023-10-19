import { z } from "zod"

/**
 * Get zod object keys recursively
 * @url https://github.com/colinhacks/zod/discussions/2134
 * @param schema Zod schema
 * @returns Array of keys
 */
export const getZodKeys = <T extends z.ZodTypeAny>(schema: T): string[] => {
  // make sure schema is not null or undefined
  if (schema === null || schema === undefined) return []
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
    return getZodKeys(schema.unwrap())
  // check if schema is an array
  if (schema instanceof z.ZodArray) return getZodKeys(schema.element)
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries(schema.shape)
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested =
        value instanceof z.ZodType ? getZodKeys(value).map((subKey) => `${key}.${subKey}`) : []
      // return nested keys
      return nested.length ? nested : key
    })
  }
  // return empty array
  return []
}
