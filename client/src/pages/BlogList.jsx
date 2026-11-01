// src/pages/BlogList.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'
import BlogPostCard from '../components/BlogPostCard'

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/blog')
      .then((data) => setPosts(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading blog...</p>
  if (error) return <p className="error">Error: {error}</p>

  return (
    <section>
      <h2>Blog</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="grid">
          {posts.map((p) => (
            <BlogPostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </section>
  )
}
