## To-Do:

* Bearer auth
* @type RequestInfo
* @type RequestInit
* Validate/serialize body based on content type
- JSON (application/json)
- Multipart / FormData (multipart/form-data)
- URL encoded form (application/x-www-form-urlencoded)
* Validate content type based on environment
- Server: Stream / Buffer
- Browser: FormData, File, Blob
- Isomorphic: string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
* Adapt every param from axios: https://axios-http.com/docs/req_config
