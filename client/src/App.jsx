// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { useAuth } from './context/AuthContext.jsx'

// Wrapper that redirects unauthenticated users to /login.
function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
