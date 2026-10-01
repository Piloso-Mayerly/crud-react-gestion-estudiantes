import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchStudent } from '../api/students'

function StudentProfile() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchStudent(id)
      .then((data) => {
        if (!ignore) {
          setStudent(data)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) return <p className="status">Loading profile...</p>

  if (error) {
    return (
      <div className="card">
        <h2>Student not found</h2>
        <p className="status error">{error}</p>
        <Link className="button-link" to="/students">
          Back to students
        </Link>
      </div>
    )
  }

  return (
    <div className="card profile-card">
      <img
        className="profile-image"
        src={student.imageUrl}
        alt={`${student.firstName} ${student.secondName}`}
      />

      <div>
        <h2>
          {student.firstName} {student.secondName}
        </h2>

        <p>
          <strong>Admission Number:</strong> {student.admissionNumber}
        </p>

        <p>
          <strong>Email:</strong> {student.email}
        </p>

        <p>
          <strong>Course:</strong> {student.course}
        </p>

        <div className="actions">
          <Link
            className="btn btn-edit"
            to={`/students/${student.id}/edit`}
          >
            Edit
          </Link>

          <Link className="btn" to="/students">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile