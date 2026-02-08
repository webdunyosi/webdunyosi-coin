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
    <div className="w-full relative min-h-full bg-zinc-950">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/10 via-transparent to-blue-900/10"></div>

      {/* Content */}
      <div className={`relative z-10 p-4 md:p-6 lg:p-8 ${hasDebt ? "overflow-hidden max-h-screen" : ""}`}>
        <div className="mb-6 md:mb-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            <LuClipboardList className="w-8 h-8" />
            <span>Sovg'alar va mahsulotlar</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Tishga yoqadigan sovg'alarni tanlang
          </p>
        </div>

        {/* Products Grid with blocking when debt exists */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ${hasDebt ? "pointer-events-none select-none" : ""}`}
          aria-hidden={hasDebt ? "true" : "false"}
        >
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

      {/* Payment Required Modal Overlay */}
      {hasDebt && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="debt-modal-title"
        >
          {/* Red Blur Background */}
          <div 
            className="absolute inset-0 bg-red-600/40"
            style={{ backdropFilter: "blur(8px)" }}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-zinc-900/95 border-4 border-red-500 rounded-2xl p-6 md:p-8 lg:p-10 max-w-2xl w-full shadow-2xl shadow-red-500/50 motion-reduce:animate-none animate-pulse">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Warning Icon */}
              <div className="bg-red-500/20 p-6 rounded-full">
                <MdWarning className="w-16 h-16 md:w-20 md:h-20 text-red-500" aria-hidden="true" />
              </div>

              {/* Title */}
              <h2 id="debt-modal-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                To'lov qilinmagan!
              </h2>

              {/* Information */}
              <div className="space-y-4 w-full">
                <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4">
                  <p className="text-gray-300 text-sm md:text-base mb-2">Qarz miqdori:</p>
                  <p className="text-3xl md:text-4xl font-bold text-red-400">
                    {formatCurrency(student.debt)} so'm
                  </p>
                </div>

                {unpaidMonths.length > 0 && (
                  <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4">
                    <p className="text-gray-300 text-sm md:text-base mb-2">To'lanmagan oylar:</p>
                    <p className="text-xl md:text-2xl font-semibold text-red-300">
                      {unpaidMonths.map((m, i) => (
                        <span key={i}>
                          {m.month} {m.year}
                          {i < unpaidMonths.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                {/* Message */}
                <div className="bg-zinc-800/80 border-2 border-yellow-500/50 rounded-xl p-4">
                  <p className="text-yellow-200 text-base md:text-lg leading-relaxed">
                    ⚠️ Sovg'alarni sotib olish uchun avval to'lovni amalga oshiring.
                    To'lov qilingandan so'ng sovg'alarni xarid qilishingiz mumkin bo'ladi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shopping