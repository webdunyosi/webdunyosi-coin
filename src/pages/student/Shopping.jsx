import products from "../../data/products.json"
import ProductCard from "../../components/student/ProductCard"
import { LuClipboardList } from "react-icons/lu"

const Shopping = ({ coins, setCoins }) => {
  return (
    <div className="w-5/6 ml-auto relative min-h-full bg-zinc-950/80 web-pattern">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="text-2xl font-bold mb-6 text-white flex items-center gap-1">
          <LuClipboardList />
          <span>Mahsulotlar ro'yxati</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              coins={coins}
              setCoins={setCoins}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shopping
