import type { extensions, mimeTypes, typeOfFile } from "./constants"

export type TypeOfFile = (typeof typeOfFile)[number]

export type VideoMimeType = (typeof mimeTypes)["VIDEO"][number]

export type AudioMimeType = (typeof mimeTypes)["AUDIO"][number]

export type ImageMimeType = (typeof mimeTypes)["IMAGE"][number]

export type DocumentMimeType = (typeof mimeTypes)["DOCUMENT"][number]

export type ArchiveMimeType = (typeof mimeTypes)["ARCHIVE"][number]

export type FontMimeType = (typeof mimeTypes)["FONT"][number]

export type VideoFileExtension = (typeof extensions)["VIDEO"][number]

export type AudioFileExtension = (typeof extensions)["AUDIO"][number]

export type ImageFileExtension = (typeof extensions)["IMAGE"][number]

export type DocumentFileExtension = (typeof extensions)["DOCUMENT"][number]

export type ArchiveFileExtension = (typeof extensions)["ARCHIVE"][number]

export type FontFileExtension = (typeof extensions)["FONT"][number]

export type MimeType =
  | VideoMimeType
  | AudioMimeType
  | ImageMimeType
  | DocumentMimeType
  | ArchiveMimeType
  | FontMimeType

export type FileExtension =
  | VideoFileExtension
  | AudioFileExtension
  | ImageFileExtension
  | DocumentFileExtension
  | ArchiveFileExtension
  | FontFileExtension

export type TypeOfFileConfig =
  | {
      extension: VideoFileExtension
      type: "VIDEO"
      MIME: VideoMimeType
    }
  | {
      extension: AudioFileExtension
      type: "AUDIO"
      MIME: AudioMimeType
    }
  | {
      extension: ImageFileExtension
      type: "IMAGE"
      MIME: ImageMimeType
    }
  | {
      extension: DocumentFileExtension
      type: "DOCUMENT"
      MIME: DocumentMimeType
    }
  | {
      extension: ArchiveFileExtension
      type: "ARCHIVE"
      MIME: ArchiveMimeType
    }
  | {
      extension: FontFileExtension
      type: "FONT"
      MIME: FontMimeType
    }

export type BytesTo =
  | {
      amount: number
      unit: "bytes"
    }
  | {
      amount: number
      unit: "kb"
    }
  | {
      amount: number
      unit: "mb"
    }
  | {
      amount: number
      unit: "gb"
    }
