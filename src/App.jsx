import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import StudentLayout from "./layouts/StudentLayout"
import Ranking from "./pages/student/Ranking"
import Shopping from "./pages/student/Shopping"
import Account from "./pages/student/Account"
import Cart from "./pages/student/Cart"
import Attendance from "./pages/student/Attendance"
import Login from "./pages/Login"

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])

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
    setCartItems([])
  }

  const handleAddToCart = (product) => {
    if (!loggedInUser || loggedInUser.coins < product.price) {
      alert(
        `Yetarli coins mavjud emas! Zarur: ${product.price}, Mavjud: ${loggedInUser ? loggedInUser.coins : 0}`,
      )
      return
    }

    // Deduct coins
    const newUser = {
      ...loggedInUser,
      coins: loggedInUser.coins - product.price,
    }
    setLoggedInUser(newUser)
    localStorage.setItem("webcoin_user", JSON.stringify(newUser))

    // Add or increment quantity
    const existing = cartItems.find((i) => i.id === product.id)
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
        ),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId)
    if (!item) return
    if (!loggedInUser || loggedInUser.coins < item.price) {
      alert(
        `Yetarli coins yo'q! Zarur: ${item.price}, Mavjud: ${loggedInUser ? loggedInUser.coins : 0}`,
      )
      return
    }

    const newUser = { ...loggedInUser, coins: loggedInUser.coins - item.price }
    setLoggedInUser(newUser)
    localStorage.setItem("webcoin_user", JSON.stringify(newUser))

    setCartItems(
      cartItems.map((i) =>
        i.id === productId ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
      ),
    )
  }

  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId)
    if (!item) return

    // Refund one unit
    const newUser = { ...loggedInUser, coins: loggedInUser.coins + item.price }
    setLoggedInUser(newUser)
    localStorage.setItem("webcoin_user", JSON.stringify(newUser))

    if ((item.quantity || 1) > 1) {
      setCartItems(
        cartItems.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      )
    } else {
      setCartItems(cartItems.filter((i) => i.id !== productId))
    }
  }

  const handleRemoveItem = (productId) => {
    const item = cartItems.find((i) => i.id === productId)
    if (!item) return

    const refund = (item.quantity || 1) * item.price
    const newUser = { ...loggedInUser, coins: loggedInUser.coins + refund }
    setLoggedInUser(newUser)
    localStorage.setItem("webcoin_user", JSON.stringify(newUser))

    setCartItems(cartItems.filter((i) => i.id !== productId))
  }

  const handleClearCart = (newCart) => {
    if (Array.isArray(newCart)) {
      setCartItems(newCart)
    } else {
      setCartItems([])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-green-400">Yuklanyapti...</div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
              <Shopping onAddToCart={handleAddToCart} />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/davomat"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Attendance />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/savatcha"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Cart
                student={loggedInUser}
                cartItems={cartItems}
                onClearCart={handleClearCart}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
              />
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
    </>
  )
}

export default App
