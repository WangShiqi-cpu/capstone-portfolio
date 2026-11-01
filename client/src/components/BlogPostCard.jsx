// src/components/BlogPostCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogPostCard({ post, onEdit, onDelete }) {
  return (
    <div className="card blog-card">
      <h3>
        <Link to={`/blog/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="muted">
        by {post.author?.username || 'unknown'} ·{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p>{post.content.slice(0, 140)}{post.content.length > 140 ? '…' : ''}</p>
      {onEdit && (
        <div className="card-actions">
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post._id)} className="btn-danger">Delete</button>
        </div>
      )}
    </div>
  )
}
