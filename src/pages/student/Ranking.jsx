import students from "../../data/students.json"

const Ranking = () => {
  // Coin bo‘yicha kamayish tartibida saralash
  const sortedStudents = [...students].sort((a, b) => b.coins - a.coins)

  return (
    <div className="relative w-full min-h-full bg-zinc-950/80 web-pattern">
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">🏆 Reyting</h2>

        <div className="w-full space-y-4">
          {sortedStudents.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-xl
                  ${
                    index === 0
                      ? "bg-yellow-500/20 border border-yellow-400"
                      : index === 1
                        ? "bg-gray-400/20 border border-gray-300"
                        : index === 2
                          ? "bg-orange-500/20 border border-orange-400"
                          : "bg-zinc-900/70"
                  }
                `}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold w-6">{index + 1}</span>

                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <span className="font-semibold text-white">{student.name}</span>
              </div>

              {/* Coins */}
              <span className="font-bold text-lime-400">
                {student.coins} Coin
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ranking
