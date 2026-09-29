import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="card hero-card">
      <h2>404 — Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="button-link" to="/">Back home</Link>
    </div>
  )
}

export default NotFound
