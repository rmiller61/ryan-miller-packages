import type { TypeOfFileConfig } from "types"

export const typeOfFile = ["VIDEO", "AUDIO", "IMAGE", "DOCUMENT", "ARCHIVE", "FONT"] as const

// TODO: Add more mime types, convert to Map
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const mimeTypeConfigs: Readonly<Array<TypeOfFileConfig>> = [
  {
    extension: ".aac",
    type: "AUDIO",
    MIME: "audio/aac",
  },
  {
    extension: ".abw",
    type: "DOCUMENT",
    MIME: "application/x-abiword",
  },
  {
    extension: ".avif",
    type: "IMAGE",
    MIME: "image/avif",
  },
  {
    extension: ".avi",
    type: "VIDEO",
    MIME: "video/x-msvideo",
  },
  {
    extension: ".bmp",
    type: "IMAGE",
    MIME: "image/bmp",
  },
  {
    extension: ".bz",
    type: "ARCHIVE",
    MIME: "application/x-bzip",
  },
  {
    extension: ".bz2",
    type: "ARCHIVE",
    MIME: "application/x-bzip2",
  },
  {
    extension: ".cda",
    type: "AUDIO",
    MIME: "application/x-cdf",
  },
  {
    extension: ".csv",
    type: "DOCUMENT",
    MIME: "text/csv",
  },
  {
    extension: ".doc",
    type: "DOCUMENT",
    MIME: "application/msword",
  },
  {
    extension: ".docx",
    type: "DOCUMENT",
    MIME: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    extension: ".eot",
    type: "FONT",
    MIME: "application/vnd.ms-fontobject",
  },
  {
    extension: ".gz",
    type: "ARCHIVE",
    MIME: "application/gzip",
  },
  {
    extension: ".gif",
    type: "IMAGE",
    MIME: "image/gif",
  },
  {
    extension: ".ico",
    type: "IMAGE",
    MIME: "image/vnd.microsoft.icon",
  },
  {
    extension: ".jpeg",
    type: "IMAGE",
    MIME: "image/jpeg",
  },
  {
    extension: ".jpg",
    type: "IMAGE",
    MIME: "image/jpeg",
  },
  {
    extension: ".mov",
    type: "VIDEO",
    MIME: "video/quicktime",
  },
  {
    extension: ".mp3",
    type: "AUDIO",
    MIME: "audio/mpeg",
  },
  {
    extension: ".mp4",
    type: "VIDEO",
    MIME: "video/mp4",
  },
  {
    extension: ".mpeg",
    type: "VIDEO",
    MIME: "video/mpeg",
  },
  {
    extension: ".odp",
    type: "DOCUMENT",
    MIME: "application/vnd.oasis.opendocument.presentation",
  },
  {
    extension: ".ods",
    type: "DOCUMENT",
    MIME: "application/vnd.oasis.opendocument.spreadsheet",
  },
  {
    extension: ".odt",
    type: "DOCUMENT",
    MIME: "application/vnd.oasis.opendocument.text",
  },
  {
    extension: ".oga",
    type: "AUDIO",
    MIME: "audio/ogg",
  },
  {
    extension: ".ogv",
    type: "VIDEO",
    MIME: "video/ogg",
  },
  {
    extension: ".ogx",
    type: "VIDEO",
    MIME: "application/ogg",
  },
  {
    extension: ".opus",
    type: "AUDIO",
    MIME: "audio/opus",
  },
  {
    extension: ".otf",
    type: "FONT",
    MIME: "font/otf",
  },
  {
    extension: ".png",
    type: "IMAGE",
    MIME: "image/png",
  },
  {
    extension: ".pdf",
    type: "DOCUMENT",
    MIME: "application/pdf",
  },
  {
    extension: ".ppt",
    type: "DOCUMENT",
    MIME: "application/vnd.ms-powerpoint",
  },
  {
    extension: ".pptx",
    type: "DOCUMENT",
    MIME: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    extension: ".rar",
    type: "ARCHIVE",
    MIME: "application/vnd.rar",
  },
  {
    extension: ".rtf",
    type: "DOCUMENT",
    MIME: "application/rtf",
  },
  {
    extension: ".svg",
    type: "IMAGE",
    MIME: "image/svg+xml",
  },
  {
    extension: ".tar",
    type: "ARCHIVE",
    MIME: "application/x-tar",
  },
  {
    extension: ".tif",
    type: "IMAGE",
    MIME: "image/tiff",
  },
  {
    extension: ".tiff",
    type: "IMAGE",
    MIME: "image/tiff",
  },
  {
    extension: ".ts",
    type: "VIDEO",
    MIME: "video/mp2t",
  },
  {
    extension: ".ttf",
    type: "FONT",
    MIME: "font/ttf",
  },
  {
    extension: ".txt",
    type: "DOCUMENT",
    MIME: "text/plain",
  },
  {
    extension: ".wav",
    type: "AUDIO",
    MIME: "audio/wav",
  },
  {
    extension: ".weba",
    type: "AUDIO",
    MIME: "audio/webm",
  },
  {
    extension: ".webm",
    type: "VIDEO",
    MIME: "video/webm",
  },
  {
    extension: ".webp",
    type: "IMAGE",
    MIME: "image/webp",
  },
  {
    extension: ".woff",
    type: "FONT",
    MIME: "font/woff",
  },
  {
    extension: ".woff2",
    type: "FONT",
    MIME: "font/woff2",
  },
  {
    extension: ".xls",
    type: "DOCUMENT",
    MIME: "application/vnd.ms-excel",
  },
  {
    extension: ".xlsx",
    type: "DOCUMENT",
    MIME: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: ".zip",
    type: "ARCHIVE",
    MIME: "application/zip",
  },
  {
    extension: ".3gp",
    type: "VIDEO",
    MIME: "video/3gpp",
  },
  {
    extension: ".3gp",
    type: "AUDIO",
    MIME: "audio/3gpp",
  },
  {
    extension: ".3g2",
    type: "VIDEO",
    MIME: "video/3gpp",
  },
  {
    extension: ".3g2",
    type: "AUDIO",
    MIME: "audio/3gpp",
  },
  {
    extension: ".7z",
    type: "ARCHIVE",
    MIME: "application/x-7z-compressed",
  },
]

