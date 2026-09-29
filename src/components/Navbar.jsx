import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h1>School Management</h1>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/add-student">Add Student</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
