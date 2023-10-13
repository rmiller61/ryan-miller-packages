import { mimeTypes, extensions, typeOfFile } from "./constants"
import { z } from "zod"

export const mimeTypeEnum = [
  ...mimeTypes.AUDIO,
  ...mimeTypes.IMAGE,
  ...mimeTypes.VIDEO,
  ...mimeTypes.ARCHIVE,
  ...mimeTypes.DOCUMENT,
  ...mimeTypes.FONT,
] as const

export const fileExtensionEnum = [
  ...extensions.AUDIO,
  ...extensions.IMAGE,
  ...extensions.VIDEO,
  ...extensions.ARCHIVE,
  ...extensions.DOCUMENT,
  ...extensions.FONT,
] as const

export const ValidateMimeType = z.enum(mimeTypeEnum)

export const ValidateFileType = z.enum(typeOfFile)

export const ValidateFileExtension = z.enum(fileExtensionEnum)
