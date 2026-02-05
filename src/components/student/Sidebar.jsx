import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaChartLine } from "react-icons/fa6"
import { GiBanknote } from "react-icons/gi"
import { IoGift } from "react-icons/io5"

const menu = [
  {
    id: 1,
    title: "Sovg'alar",
    icon: <IoGift className="w-5 h-5" />,
    path: "/sovgalar",
  },
  {
    id: 2,
    title: "Reyting",
    icon: <FaChartLine className="w-5 h-5" />,
    path: "/reyting",
  },
  {
    id: 3,
    title: "Xisobim",
    icon: <GiBanknote className="w-5 h-5" />,
    path: "/xisobim",
  },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="fixed top-0 left-0 z-50 w-1/6 h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 text-white flex flex-col border-r border-green-500/30 shadow-2xl shadow-green-500/10">
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-green-500/20 backdrop-blur-md">
        <div className="p-2 bg-gradient-to-br from-green-400 to-lime-500 rounded-lg shadow-lg shadow-green-500/50">
          <img className="w-6" src="/logo.png" alt="WebCoin logo" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent">
          WebCoin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {menu.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 no-underline group
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-green-500/40 to-lime-500/20 text-lime-300 font-semibold shadow-lg shadow-green-500/20"
                  : "text-gray-400 hover:text-white hover:bg-green-500/10"
              }`}
          >
            {location.pathname === item.path && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-lime-300 rounded-r-full"></span>
            )}
            <span
              className={`text-lg transition-transform group-hover:scale-110 ${
                location.pathname === item.path
                  ? "text-lime-300"
                  : "text-gray-400"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-500/20 backdrop-blur-md">
        <div className="text-xs text-gray-500 text-center">© 2026 WebCoin</div>
      </div>
    </aside>
  )
}

export default Sidebar
