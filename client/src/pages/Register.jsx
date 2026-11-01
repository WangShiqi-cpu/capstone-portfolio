// src/pages/Register.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(form.username, form.email, form.password)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="narrow">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password (min 6 chars)
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
        <button type="submit">Create account</button>
        {error && <p className="error">{error}</p>}
        <p className="muted">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}
