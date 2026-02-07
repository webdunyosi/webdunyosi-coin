import { useState } from "react"
import Sidebar from "../components/student/Sidebar"
import Header from "../components/student/Header"

const StudentLayout = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Foydalanuvchi ma'lumotlari topilmadi
      </p>
    )

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-[calc(100%/6)]">
        <Header
          student={user}
          onLogout={onLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default StudentLayout
