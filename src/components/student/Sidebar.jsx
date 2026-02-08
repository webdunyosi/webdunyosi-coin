import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { MdClose } from "react-icons/md"
import menuData from "../../data/menu.json"
import { getIcon } from "../../utils/iconMapper"

const Sidebar = ({ isOpen, onClose, user }) => {
  const location = useLocation()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 lg:w-1/6 bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-900 text-white flex flex-col border-r border-green-500/30 shadow-2xl shadow-green-500/10 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-green-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-linear-to-br from-green-400 to-lime-500 rounded-lg shadow-lg shadow-green-500/50">
              <img className="w-8" src="/logo.png" alt="WebCoin logo" />
            </div>
            <span className="font-bold text-lg bg-linear-to-r from-green-400 to-lime-300 bg-clip-text text-transparent">
              WebCoin
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 flex-1">
          {menuData.map((item) => {
            const handleClick = (e) => {
              // Check if this is the cart item and user has debt
              if (item.path === "/savatcha" && user && user.debt > 0) {
                e.preventDefault()
                alert("Qarzingizni to'lang va sovg'alarga ega bo'ling!")
                onClose()
                return
              }
              onClose()
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleClick}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 no-underline group
                ${
                  location.pathname === item.path
                    ? "bg-linear-to-r from-green-500/40 to-lime-500/20 text-lime-300 font-semibold shadow-lg shadow-green-500/20"
                    : "text-gray-400 hover:text-white hover:bg-green-500/10"
                }`}
              >
                {location.pathname === item.path && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-green-400 to-lime-300 rounded-r-full"></span>
                )}
                <span
                  className={`text-lg transition-transform group-hover:scale-110 ${
                    location.pathname === item.path
                      ? "text-lime-300"
                      : "text-gray-400"
                  }`}
                >
                  {getIcon(item.icon)}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-500/20 backdrop-blur-md">
          <div className="text-xs text-gray-500 text-center">
            © 2026 WebCoin
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
