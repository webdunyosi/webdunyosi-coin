import { useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md"

const Header = ({ student, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  return (
    <header className="w-full sticky top-0 right-0 z-40 bg-gradient-to-r from-zinc-900/95 via-zinc-950/95 to-zinc-900/95 backdrop-blur-lg text-white p-4 md:p-6 flex justify-between items-center border-b border-green-500/20 shadow-lg shadow-green-500/5">
      {/* Left: Coin Balance */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/10 to-lime-500/10 border border-green-500/20">
        <div className="p-2 bg-gradient-to-br from-green-400 to-lime-300 rounded-lg">
          <img className="w-5" src="icons/coin.png" alt="Coin" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Balans
          </span>
          <span className="text-lg font-bold text-lime-300">
            {student.coins}
          </span>
        </div>
      </div>

      {/* Right: Profile Section & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-300">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{student.name}</p>
            <p className="text-xs text-gray-400">Faol foydalanuvchi</p>
          </div>
          <div className="relative">
            <img
              src={student.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-green-400/50 shadow-lg shadow-green-500/20"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 rounded-full border-2 border-zinc-900 shadow-lg"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 ml-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30"
          title="Chiqish"
        >
          <MdLogout className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

export default Header
