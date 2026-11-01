// src/api.js
// Small fetch wrapper. Reads the base URL from VITE_API_URL (falls back to localhost),
// and optionally attaches the JWT as a Bearer header.

const BASE_URL =
  (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')

async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Request failed with ${res.status}`)
  }
  return data
}

export default api
