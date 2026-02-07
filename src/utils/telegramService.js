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
  classInfo,
  students,
  attendeeIds,
) => {
  try {
    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    }

    // Create beautiful formatted message
    let message = `📋 *DAVOMAT MA'LUMOTLARI*\n\n`
    message += `📅 *Sana:* ${formatDate(classInfo.date)}\n`
    message += `📆 *Kun:* ${classInfo.day}\n`
    message += `🕐 *Vaqt:* ${classInfo.time}\n`
    message += `⏰ *Saqlangan vaqt:* ${new Date().toLocaleString("uz-UZ")}\n\n`

    // Separate students into present and absent
    const presentStudents = students.filter((student) =>
      attendeeIds.includes(student.id),
    )
    const absentStudents = students.filter(
      (student) => !attendeeIds.includes(student.id),
    )

    // Present students section
    message += `✅ *KELGAN O'QUVCHILAR (${presentStudents.length}):*\n`
    if (presentStudents.length > 0) {
      presentStudents.forEach((student, index) => {
        message += `${index + 1}. ${student.name}\n`
      })
    } else {
      message += `Hech kim kelmadi\n`
    }

    message += `\n`

    // Absent students section
    message += `❌ *KELMAGAN O'QUVCHILAR (${absentStudents.length}):*\n`
    if (absentStudents.length > 0) {
      absentStudents.forEach((student, index) => {
        message += `${index + 1}. ${student.name}\n`
      })
    } else {
      message += `Hamma keldi\n`
    }

    message += `\n`

    // Statistics
    const totalStudents = students.length
    const attendancePercentage =
      totalStudents > 0
        ? Math.round((presentStudents.length / totalStudents) * 100)
        : 0
    message += `📊 *STATISTIKA:*\n`
    message += `• Jami o'quvchilar: ${totalStudents}\n`
    message += `• Kelganlar: ${presentStudents.length}\n`
    message += `• Kelmaganlar: ${absentStudents.length}\n`
    message += `• Davomat foizi: ${attendancePercentage}%\n`

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
      return { success: true, message: "Davomat yuborildi!" }
    } else {
      return { success: false, error: "Xatolik yuz berdi" }
    }
  } catch (error) {
    console.error("Telegram send error:", error)
    return { success: false, error: error.message }
  }
}
