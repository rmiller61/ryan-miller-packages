export interface ResponseObject<T = any, D = any> {
  body?: ReadableStream<Uint8Array> | null
  bodyUsed?: boolean
  config: RequestConfig<D>
  data: T
  headers: Headers
  redirect?: boolean
  request?: any
  status: number
  statusText: string
  type?: ResponseType
}

export type RequestHeaders = Record<string, string | number | boolean> | Headers

export interface BasicCredentials {
  username: string
  password: string
}

export type Params = Record<string, any> | URLSearchParams

export interface RequestConfig<D = any> {
  url?: string
  method?: Method
  baseURL?: string
  fetch?: typeof fetch
  transformRequest?: RequestTransformer[]
  transformResponse?: ResponseTransformer[]
  headers?: RequestHeaders
  params?: Params
  paramsSerializer?: (params: Params) => string
  data?: D
  timeout?: number
  withCredentials?: boolean
  auth?: BasicCredentials
  responseType?: ResponseType
  responseEncoding?: ResponseEncoding | string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  maxContentLength?: number
  validateStatus?: ((status: number) => boolean) | null
  statusCodeMap?: Map<StatusCode, string>
}

export type Method =
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "PURGE"
  | "LINK"
  | "UNLINK"

export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream"

export type ResponseEncoding =
  | "ascii"
  | "ASCII"
  | "ansi"
  | "ANSI"
  | "binary"
  | "BINARY"
  | "base64"
  | "BASE64"
  | "base64url"
  | "BASE64URL"
  | "hex"
  | "HEX"
  | "latin1"
  | "LATIN1"
  | "ucs-2"
  | "UCS-2"
  | "ucs2"
  | "UCS2"
  | "utf-8"
  | "UTF-8"
  | "utf8"
  | "UTF8"
  | "utf16le"
  | "UTF16LE"

export interface RequestTransformer {
  (data: any, headers?: RequestHeaders): any
}

export interface ResponseTransformer {
  (data: any, headers?: Headers): any
}

export type ResponsePromise<T = any> = Promise<ResponseObject<T>>

export type RequestConfigDefaultKeys =
  | "method"
  | "baseURL"
  | "params"
  | "responseType"
  | "headers"
  | "responseEncoding"
  | "xsrfCookieName"
  | "xsrfHeaderName"
  | "validateStatus"
  | "statusCodeMap"

export type RequestConfigDefaults = Required<Pick<RequestConfig, RequestConfigDefaultKeys>>

export type RequestConfigWithDefaults = Omit<RequestConfig, RequestConfigDefaultKeys> &
  RequestConfigDefaults

export type StatusCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 405 | 500 | 502 | 503
