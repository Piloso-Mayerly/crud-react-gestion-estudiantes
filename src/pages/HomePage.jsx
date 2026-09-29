import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="card hero-card">
      <h2>Welcome to the School Management System</h2>
      <p>Register learners, browse the roster, and manage student records with full CRUD support.</p>
      <div className="hero-actions">
        <Link className="button-link" to="/add-student">Register a Student</Link>
        <Link className="button-link secondary" to="/students">View Students</Link>
      </div>
    </div>
  )
}

export default HomePage
