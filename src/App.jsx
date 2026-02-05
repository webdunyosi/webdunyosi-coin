import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import StudentLayout from "./layouts/StudentLayout"
import Ranking from "./pages/student/Ranking"
import Shopping from "./pages/student/Shopping"
import Account from "./pages/student/Account"
import Login from "./pages/Login"

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("webcoin_user")
    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to load user from localStorage:", e)
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (user) => {
    setLoggedInUser(user)
    localStorage.setItem("webcoin_user", JSON.stringify(user))
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    localStorage.removeItem("webcoin_user")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-green-400">Yuklanyapti...</div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          loggedInUser ? (
            <Navigate to="/reyting" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/reyting"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Ranking />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/sovgalar"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Shopping />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/xisobim"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Account student={loggedInUser} />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={loggedInUser ? "/reyting" : "/login"} />}
      />
    </Routes>
  )
}

export default App
