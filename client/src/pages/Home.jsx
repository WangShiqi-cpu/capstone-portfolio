// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero">
      <h1>Hi, I'm Your Name 👋</h1>
      <p className="lead">
        Computer science student building full-stack web apps with React,
        Node.js and MongoDB. Welcome to my corner of the internet.
      </p>
      <div className="hero-actions">
        <Link to="/projects" className="btn-primary">See my work</Link>
        <Link to="/blog" className="btn-secondary">Read the blog</Link>
      </div>
    </section>
  )
}
