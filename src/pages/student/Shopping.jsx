import products from "../../data/products.json"
import ProductCard from "../../components/student/ProductCard"
import { LuClipboardList } from "react-icons/lu"
import { MdWarning } from "react-icons/md"

const Shopping = ({ student, onAddToCart }) => {
  // Check if student has debt
  const hasDebt = student && student.debt > 0

  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  // Get unpaid months information
  const getUnpaidMonths = () => {
    if (!student || !student.payments || student.debt === 0) return []
    
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    
    // Get all months that should have been paid
    const paidMonths = student.payments.map(p => `${p.year}-${p.month}`)
    
    // For simplicity, we'll show current month if there's debt
    // In a real app, you'd calculate all unpaid months
    const unpaidInfo = []
    
    // Check if current month is paid
    const currentMonthKey = `${currentYear}-${currentMonth}`
    if (!paidMonths.includes(currentMonthKey)) {
      unpaidInfo.push({
        month: monthNames[currentMonth - 1],
        year: currentYear
      })
    }
    
    // Check previous month if debt is significant and not already added
    if (student.debt >= student.courseFee) {
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear
      const prevMonthKey = `${prevYear}-${prevMonth}`
      
      if (!paidMonths.includes(prevMonthKey) && prevMonthKey !== currentMonthKey) {
        unpaidInfo.push({
          month: monthNames[prevMonth - 1],
          year: prevYear
        })
      }
    }
    
    return unpaidInfo
  }

  const unpaidMonths = getUnpaidMonths()

  return (
    <>
      <div className="w-full relative min-h-full bg-zinc-950">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-green-900/10 via-transparent to-blue-900/10"></div>

        {/* Content - Apply blur when debt exists */}
        <div className={`relative z-10 p-4 md:p-6 lg:p-8 ${hasDebt ? "blur-sm pointer-events-none" : ""}`}>
          <div className="mb-6 md:mb-8">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
              <LuClipboardList className="w-8 h-8" />
              <span>Sovg'alar va mahsulotlar</span>
            </div>
            <p className="text-gray-400 text-sm md:text-base mt-2">
              Tishga yoqadigan sovg'alarni tanlang
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                disabled={hasDebt}
              />
            ))}
          </div>
        </div>

        {/* Overlay Modal for Debt - Positioned absolutely within the shopping container */}
        {hasDebt && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-600/40 backdrop-blur-md">
            <div className="bg-red-500/95 border-4 border-red-400 rounded-2xl p-8 md:p-10 shadow-2xl max-w-2xl mx-4 animate-fadeIn">
              <div className="flex flex-col items-center text-center">
                <MdWarning className="w-16 h-16 md:w-20 md:h-20 text-white mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Qarzdorlik haqida ogohlantirish!
                </h3>
                <div className="space-y-4 text-white w-full bg-red-600/30 rounded-xl p-6">
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold">Sabab:</span> Kurs to'lovi to'liq to'lanmagan
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold">Qarz miqdori:</span>{" "}
                    <span className="text-3xl font-bold block mt-2">{formatCurrency(student.debt)} so'm</span>
                  </p>
                  {unpaidMonths.length > 0 && (
                    <p className="text-lg md:text-xl">
                      <span className="font-semibold">To'lanmagan oylar:</span>{" "}
                      <span className="block mt-2 text-xl font-semibold">
                        {unpaidMonths.map((m, i) => (
                          <span key={i}>
                            {m.month} {m.year}
                            {i < unpaidMonths.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    </p>
                  )}
                </div>
                <p className="text-base md:text-lg text-white mt-6 bg-red-600/50 rounded-lg p-4">
                  ⚠️ Iltimos, qarzdorlikni to'ldiring. To'lov amalga oshirilgandan so'ng sovg'alarni sotib olish imkoniyati ochiladi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Shopping