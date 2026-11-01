// src/pages/Contact.jsx
import React, { useState } from 'react'
import api from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    setError('')
    try {
      await api('/contact', { method: 'POST', body: form })
      setStatus('Thanks! Your message has been sent.')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
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
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
        </label>
        <button type="submit">Send message</button>
        {status && <p className="success">{status}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}
