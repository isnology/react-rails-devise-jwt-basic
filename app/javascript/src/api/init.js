import axios from 'axios'

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: 'http://localhost:3000'
})

export function setHeaders(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api