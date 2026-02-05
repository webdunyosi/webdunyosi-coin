import products from "../../data/products.json"
import ProductCard from "../../components/student/ProductCard"
import { LuClipboardList } from "react-icons/lu"

const Shopping = ({ onAddToCart }) => {
  return (
    <div className="w-full relative min-h-full bg-zinc-950">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10"></div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="mb-6 md:mb-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            <LuClipboardList className="w-8 h-8" />
            <span>Sovg'alar va mahsulotlar</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Tishga yoqadigan sovg'alarni tanlang
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
