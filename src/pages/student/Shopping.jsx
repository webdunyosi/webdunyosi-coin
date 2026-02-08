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
    "Sentabr",
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
    
    if (student.debt > 0) {
      // Check if current month is paid
      const currentMonthKey = `${currentYear}-${currentMonth}`
      if (!paidMonths.includes(currentMonthKey)) {
        unpaidInfo.push({
          month: monthNames[currentMonth - 1],
          year: currentYear
        })
      }
      
      // Check previous month if debt is significant
      if (student.debt >= student.courseFee) {
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear
        const prevMonthKey = `${prevYear}-${prevMonth}`
        
        if (!paidMonths.includes(prevMonthKey)) {
          unpaidInfo.push({
            month: monthNames[prevMonth - 1],
            year: prevYear
          })
        }
      }
    }
    
    return unpaidInfo
  }

  const unpaidMonths = getUnpaidMonths()

  return (
    <div className="w-full relative min-h-full bg-zinc-950">
      {/* Red Background Overlay for Debt */}
      {hasDebt && (
        <div className="absolute inset-0 bg-red-600/30 z-[5]"></div>
      )}

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/10 via-transparent to-blue-900/10"></div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        {/* Debt Warning Banner */}
        {hasDebt && (
          <div className="mb-6 md:mb-8 bg-red-500/90 border-2 border-red-400 rounded-xl p-6 shadow-2xl relative z-20">
            <div className="flex items-start gap-4">
              <MdWarning className="w-8 h-8 md:w-10 md:h-10 text-white flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Qarzdorlik haqida ogohlantirish!
                </h3>
                <div className="space-y-2 text-white">
                  <p className="text-base md:text-lg">
                    <span className="font-semibold">Sabab:</span> Kurs to'lovi to'liq to'lanmagan
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-semibold">Qarz miqdori:</span>{" "}
                    <span className="text-2xl font-bold">{formatCurrency(student.debt)} so'm</span>
                  </p>
                  {unpaidMonths.length > 0 && (
                    <p className="text-base md:text-lg">
                      <span className="font-semibold">To'lanmagan oylar:</span>{" "}
                      {unpaidMonths.map((m, i) => (
                        <span key={i}>
                          {m.month} {m.year}
                          {i < unpaidMonths.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <p className="text-sm md:text-base text-red-100 mt-3">
                  Iltimos, qarzdorlikni to'ldiring. Sovg'alarni sotib olish uchun avval to'lovni amalga oshiring.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 md:mb-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            <LuClipboardList className="w-8 h-8" />
            <span>Sovg'alar va mahsulotlar</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Tishga yoqadigan sovg'alarni tanlang
          </p>
        </div>

        {/* Products Grid with dimming effect when debt exists */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ${hasDebt ? "opacity-60" : ""}`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shopping
