import type { RecordKey } from "@social-hustle/utils-types"

export const deepClone = <T>(obj: T) => structuredClone(obj)

/**export function deepMerge(...objects: object[]) {
  const isObject = (obj: any) => obj && typeof obj === "object"

  function deepMergeInner(target: Record<string, unknown>, source: Record<string, unknown>) {
    Object.keys(source).forEach((key: string) => {
      const targetValue = target[key]
      const sourceValue = source[key]

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue)
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = deepMergeInner(Object.assign({}, targetValue), sourceValue)
      } else {
        target[key] = sourceValue
      }
    })

    return target
  }

  if (objects.length < 2) {
    throw new Error(
      `deepMerge: this function expects at least 2 objects but only ${objects.length} were provided`
    )
  }

  if (objects.some((object) => !isObject(object))) {
    throw new Error(
      `deepMerge: all values should be of type "object". Received: ${JSON.stringify(objects)}`
    )
  }

  const target = objects.shift() as object
  let source: object = {}

  while ((source = objects.shift() as object)) {
    deepMergeInner(target, source)
  }

  return target
}**/

export const removeEmpty = <A extends unknown, T extends Record<RecordKey, A>>(obj: T) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key])
  return obj satisfies NonNullable<Record<RecordKey, A>>
}
