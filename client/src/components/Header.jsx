// src/components/Header.jsx
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">MyPortfolio</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/admin">Admin</NavLink>
              <button onClick={handleLogout} className="btn-link">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