export const archiveExtensions = [".bz", ".bz2", ".gz", ".rar", ".tar", ".zip", ".7z"] as const

export const archiveMIMETypes = [
  "application/x-bzip",
  "application/x-bzip2",
  "application/gzip",
  "application/vnd.rar",
  "application/x-tar",
  "application/zip",
  "application/x-7z-compressed",
] as const

export const audioExtensions = [
  ".aac",
  ".cda",
  ".mp3",
  ".oga",
  ".opus",
  ".wav",
  ".weba",
  ".3gp",
  ".3g2",
] as const

export const audioMIMETypes = [
  "audio/aac",
  "application/x-cdf",
  "audio/mpeg",
  "audio/ogg",
  "audio/opus",
  "audio/wav",
  "audio/webm",
  "video/3gpp",
  "audio/3gpp",
  "video/3gpp",
  "audio/3gpp",
] as const

export const documentExtensions = [
  ".abw",
  ".csv",
  ".doc",
  ".docx",
  ".odp",
  ".ods",
  ".odt",
  ".pdf",
  ".ppt",
  ".pptx",
  ".rtf",
  ".txt",
  ".xls",
  ".xlsx",
] as const

export const documentMIMETypes = [
  "application/x-abiword",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/rtf",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const

export const fontExtensions = [".eot", ".otf", ".ttf", ".woff", ".woff2"] as const

export const fontMIMETypes = [
  "application/vnd.ms-fontobject",
  "font/otf",
  "font/ttf",
  "font/woff",
  "font/woff2",
] as const

export const imageExtensions = [
  ".avif",
  ".bmp",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
] as const

export const imageMIMETypes = [
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/vnd.microsoft.icon",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
] as const

export const videoExtensions = [
  ".avi",
  ".mp4",
  ".mpeg",
  ".ogv",
  ".ogx",
  ".ts",
  ".webm",
  ".3gp",
  ".3g2",
  ".mov",
] as const

export const videoMIMETypes = [
  "video/x-msvideo",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "application/ogg",
  "video/mp2t",
  "video/webm",
  "video/3gpp",
  "audio/3gpp",
  "video/3gpp",
  "audio/3gpp",
  "video/quicktime",
] as const

export const extensions = {
  ARCHIVE: archiveExtensions,
  AUDIO: audioExtensions,
  IMAGE: imageExtensions,
  DOCUMENT: documentExtensions,
  FONT: fontExtensions,
  VIDEO: videoExtensions,
}

export const mimeTypes = {
  ARCHIVE: archiveMIMETypes,
  AUDIO: audioMIMETypes,
  IMAGE: imageMIMETypes,
  DOCUMENT: documentMIMETypes,
  FONT: fontMIMETypes,
  VIDEO: videoMIMETypes,
}
