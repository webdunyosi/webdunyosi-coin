import Sidebar from "../components/student/Sidebar"
import Header from "../components/student/Header"

const StudentLayout = ({ user, onLogout, children }) => {
  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Foydalanuvchi ma'lumotlari topilmadi
      </p>
    )

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-0 lg:ml-1/6">
        <Header student={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default StudentLayout
