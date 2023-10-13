export function generateBasicAuthHeader(username: string, password: string): string {
  // Combine the username and password with a colon
  const credentials = `${username}:${password}`

  // Encode the credentials in Base64
  const base64Credentials = Buffer.from(credentials).toString("base64")

  // Create the Basic Authorization header
  const header = `Basic ${base64Credentials}`

  return header
}
