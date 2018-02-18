import decodeJWT from 'jwt-decode'

const key = 'userToken'

export function rememberToken(token) {
  if (token) {
    // Remember the token
    localStorage.setItem(key, token)
  }
  else {
    // Clear the remembered token: sign out
    localStorage.removeItem(key)
  }
}

export function getValidToken() {
  const token = localStorage.getItem(key)
  try {
    const decodedToken = decodeJWT(token)
    const now = Date.now() / 1000
    // Check if token has expired
    if (now > decodedToken.exp) {
      return null
    }
    // Valid token
    return token
  }
  catch (error) {
    // Invalid token
    return null
  }
}

export function getDecodedToken() {
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  }
  else {
    return null
  }
}
