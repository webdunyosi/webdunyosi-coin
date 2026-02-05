import { Routes, Route, Navigate } from "react-router-dom"
import StudentLayout from "./layouts/StudentLayout"
import Ranking from "./pages/student/Ranking"
import Shopping from "./pages/student/Shopping"
import Account from "./pages/student/Account"
import students from "./data/students.json"

function App() {
  const currentStudent = students.find((s) => s.id === 1)

  return (
    <Routes>
      <Route
        path="/reyting"
        element={
          <StudentLayout studentId={1}>
            <Ranking />
          </StudentLayout>
        }
      />
      <Route
        path="/sovgalar"
        element={
          <StudentLayout studentId={1}>
            <Shopping />
          </StudentLayout>
        }
      />
      <Route
        path="/xisobim"
        element={
          <StudentLayout studentId={1}>
            <Account student={currentStudent} />
          </StudentLayout>
        }
      />
      <Route path="/" element={<Navigate to="/reyting" />} />
    </Routes>
  )
}

export default App
