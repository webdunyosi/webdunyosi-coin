import { useNavigate } from "react-router-dom"
import { MdLogout, MdMenu } from "react-icons/md"

const Header = ({ student, onLogout, onMenuClick }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-100 bg-gradient-to-r from-zinc-900/80 via-zinc-950/90 to-zinc-900/80 backdrop-blur-2xl text-white p-3 md:p-5 flex justify-between items-center border-b border-green-500/30 shadow-2xl shadow-green-500/10">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-lime-500/5 animate-pulse opacity-30"></div>
      
      {/* Left: Menu Button + Coin Balance */}
      <div className="flex items-center gap-4 relative z-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-xl hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-all duration-300 border border-transparent hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105"
          title="Menu"
        >
          <MdMenu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-green-500/20 to-lime-500/20 border border-green-500/30 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02]">
          <div className="p-2.5 bg-gradient-to-br from-green-400 to-lime-400 rounded-xl shadow-lg animate-pulse">
            <img className="w-5 h-5" src="icons/coin.png" alt="Coin" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold">
              Balans
            </span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-lime-300 to-green-300 bg-clip-text text-transparent">
              {student.coins}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Profile Section & Logout */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white tracking-wide">{student.name}</p>
            <p className="text-xs text-green-300 font-medium">Faol foydalanuvchi</p>
          </div>
          <div className="relative group">
            <img
              src={student.avatar}
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-green-400/60 shadow-xl shadow-green-500/30 transition-all duration-300 group-hover:border-green-400 group-hover:shadow-2xl group-hover:shadow-green-500/40 group-hover:scale-105"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-lime-400 rounded-full border-2 border-zinc-900 shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2.5 ml-1 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
          title="Chiqish"
        >
          <MdLogout className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

export default Header
