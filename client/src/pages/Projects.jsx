// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/projects')
      .then((data) => setProjects(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading projects...</p>
  if (error) return <p className="error">Error: {error}</p>

  return (
    <section>
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </section>
  )
}
