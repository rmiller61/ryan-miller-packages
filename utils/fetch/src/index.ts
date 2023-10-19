/**
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])
 */

import FetchError from "./error"
import merge from "ts-deepmerge"
import type {
  ResponseObject,
  RequestConfig,
  RequestConfigDefaults,
  RequestConfigWithDefaults,
  RequestHeaders,
} from "types"
import { generateBasicAuthHeader } from "utils"

export * from "./types"

const configDefaults: RequestConfigDefaults = {
  method: "GET",
  baseURL: "",
  params: {},
  responseType: "json",
  headers: {},
  responseEncoding: "utf8",
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  validateStatus: (status) => status >= 200 && status < 300,
  statusCodeMap: new Map([
    [200, "OK"],
    [201, "Created"],
    [202, "Accepted"],
    [400, "Bad Request"],
    [401, "Unauthorized"],
    [403, "Forbidden"],
    [404, "Not Found"],
    [405, "Method Not Allowed"],
    [500, "Internal Server Error"],
    [502, "Bad Gateway"],
    [503, "Service Unavailable"],
  ]),
}

export const request = async <T = any, R = ResponseObject<T>, D = any>(
  config: RequestConfig<D>
): Promise<R> => {
  const options = merge(configDefaults, config) as RequestConfigWithDefaults
  if (!options.url) {
    throw new FetchError("URL is required for request")
  }
  let url = options.url

  const customHeaders: RequestHeaders = {}

  let data = options.data

  if (options.transformRequest) {
    options.transformRequest.forEach((transformer) => {
      data = transformer(data, options.headers)
    })
  }

  if (options.auth) {
    customHeaders.authorization = generateBasicAuthHeader(
      options.auth.username,
      options.auth.password
    )
  }

  if (
    data &&
    typeof data === "object" &&
    typeof data.append !== "function" &&
    typeof data.text !== "function"
  ) {
    data = JSON.stringify(data)
    customHeaders["content-type"] = "application/json"
  }

  if (options.xsrfHeaderName) {
    try {
      customHeaders[options.xsrfHeaderName] = decodeURIComponent(
        // @ts-ignore accessing match()[2] throws for no match, which is intentional
        document.cookie.match(RegExp("(^|; )" + options.xsrfCookieName + "=([^;]*)"))[2]
      )
    } catch (e) {}
  }

  if (options.baseURL) {
    url = url.replace(/^(?!.*\/\/)\/?/, options.baseURL + "/")
  }

  if (options.params) {
    url +=
      (~url.indexOf("?") ? "&" : "?") +
      (options.paramsSerializer
        ? options.paramsSerializer(options.params)
        : new URLSearchParams(options.params))
  }

  const fetchFunc = options.fetch || fetch

  const headers = merge(options.headers, customHeaders) as HeadersInit

  const response = { config } as ResponseObject<T>

  return fetchFunc(url, {
    method: options.method.toUpperCase(),
    body: data,
    headers,
    credentials: options.withCredentials ? "include" : undefined,
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
    signal: options.timeout ? AbortSignal.timeout(options.timeout) : null,
  }).then((res) => {
    for (const i in res) {
      if (typeof res[i] != "function") response[i] = res[i]
    }

    const contentLength = res.headers.get("content-length")

    if (
      options.maxContentLength &&
      contentLength &&
      Number(contentLength) > options.maxContentLength
    ) {
      return Promise.reject(new FetchError("maxContentLength exceeded"))
    }

    if (options.responseType == "stream") {
      // @ts-ignore
      response.data = res.body
      return response
    }

    return res[options.responseType || "text"]()
      .then((data) => {
        response.data = data
        // it's okay if this fails: response.data will be the unparsed value:
        response.data = JSON.parse(data)
      })
      .catch(Object)
      .then(() => {
        const ok = options.validateStatus ? options.validateStatus(res.status) : res.ok
        if (options.transformResponse) {
          options.transformResponse?.forEach((transformer) => {
            response.data = transformer(response.data, response.headers)
          })
        }
        return ok
          ? response
          : Promise.reject(new FetchError(`Request failed with status code ${res.status}`))
      })
  })
}
