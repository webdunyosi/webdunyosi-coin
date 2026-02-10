import { useState } from "react"
import { MdDelete, MdShoppingCart } from "react-icons/md"
import { sendCartToTelegram } from "../../utils/telegramService"

const Cart = ({
  student,
  cartItems,
  onClearCart,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  )

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  )

  const handleSendOrder = async () => {
    setLoading(true)
    setMessage("")

    const result = await sendCartToTelegram(student.name, cartItems)

    if (result.success) {
      setMessageType("success")
      setMessage(result.message)
      setTimeout(() => {
        onClearCart()
        setMessage("")
      }, 2000)
    } else {
      setMessageType("error")
      setMessage(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="w-full relative min-h-full bg-zinc-950/80 web-pattern">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/10 via-transparent to-blue-900/10"></div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="mb-6 md:mb-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            <MdShoppingCart className="w-8 h-8 text-green-400" />
            <span>Savatcha</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Tanlangan sovg'alaringiz
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-6xl mb-4 text-gray-600">📭</div>
            <p className="text-gray-400 text-lg mb-4">Savatcha bo'sh</p>
            <p className="text-gray-500 text-sm text-center">
              Sovg'alarni tanlab olib, savatchaga qo'shing
            </p>
          </div>
        ) : (
          <div className="max-w-4xl">
            {/* Message Alert */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  messageType === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-3 md:space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between p-4 md:p-5 bg-zinc-900/30 border border-zinc-700/50 rounded-lg hover:border-green-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-lg bg-zinc-800/50 p-2"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm">
                        #{item.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-zinc-800/30 px-2 py-1 rounded">
                      <button
                        onClick={() => onDecrease(item.id)}
                        className="px-2 py-1 text-white bg-zinc-900/20 rounded hover:bg-zinc-900/30"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold px-2">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => onIncrease(item.id)}
                        className="px-2 py-1 text-white bg-zinc-900/20 rounded hover:bg-zinc-900/30"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lime-400 font-bold text-base md:text-lg">
                      {item.price * (item.quantity || 1)}
                    </p>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-green-500/30 rounded-lg md:rounded-xl p-6">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-green-500/20">
                <span className="text-gray-300">Mahsulotlar soni</span>
                <span className="text-white font-semibold text-lg">
                  {totalItems}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-300 text-lg">Jami narx</span>
                <span className="text-lime-400 font-bold text-2xl md:text-3xl">
                  {totalPrice} Coin
                </span>
              </div>

              <button
                onClick={handleSendOrder}
                disabled={loading || cartItems.length === 0}
                className="w-full py-3 px-4 bg-linear-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
              >
                {loading ? (
                  <>
                    <div className="animate-spin">⏳</div>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <MdShoppingCart className="w-5 h-5" />
                    Buyurtmani yuborish
                  </>
                )}
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Buyurtma Telegram botga yuboriladi
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
