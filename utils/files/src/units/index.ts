import type { BytesTo } from "types"

export const bytesToMb = (bytes: number) => {
  const mb = bytes / 1024 / 1024
  return mb
}

export const bytesToKb = (bytes: number) => {
  const kb = bytes / 1024
  return kb
}

export const bytesToGb = (bytes: number) => {
  const gb = bytes / 1024 / 1024 / 1024
  return gb
}

export const mbToBytes = (mb: number) => {
  const bytes = mb * 1024 * 1024
  return bytes
}

export const kbToBytes = (kb: number) => {
  const bytes = kb * 1024
  return bytes
}

export const mbToGb = (mb: number) => {
  const gb = mb / 1024
  return gb
}

export const gbToMb = (gb: number) => {
  const mb = gb * 1024
  return mb
}

export const gbToBytes = (gb: number) => {
  const bytes = gb * 1024 * 1024 * 1024
  return bytes
}

export const bytesTo = (bytes: number): BytesTo => {
  if (bytes > 1024 * 1024 * 1024) {
    return {
      amount: bytesToGb(bytes),
      unit: "gb",
    }
  }

  if (bytes > 1024 * 1024) {
    return {
      amount: bytesToMb(bytes),
      unit: "mb",
    }
  }

  if (bytes > 1024) {
    return {
      amount: bytesToKb(bytes),
      unit: "kb",
    }
  }

  return {
    amount: bytes,
    unit: "bytes",
  }
}
