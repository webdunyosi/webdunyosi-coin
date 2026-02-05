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
    <aside className="fixed inset-0 z-50 w-1/6 bg-zinc-900 text-white h-screen flex flex-col border-r-2 border-green-500 pb-6">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-green-400 p-5">
        <img className="w-8" src="/logo.png" alt="WebCoin logo" />
        <span className="font-bold text-green-400 text-xl">WebCoin</span>
      </div>

      <nav className="flex flex-col gap-2 p-3 pt-0 flex-1">
        {menu.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`relative flex items-center gap-3 p-3 rounded-r-full transition-colors duration-200 no-underline
              ${
                location.pathname === item.path
                  ? "bg-green-500/50 text-[#00ff88] font-semibold"
                  : "hover:bg-green-600/50 hover:text-white text-white"
              }`}
          >
            {location.pathname === item.path && (
              <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-400 rounded-r-full"></span>
            )}
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
