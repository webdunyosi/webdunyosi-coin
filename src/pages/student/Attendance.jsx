import { useState } from "react"
import students from "../../data/students.json"
import attendance from "../../data/attendance.json"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(attendance[0])

  // Eng so'ngi darslarni olish
  const sortedClasses = [...attendance].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  )

  // Sanani formatlash
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  // O'quvchi darsga kelganligini tekshirish
  const isPresent = (studentId) => {
    return selectedClass.attendees.includes(studentId)
  }

  // Davomat statistikasini hisoblash
  const getAttendanceStats = (studentId) => {
    const totalClasses = attendance.length
    const attended = attendance.filter((cls) =>
      cls.attendees.includes(studentId),
    ).length
    const percentage = Math.round((attended / totalClasses) * 100)
    return { attended, total: totalClasses, percentage }
  }

  return (
    <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">📋 Davomat</h2>

        {/* Dars tanlash */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">
            Darsni tanlang:
          </label>
          <select
            value={selectedClass.id}
            onChange={(e) =>
              setSelectedClass(
                sortedClasses.find(
                  (cls) => cls.id === parseInt(e.target.value),
                ),
              )
            }
            className="w-full md:w-auto px-4 py-2 bg-zinc-900 text-white rounded-lg border border-green-500/30 focus:outline-none focus:border-green-500"
          >
            {sortedClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.day}, {formatDate(cls.date)} - {cls.time}
              </option>
            ))}
          </select>
        </div>

        {/* Davomat jadvali */}
        <div className="bg-zinc-900/70 rounded-xl p-6 border border-green-500/20 mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            {selectedClass.day}, {formatDate(selectedClass.date)} -{" "}
            {selectedClass.time}
          </h3>

          <div className="space-y-3">
            {students.map((student) => {
              const present = isPresent(student.id)
              const stats = getAttendanceStats(student.id)

              return (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    present
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}
                >
                  {/* O'quvchi ma'lumotlari */}
                  <div className="flex items-center gap-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-xs text-gray-400">
                        Davomat: {stats.attended}/{stats.total} (
                        {stats.percentage}%)
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {present ? (
                      <>
                        <FaCheckCircle className="text-green-400 text-2xl" />
                        <span className="text-green-400 font-medium hidden sm:inline">
                          Keldi
                        </span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-red-400 text-2xl" />
                        <span className="text-red-400 font-medium hidden sm:inline">
                          Kelmadi
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dars jadvali ma'lumoti */}
        <div className="bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-xl p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            📅 Dars jadvali
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>• Dushanba - 20:00</p>
            <p>• Chorshanba - 20:00</p>
            <p>• Juma - 20:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
