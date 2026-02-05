const ProductCard = ({ product }) => {
  return (
    <div className="bg-zinc-900/70 backdrop-blur p-5 rounded-xl shadow-lg duration-300 hover:scale-105 transition">
      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />

      <div className="flex justify-between items-center">
        {/* Title */}
        <h3 className="font-semibold text-white mb-1">{product.title}</h3>

        {/* Price */}
        <p className="text-lime-400 font-bold">{product.price} Coin</p>
      </div>
    </div>
  )
}

export default ProductCard
