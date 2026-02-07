// Telegram Bot Configuration
const BOT_TOKEN = "8040317680:AAH55ODJWx_6yI6iJz9Zp1FTSIONrFzcDeE"
const CHAT_ID = "5414733748"
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

export const sendCartToTelegram = async (studentName, cartItems) => {
  if (cartItems.length === 0) {
    return { success: false, error: "Savatcha bo'sh" }
  }

  try {
    // Format cart items
    let message = `📦 *Yangi sovg'a buyurtma*\n\n`
    message += `👤 *O'quvchi:* ${studentName}\n`
    message += `📅 *Vaqti:* ${new Date().toLocaleString("uz-UZ")}\n\n`
    message += `*Sovg'alar:*\n`

    let totalPrice = 0
    cartItems.forEach((item, index) => {
      const quantity = item.quantity || 1
      const subtotal = item.price * quantity
      message += `${index + 1}. ${item.title} - ${item.price} Coin x ${quantity}\n`
      totalPrice += subtotal
    })

    message += `\n💰 *Jami narx:* ${totalPrice} Coin`

    // Send to Telegram
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const data = await response.json()

    if (data.ok) {
      return { success: true, message: "Buyurtma yuborildi!" }
    } else {
      return { success: false, error: "Xatolik yuz berdi" }
    }
  } catch (error) {
    console.error("Telegram send error:", error)
    return { success: false, error: error.message }
  }
}

export const sendAttendanceToTelegram = async (
  selectedClass,
  students,
  presentStudents,
  absentStudents,
) => {
  try {
    // Validate date format
    if (!selectedClass.date) {
      throw new Error("Sana ma'lumoti mavjud emas")
    }

    // Format date nicely
    const date = new Date(selectedClass.date)
    if (isNaN(date.getTime())) {
      throw new Error("Noto'g'ri sana formati")
    }
    
    const formattedDate = date.toLocaleDateString("uz-UZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    
    // Capture timestamp at the start
    const saveTimestamp = new Date().toLocaleString("uz-UZ")

    // Build beautiful message
    let message = `📋 *Davomat ma'lumotlari*\n\n`
    message += `📅 *Sana:* ${formattedDate}\n`
    message += `🕐 *Vaqt:* ${selectedClass.time}\n`
    message += `📝 *Dars:* ${selectedClass.day}\n\n`

    // Statistics
    const totalStudents = students.length
    const presentCount = presentStudents.length
    const absentCount = absentStudents.length
    const attendancePercentage = Math.round(
      (presentCount / totalStudents) * 100,
    )

    message += `📊 *Statistika:*\n`
    message += `✅ Kelganlar: ${presentCount}/${totalStudents} (${attendancePercentage}%)\n`
    message += `❌ Kelmaganlar: ${absentCount}/${totalStudents}\n\n`

    // Present students
    if (presentCount > 0) {
      message += `✅ *Kelgan o'quvchilar:*\n`
      presentStudents.forEach((student, index) => {
        message += `${index + 1}. ${student.name}\n`
      })
      message += `\n`
    }

    // Absent students
    if (absentCount > 0) {
      message += `❌ *Kelmagan o'quvchilar:*\n`
      absentStudents.forEach((student, index) => {
        message += `${index + 1}. ${student.name}\n`
      })
    }

    message += `\n⏰ *Saqlangan vaqt:* ${saveTimestamp}`

    // Send to Telegram
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const data = await response.json()

    if (data.ok) {
      return { success: true, message: "Davomat Telegramga yuborildi!" }
    } else {
      return { success: false, error: "Xatolik yuz berdi" }
    }
  } catch (error) {
    console.error("Telegram send error:", error)
    return { success: false, error: error.message }
  }
}
