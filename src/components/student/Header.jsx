const Header = ({ student }) => {
  return (
    <header className="w-5/6 sticky top-0 left-1/6 right-0 z-50 bg-zinc-900 text-white p-4 flex justify-between items-center border-b-2 border-green-500">
      {/* Chap: Coin */}
      <div className="flex items-center gap-1">
        <img className="w-6" src="icons/coin.png" alt="" />
        <span className="text-lg font-semibold">{student.coins}</span>
      </div>
      {/* O'ng: Ism va profil */}
      <div className="flex items-center gap-2">
        <span className="font-medium">{student.name}</span>
        <img
          src={student.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-green-500 shadow-md"
        />
      </div>
    </header>
  )
}

export default Header
