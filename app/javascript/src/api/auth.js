import api, { setHeaders } from './init'
import { rememberToken, getDecodedToken, getValidToken } from './token'

function extractToken(res) {
  return res.headers.authorization.substring(7)
}

export function signIn(data) {
  setHeaders(getValidToken())
  return api.post('/users/sign_in', data)
  .then((res) => {
    rememberToken(extractToken(res))
    return getDecodedToken()
  })
  .catch((error) => {
    if (/ 401/.test(error.message)) {
      error = new Error('The email/password combination was incorrect')
    }
    throw error
  })
}

export function signUp(data) {
  setHeaders(getValidToken())
  return api.post('/users', data)
  .then((res) => {
    rememberToken(extractToken(res))
    return getDecodedToken()
  })
}

export function signOut() {
  setHeaders(getValidToken())
  return api.delete('/users/sign_out')
  .then((res) => {
    rememberToken(null)
    return null
  })
}