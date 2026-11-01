// src/components/Footer.jsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} My Portfolio. Built with React & Express.</p>
      </div>
    </footer>
  )
}
