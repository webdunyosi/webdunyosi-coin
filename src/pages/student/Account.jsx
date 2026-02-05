import { GiBanknote } from "react-icons/gi"
import { MdVerified } from "react-icons/md"

const Account = ({ student }) => {
  if (!student) {
    return (
      <div className="text-center text-white">
        <p>Student ma'lumotlari topilmadi</p>
      </div>
    )
  }

  return (
    <div className="w-5/6 ml-auto relative min-h-full bg-zinc-950/80 web-pattern">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
          <GiBanknote className="w-6 h-6" />
          <span>Mening Xisobim</span>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl">
          <div className="bg-zinc-800/70 border border-green-500/50 rounded-xl p-8 mb-6">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-green-400"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {student.name}
                  </h2>
                  <MdVerified className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-gray-400">Foydalanuvchi ID: {student.id}</p>
              </div>
            </div>

            {/* Balance Section */}
            <div className="bg-gradient-to-r from-green-600/20 to-lime-600/20 border border-green-500/50 rounded-lg p-6 mb-6">
              <p className="text-gray-400 text-sm mb-2">Umumiy Balans</p>
              <div className="flex items-center gap-3">
                <span className="text-5xl font-bold text-lime-400">
                  {student.coins}
                </span>
                <span className="text-2xl text-lime-300">Coin</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Status</p>
                <p className="text-white font-semibold">Faol</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Reytingi</p>
                <p className="text-white font-semibold">A'lochqi</p>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-zinc-800/70 border border-green-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Faoliyat</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-gray-300">Sovg'a sotib olishlar</span>
                <span className="text-lime-400 font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-gray-300">Reyting o'yinlari</span>
                <span className="text-lime-400 font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-gray-300">Jami ishtirok</span>
                <span className="text-lime-400 font-semibold">17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
