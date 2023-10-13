export const objectHasUndefined = <T extends unknown>(obj: { [key: string]: T | undefined }) => {
  return Object.keys(obj).some((key) => obj[key] === undefined)
}

export const objectToUrlEncoded = (obj: {
  [key: string | number]: string | number | string[] | number[] | boolean | null | undefined
}) => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&")
}

export const objectsAreEqual = <T extends unknown>(obj1: T, obj2: T) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const isObjectEmpty = <T extends object>(obj: T) => {
  return Object.keys(obj).length === 0
}
