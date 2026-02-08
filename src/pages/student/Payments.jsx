import { MdPayment, MdCheckCircle, MdWarning } from "react-icons/md"

const Payments = ({ student }) => {
  if (!student) {
    return (
      <div className="text-center text-white">
        <p>Student ma'lumotlari topilmadi</p>
      </div>
    )
  }

  // Check if student has payment info
  if (!student.courseFee) {
    return (
      <div className="text-center text-white p-6">
        <p>To'lov ma'lumotlari mavjud emas</p>
      </div>
    )
  }

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const getPaymentStatus = () => {
    if (student.debt === 0) {
      return {
        text: "To'liq to'langan",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        icon: <MdCheckCircle className="w-6 h-6" />,
      }
    } else if (student.totalPaid > 0) {
      return {
        text: "Qisman to'langan",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        icon: <MdWarning className="w-6 h-6" />,
      }
    } else {
      return {
        text: "To'lanmagan",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        icon: <MdWarning className="w-6 h-6" />,
      }
    }
  }

  const status = getPaymentStatus()

  return (
    <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
          <MdPayment className="w-6 h-6" />
          <span>To'lovlar</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Course Fee Card */}
          <div className="bg-zinc-800/70 border border-blue-500/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Kurs to'lovi</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-400">
                {formatCurrency(student.courseFee)}
              </span>
              <span className="text-lg text-blue-300">so'm</span>
            </div>
          </div>

          {/* Total Paid Card */}
          <div className="bg-zinc-800/70 border border-green-500/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">To'langan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-400">
                {formatCurrency(student.totalPaid)}
              </span>
              <span className="text-lg text-green-300">so'm</span>
            </div>
          </div>

          {/* Debt Card */}
          <div
            className={`bg-zinc-800/70 border rounded-xl p-6 ${student.debt === 0 ? "border-green-500/50" : "border-red-500/50"}`}
          >
            <p className="text-gray-400 text-sm mb-2">Qarzdorlik</p>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-bold ${student.debt === 0 ? "text-green-400" : "text-red-400"}`}
              >
                {formatCurrency(student.debt)}
              </span>
              <span
                className={`text-lg ${student.debt === 0 ? "text-green-300" : "text-red-300"}`}
              >
                so'm
              </span>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div
          className={`${status.bgColor} border ${status.borderColor} rounded-xl p-6 mb-8`}
        >
          <div className="flex items-center gap-3">
            <span className={status.color}>{status.icon}</span>
            <div>
              <p className="text-gray-400 text-sm">To'lov holati</p>
              <p className={`${status.color} text-xl font-semibold`}>
                {status.text}
              </p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-zinc-800/70 border border-green-500/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MdPayment className="w-5 h-5" />
            To'lov tarixi
          </h3>

          {student.payments && student.payments.length > 0 ? (
            <div className="space-y-4">
              {student.payments.map((payment, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lime-400 font-semibold text-lg">
                          {monthNames[payment.month - 1]} {payment.year}
                        </span>
                        <MdCheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-gray-400 text-sm">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-400">
                          {formatCurrency(payment.amount)}
                        </span>
                        <span className="text-sm text-green-300">so'm</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MdWarning className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">Hozircha to'lovlar mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payments
