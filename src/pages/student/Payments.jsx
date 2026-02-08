import { useState, useEffect } from "react"
import { MdCheckCircle, MdCancel, MdCalendarMonth } from "react-icons/md"

const Payments = ({ user }) => {
  const [paymentData, setPaymentData] = useState({
    coursePayment: 600000,
    paidMonths: [],
    totalPaid: 0,
    debt: 0,
  })

  useEffect(() => {
    if (user) {
      setPaymentData({
        coursePayment: user.coursePayment || 600000,
        paidMonths: user.paidMonths || [],
        totalPaid: user.totalPaid || 0,
        debt: user.debt || 0,
      })
    }
  }, [user])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm"
  }

  const formatMonthYear = (monthStr) => {
    const [year, month] = monthStr.split("-")
    const monthNames = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  const currentYear = 2026
  const currentMonth = 2
  const allMonths = []
  
  for (let i = 1; i <= currentMonth; i++) {
    allMonths.push(`${currentYear}-${String(i).padStart(2, "0")}`)
  }

  const isPaid = (monthStr) => paymentData.paidMonths.includes(monthStr)

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
            Kurs To'lovlari
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            O'quvchining to'lov ma'lumotlari va qarzi haqida
          </p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Course Payment Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-green-500/30 rounded-xl p-6 shadow-lg shadow-green-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <MdCalendarMonth className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400">
                Oylik to'lov
              </h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              {formatCurrency(paymentData.coursePayment)}
            </p>
          </div>

          {/* Total Paid Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MdCheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400">
                To'langan
              </h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              {formatCurrency(paymentData.totalPaid)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {paymentData.paidMonths.length} oy to'langan
            </p>
          </div>

          {/* Debt Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-red-500/30 rounded-xl p-6 shadow-lg shadow-red-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <MdCancel className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400">Qarzi</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-400">
              {formatCurrency(paymentData.debt)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {paymentData.debt === 0 ? "Qarzi yo'q" : "To'lanishi kerak"}
            </p>
          </div>
        </div>

        {/* Payment Timeline */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-green-500/30 rounded-xl p-6 shadow-lg shadow-green-500/10">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">
            To'lovlar tarixi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allMonths.map((month) => (
              <div
                key={month}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  isPaid(month)
                    ? "bg-green-500/20 border border-green-500/50 shadow-md shadow-green-500/20"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isPaid(month) ? (
                    <MdCheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <MdCancel className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <p className="font-semibold text-white">
                      {formatMonthYear(month)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatCurrency(paymentData.coursePayment)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPaid(month)
                      ? "bg-green-500/30 text-green-300"
                      : "bg-red-500/30 text-red-300"
                  }`}
                >
                  {isPaid(month) ? "To'langan" : "To'lanmagan"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-zinc-900/50 border border-green-500/20 rounded-lg">
          <p className="text-sm text-gray-400">
            <span className="text-green-400 font-semibold">Eslatma:</span>{" "}
            To'lov ma'lumotlari avtomatik ravishda yangilanadi. Agar
            to'lovda muammo bo'lsa, o'qituvchi bilan bog'laning.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payments
