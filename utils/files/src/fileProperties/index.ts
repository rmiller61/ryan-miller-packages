import { mimeTypeConfigs } from "../constants"
import type { FileExtension, MimeType, TypeOfFileConfig } from "../types"
import { ValidateMimeType, ValidateFileExtension } from "../validations"
import invariant from "tiny-invariant"

export const getFileConfig = (file: File): TypeOfFileConfig => {
  const mimeType = ValidateMimeType.parse(file.type)
  return getFileConfigByMimeType(mimeType)
}

export const getFileConfigByMimeType = (mimeType: MimeType): TypeOfFileConfig => {
  const fileConfig = mimeTypeConfigs.find((config) => config.MIME === mimeType)
  invariant(fileConfig, `Invalid MIME type: ${mimeType}`)
  return fileConfig
}

export const getFileConfigByExtension = (extension: FileExtension): TypeOfFileConfig => {
  const fileConfig = mimeTypeConfigs.find((config) => config.extension === extension)
  invariant(fileConfig, `Invalid file extension: ${extension}`)
  return fileConfig
}

export const getFileMIME = (extension: FileExtension): MimeType => {
  const fileConfig = getFileConfigByExtension(extension)

  return fileConfig.MIME
}

export const getFileExtension = (mimeType: MimeType): FileExtension => {
  const fileConfig = mimeTypeConfigs.find((config) => config.MIME === mimeType)

  if (!fileConfig) {
    throw new Error(`Invalid MIME type: ${mimeType}`)
  }

  return fileConfig.extension
}
