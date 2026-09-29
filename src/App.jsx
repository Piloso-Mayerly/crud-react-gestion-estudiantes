import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AddStudentForm from './components/AddStudentForm'
import StudentsList from './components/StudentsList'
import StudentProfile from './pages/StudentProfile'
import EditStudent from './pages/EditStudent'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
