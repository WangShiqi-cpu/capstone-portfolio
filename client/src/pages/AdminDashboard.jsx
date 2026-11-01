// src/pages/AdminDashboard.jsx
// Protected route: manage Projects and Blog Posts (create / update / delete).
import React, { useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import ProjectCard from '../components/ProjectCard'
import BlogPostCard from '../components/BlogPostCard'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [tab, setTab] = useState('projects')

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <div className="tabs">
        <button
          className={tab === 'projects' ? 'tab active' : 'tab'}
          onClick={() => setTab('projects')}
        >
          Projects
        </button>
        <button
          className={tab === 'blog' ? 'tab active' : 'tab'}
          onClick={() => setTab('blog')}
        >
          Blog Posts
        </button>
      </div>

      {tab === 'projects' ? (
        <ProjectManager token={token} />
      ) : (
        <BlogManager token={token} />
      )}
    </section>
  )
}

// -------------------- Projects manager --------------------
function ProjectManager({ token }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    _id: null,
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  })

  const load = () => {
    setLoading(true)
    api('/projects')
      .then((d) => setItems(d.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const resetForm = () =>
    setForm({ _id: null, title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (form._id) {
        await api(`/projects/${form._id}`, { method: 'PUT', body: form, token })
      } else {
        await api('/projects', { method: 'POST', body: form, token })
      }
      resetForm()
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const edit = (p) => setForm({ ...p })
  const remove = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await api(`/projects/${id}`, { method: 'DELETE', token })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading projects...</p>

  return (
    <div>
      <form onSubmit={submit} className="form">
        <h3>{form._id ? 'Edit project' : 'New project'}</h3>
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onChange}
          required
          rows={3}
        />
        <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={onChange} />
        <input name="repoUrl" placeholder="Repo URL (optional)" value={form.repoUrl} onChange={onChange} />
        <input name="liveUrl" placeholder="Live URL (optional)" value={form.liveUrl} onChange={onChange} />
        <div className="form-actions">
          <button type="submit">{form._id ? 'Save changes' : 'Create'}</button>
          {form._id && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="grid">
        {items.map((p) => (
          <ProjectCard key={p._id} project={p} onEdit={edit} onDelete={remove} />
        ))}
      </div>
    </div>
  )
}

// -------------------- Blog manager --------------------
function BlogManager({ token }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ _id: null, title: '', content: '' })

  const load = () => {
    setLoading(true)
    api('/blog')
      .then((d) => setItems(d.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const resetForm = () => setForm({ _id: null, title: '', content: '' })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (form._id) {
        await api(`/blog/${form._id}`, { method: 'PUT', body: form, token })
      } else {
        await api('/blog', { method: 'POST', body: form, token })
      }
      resetForm()
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const edit = (p) => setForm({ _id: p._id, title: p.title, content: p.content })
  const remove = async (id) => {
    if (!confirm('Delete this post and its comments?')) return
    try {
      await api(`/blog/${id}`, { method: 'DELETE', token })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading posts...</p>

  return (
    <div>
      <form onSubmit={submit} className="form">
        <h3>{form._id ? 'Edit post' : 'New post'}</h3>
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={onChange}
          required
          rows={6}
        />
        <div className="form-actions">
          <button type="submit">{form._id ? 'Save changes' : 'Create'}</button>
          {form._id && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="grid">
        {items.map((p) => (
          <BlogPostCard key={p._id} post={p} onEdit={edit} onDelete={remove} />
        ))}
      </div>
    </div>
  )
}
