import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useStudents from '../hooks/useStudents'
import { deleteStudent } from '../api/students'
import StudentCard from './StudentCard'
import ConfirmModal from './ConfirmModal'

function StudentsList() {
  const { students, loading, error, reload } = useStudents()
  const [query, setQuery] = useState('')
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students
    return students.filter((s) =>
      [s.firstName, s.secondName, s.admissionNumber, s.email, s.course]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [students, query])

  const handleConfirmDelete = async () => {
    try {
      await deleteStudent(toDelete.id)
      setToDelete(null)
      reload()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p className="status">Loading students...</p>
  if (error) {
    return (
      <div className="card">
        <h2>Something went wrong</h2>
        <p className="status error">{error}</p>
        <button className="btn" onClick={reload}>Retry</button>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="list-header">
        <h2>Registered Students</h2>
        <input
          className="search"
          placeholder="Search by name, admission, course..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <p>No students found.</p>
          <Link className="button-link" to="/add-student">Register a student</Link>
        </div>
      ) : (
        <div className="student-list">
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={setToDelete}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!toDelete}
        title="Delete student?"
        message={
          toDelete
            ? `Are you sure you want to delete ${toDelete.firstName} ${toDelete.secondName}? This cannot be undone.`
            : ''
        }
        onCancel={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default StudentsList
