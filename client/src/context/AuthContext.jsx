// src/context/AuthContext.jsx
// Global auth state: token + user persisted in localStorage, with
// login / register / logout helpers. Consumed by the whole app.
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = async (email, password) => {
    const data = await api('/users/login', {
      method: 'POST',
      body: { email, password }
    })
    setToken(data.token)
    setUser({ _id: data._id, email: data.email })
    return data
  }

  const register = async (username, email, password) => {
    const data = await api('/users/register', {
      method: 'POST',
      body: { username, email, password }
    })
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
