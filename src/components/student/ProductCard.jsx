import { MdShoppingCart } from "react-icons/md"

const ProductCard = ({ product, onAddToCart, disabled = false }) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onAddToCart(product)
  }

  return (
    <div className={`bg-linear-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur border border-green-500/20 p-4 md:p-5 rounded-xl shadow-lg transition-all duration-300 ${
      disabled 
        ? "cursor-not-allowed opacity-50" 
        : "hover:border-green-500/50 hover:shadow-green-500/20 hover:scale-105 group"
    }`}>
      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-zinc-900/50 p-3">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-40 object-contain transition-transform duration-300 ${
            disabled ? "" : "group-hover:scale-110"
          }`}
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
          {product.title}
        </h3>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <p className="text-lime-400 font-bold text-base md:text-lg">
            {product.price} Coin
          </p>
          <button
            onClick={handleClick}
            disabled={disabled}
            className={`p-2 text-white rounded-lg transition-all duration-300 shadow-lg ${
              disabled 
                ? "bg-gray-600 cursor-not-allowed" 
                : "cursor-pointer bg-linear-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 shadow-green-500/30 hover:shadow-green-500/50"
            }`}
          >
            <MdShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard