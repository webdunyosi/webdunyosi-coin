import students from "../data/students.json" // students.json fayli
import Sidebar from "../components/student/Sidebar"
import Header from "../components/student/Header"

const StudentLayout = ({ studentId, children }) => {
  const student = students.find((s) => s.id === studentId)

  if (!student) return <p>Student topilmadi</p>

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-1/6">
        <Header student={student} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default StudentLayout
