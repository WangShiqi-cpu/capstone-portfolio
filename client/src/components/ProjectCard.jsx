// src/components/ProjectCard.jsx
import React from 'react'

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="card project-card">
      {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="card-image" />}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-links">
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Code</a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>}
      </div>
      {onEdit && (
        <div className="card-actions">
          <button onClick={() => onEdit(project)}>Edit</button>
          <button onClick={() => onDelete(project._id)} className="btn-danger">Delete</button>
        </div>
      )}
    </div>
  )
}
