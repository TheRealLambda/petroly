let token

export function setToken(newToken) {
  token = `Bearer ${newToken}`
}

export function getToken() {
  return token
}