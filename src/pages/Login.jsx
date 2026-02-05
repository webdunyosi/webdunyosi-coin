import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdError } from "react-icons/md"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import users from "../data/users.json"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!username.trim() || !password.trim()) {
      setError("Iltimos, login va parolni kiriting")
      setLoading(false)
      return
    }

    const user = users.find(
      (u) => u.username === username && u.password === password,
    )

    if (user) {
      onLogin(user)
      navigate("/reyting")
    } else {
      setError("Login yoki parol noto'g'ri")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center p-4">
      {/* Background Gradient Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl border border-green-500/20 rounded-2xl shadow-2xl shadow-green-500/10 p-8 md:p-10">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-green-400 to-lime-500 rounded-xl shadow-lg shadow-green-500/50">
              <img className="w-10" src="/logo.png" alt="WebCoin logo" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
              WebCoin
            </h1>
            <p className="text-gray-400 text-sm">O'quvchi akkauntiga kirish</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Loginni kiriting"
                className="w-full px-4 py-3 bg-zinc-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
                className="w-full px-4 py-3 bg-zinc-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <MdError className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                  Kirish...
                </>
              ) : (
                "Akkauntga kirish"
              )}
            </button>
          </form>

          {/* Demo Users */}
          <div className="mt-8 pt-6 border-t border-green-500/20">
            <p className="text-xs text-gray-400 mb-3 text-center">
              Test akkauntlari:
            </p>
            <div className="space-y-2 text-xs">
              <p className="text-gray-500 text-center">
                <span className="text-green-400 font-semibold">Login:</span>{" "}
                john_doe
              </p>
              <p className="text-gray-500 text-center">
                <span className="text-green-400 font-semibold">Parol:</span>{" "}
                password123
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 WebCoin. Barcha huquqlar himoyalangan
        </p>
      </div>
    </div>
  )
}

export default Login
