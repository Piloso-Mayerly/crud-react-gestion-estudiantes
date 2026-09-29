import { Link } from 'react-router-dom'

// Reusable student card used in the list view
function StudentCard({ student, onDelete }) {
  return (
    <article className="student-card">
      <img
        src={student.imageUrl}
        alt={`${student.firstName} ${student.secondName}`}
        onError={(e) => {
          e.currentTarget.src =
            'https://ui-avatars.com/api/?background=0f172a&color=fff&name=' +
            encodeURIComponent(`${student.firstName} ${student.secondName}`)
        }}
      />
      <div className="student-info">
        <h3>{student.firstName} {student.secondName}</h3>
        <p><strong>Admission:</strong> {student.admissionNumber}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <div className="actions">
          <Link className="btn btn-view" to={`/students/${student.id}`}>View</Link>
          <Link className="btn btn-edit" to={`/students/${student.id}/edit`}>Edit</Link>
          <button className="btn btn-delete" onClick={() => onDelete(student)}>Delete</button>
        </div>
      </div>
    </article>
  )
}

export default StudentCard
