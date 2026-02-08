import { FaChartLine, FaClipboardList } from "react-icons/fa6"
import { GiBanknote } from "react-icons/gi"
import { IoGift } from "react-icons/io5"
import { MdShoppingCart, MdPayment } from "react-icons/md"

// Icon mapping object
export const iconMap = {
  IoGift,
  FaChartLine,
  FaClipboardList,
  MdShoppingCart,
  MdPayment,
  GiBanknote,
}

// Helper function to get icon component
export const getIcon = (iconName, className = "w-5 h-5") => {
  const IconComponent = iconMap[iconName]
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`)
    return null
  }
  return <IconComponent className={className} />
}