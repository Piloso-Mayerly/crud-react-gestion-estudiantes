import { useCallback, useEffect, useState } from 'react'

import { fetchStudents } from '../api/students'

// Custom hook: fetches students and exposes reload + state

export default function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchStudents()
      setStudents(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    fetchStudents()
      .then((data) => {
        if (!ignore) {
          setStudents(data)
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
  }, [])

  return {
    students,
    loading,
    error,
    reload: load,
    setStudents,
  }
}