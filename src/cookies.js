const DAY = 864e5

export function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * DAY).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires};path=/`
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (!match) return null
  try { return JSON.parse(decodeURIComponent(match[2])) } catch { return null }
}
