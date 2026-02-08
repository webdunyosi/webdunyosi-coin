import { useState, useEffect, useMemo } from "react"
import students from "../../data/students.json"
import attendanceData from "../../data/attendance.json"
import { FaCheckCircle, FaTimesCircle, FaSave } from "react-icons/fa"
import { toast } from "react-toastify"
import { sendAttendanceToTelegram } from "../../utils/telegramService"

const Attendance = ({ user }) => {
  // Check if user is a teacher
  const isTeacher = user?.role === "teacher"
  // localStorage'dan davomat ma'lumotlarini yuklash
  const loadAttendance = () => {
    const saved = localStorage.getItem("webcoin_attendance")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error("Failed to load attendance from localStorage:", e)
        return attendanceData
      }
    }
    return attendanceData
  }

  const [attendance, setAttendance] = useState(loadAttendance())
  const [selectedClass, setSelectedClass] = useState(null)

  // Eng so'ngi darslarni olish (memoized)
  const sortedClasses = useMemo(() => {
    return [...attendance].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    )
  }, [attendance])

  // Komponenta yuklanganda birinchi darsni tanlash
  useEffect(() => {
    if (attendance && attendance.length > 0 && !selectedClass) {
      setSelectedClass(sortedClasses[0])
    }
  }, [attendance, selectedClass, sortedClasses])

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
    return selectedClass?.attendees?.includes(studentId) || false
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

  // Davomat holatini o'zgartirish
  const toggleAttendance = (studentId) => {
    if (!selectedClass) return

    const updatedAttendance = attendance.map((cls) => {
      if (cls.id === selectedClass.id) {
        const attendees = cls.attendees.includes(studentId)
          ? cls.attendees.filter((id) => id !== studentId)
          : [...cls.attendees, studentId]
        return { ...cls, attendees }
      }
      return cls
    })

    setAttendance(updatedAttendance)

    // Tanlangan darsni yangilash
    const updatedSelectedClass = updatedAttendance.find(
      (cls) => cls.id === selectedClass.id,
    )
    setSelectedClass(updatedSelectedClass)
  }

  // localStorage'ga saqlash va Telegram'ga yuborish
  const saveAttendance = async () => {
    try {
      // localStorage'ga saqlash
      localStorage.setItem("webcoin_attendance", JSON.stringify(attendance))
      
      // Filter out teacher from students list (only real students)
      const actualStudents = students.filter(student => student.role !== "teacher")
      
      // Send to Telegram
      const telegramResult = await sendAttendanceToTelegram(
        selectedClass,
        actualStudents,
        selectedClass.attendees
      )
      
      if (telegramResult.success) {
        toast.success("Davomat muvaffaqiyatli saqlandi va Telegram botga yuborildi! ✅", {
          position: "top-center",
          autoClose: 3000,
        })
      } else {
        console.error("Telegram send failed:", telegramResult.error)
        toast.warning(`Davomat saqlandi, lekin Telegram'ga yuborishda xatolik: ${telegramResult.error || "Noma'lum xatolik"}`, {
          position: "top-center",
          autoClose: 4000,
        })
      }
    } catch (e) {
      console.error("Failed to save attendance:", e)
      toast.error("Davomatni saqlashda xatolik yuz berdi!", {
        position: "top-center",
        autoClose: 3000,
      })
    }
  }

  // Ma'lumotlar mavjudligini tekshirish
  if (!attendance || attendance.length === 0) {
    return (
      <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
        <div className="relative z-10 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">📋 Davomat</h2>
          <p className="text-gray-400">
            Hozircha davomat ma'lumotlari mavjud emas.
          </p>
        </div>
      </div>
    )
  }

  if (!selectedClass) {
    return (
      <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
        <div className="relative z-10 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">📋 Davomat</h2>
          <p className="text-gray-400">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
      <div className="relative z-10 p-6">
        {/* Header with Save Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">📋 Davomat</h2>
          {isTeacher && (
            <button
              onClick={saveAttendance}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-500/30"
            >
              <FaSave />
              <span className="hidden sm:inline">Saqlash</span>
            </button>
          )}
        </div>

        {/* Info message */}
        <div
          className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
          role="status"
          aria-label={
            isTeacher
              ? "Ma'lumot: O'quvchi kartasini bosib davomat holatini o'zgartiring"
              : "Ma'lumot: Davomat ma'lumotlari faqat ko'rish uchun"
          }
        >
          <p className="text-sm text-blue-300">
            {isTeacher
              ? "💡 O'quvchi kartasini bosing va davomat holatini o'zgartiring"
              : "👁️ Davomat ma'lumotlarini ko'rishingiz mumkin (faqat ko'rish)"}
          </p>
        </div>

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
                  onClick={() => isTeacher && toggleAttendance(student.id)}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    isTeacher ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"
                  } ${
                    present
                      ? `bg-green-500/10 border border-green-500/30 ${isTeacher ? "hover:bg-green-500/20" : ""}`
                      : `bg-red-500/10 border border-red-500/30 ${isTeacher ? "hover:bg-red-500/20" : ""}`
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
        <div className="bg-linear-to-r from-green-500/10 to-lime-500/10 rounded-xl p-6 border border-green-500/20">
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