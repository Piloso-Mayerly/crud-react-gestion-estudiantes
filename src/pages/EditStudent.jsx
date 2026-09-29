import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchStudent, updateStudent } from '../api/students'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudent(id)
      .then(setFormData)
      .catch((err) => setError(err.message))
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setStatus('Updating student...')
    try {
      await updateStudent(id, formData)
      setStatus('Updated!')
      navigate('/students')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (error) return <p className="status error">{error}</p>
  if (!formData) return <p className="status">Loading student...</p>

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <p className="subtitle">Update the learner's details and save your changes.</p>

      <div className="grid">
        <label>
          First Name
          <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Second Name
          <input name="secondName" value={formData.secondName} onChange={handleChange} required />
        </label>
        <label>
          Admission Number
          <input name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Course
          <input name="course" value={formData.course} onChange={handleChange} required />
        </label>
        <label>
          Image URL
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </label>
      </div>

      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Update Student'}
        </button>
        <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
      </div>
      {status ? <p className="status">{status}</p> : null}
    </form>
  )
}

export default EditStudent
