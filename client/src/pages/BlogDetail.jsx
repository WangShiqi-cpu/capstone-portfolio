// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'

export default function BlogDetail() {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    setLoading(true)
    api(`/blog/${id}`)
      .then((data) => setPost(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const submitComment = async (e) => {
    e.preventDefault()
    setCommentError('')
    try {
      const data = await api(`/blog/${id}/comments`, {
        method: 'POST',
        body: { body: commentBody },
        token
      })
      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), data.data]
      }))
      setCommentBody('')
    } catch (err) {
      setCommentError(err.message)
    }
  }

  if (loading) return <p>Loading post...</p>
  if (error) return <p className="error">Error: {error}</p>
  if (!post) return <p>Post not found.</p>

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="muted">
        by {post.author?.username} · {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="post-content">{post.content}</p>

      <hr />
      <h3>Comments ({post.comments?.length || 0})</h3>
      {(post.comments || []).map((c) => (
        <div key={c._id} className="comment">
          <strong>{c.author?.username || 'anonymous'}</strong>
          <span className="muted"> · {new Date(c.createdAt).toLocaleString()}</span>
          <p>{c.body}</p>
        </div>
      ))}

      {token ? (
        <form onSubmit={submitComment} className="form">
          <h4>Leave a comment</h4>
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
            rows={3}
          />
          <button type="submit">Post comment</button>
          {commentError && <p className="error">{commentError}</p>}
        </form>
      ) : (
        <p className="muted">
          <a href="/login">Log in</a> to leave a comment.
        </p>
      )}
    </article>
  )
}
