export const arrayContainsAll = <T extends unknown>(arr: T[], values: T[]) => {
  return values.every((value) => arr.includes(value))
}

export const arrayContainsAny = <T extends unknown>(arr: T[], values: T[]) => {
  return values.some((value) => arr.includes(value))
}

export const arrayContainsNone = <T extends unknown>(arr: T[], values: T[]) => {
  return values.every((value) => !arr.includes(value))
}
