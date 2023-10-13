"use strict"

import type { ResponseObject, RequestConfig } from "./types"

export default class FetchError<T = unknown, D = any> extends Error {
  constructor(
    message?: string,
    code?: string,
    config?: RequestConfig<D>,
    request?: any,
    response?: ResponseObject<T, D>
  ) {
    super(message)
    this.code = code
    this.config = config
    this.request = request
    this.response = response
    this.isCustomError = true
    this.name = "FetchError"
    Object.setPrototypeOf(this, FetchError.prototype)
  }

  code?: string
  config?: RequestConfig<D>
  request?: any
  response?: ResponseObject<T, D>
  isCustomError: boolean
  status?: string

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null,
    }
  }
}
