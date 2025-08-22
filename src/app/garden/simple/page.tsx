'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Simple Garden Page without complex API calls
const SimpleGardenPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [gardenLevel, setGardenLevel] = useState(1)
  const [starSeeds, setStarSeeds] = useState(100)
  const [xp, setXp] = useState(250)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          className="text-8xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌱
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <span>🌱</span>
                <span>สวนสุขภาพของคุณ</span>
              </h1>
              <p className="text-gray-600 mt-1">ดูแลพืชและพัฒนาสุขภาพไปด้วยกัน</p>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <span>⭐</span>
                <span className="font-bold">{starSeeds} Seeds</span>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <span>📈</span>
                <span className="font-bold">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full flex items-center space-x-1">
                  <span>👑</span>
                  <span className="font-bold text-sm">Level {gardenLevel}</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">{xp} / 1000 XP</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(xp / 1000) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <span>✨</span>
                <span>การดำเนินการด่วน</span>
              </h3>

              <motion.button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <span>💧</span>
                <span>รดน้ำสวน</span>
              </motion.button>

              <motion.button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <span>➕</span>
                <span>ปลูกพืชใหม่</span>
              </motion.button>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">สรุปสวน</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">พืชทั้งหมด:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">กำลังเติบโต:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">โตเต็มที่:</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-bold text-lg flex items-center space-x-2 mb-4">
                <span>🎯</span>
                <span>เป้าหมายวันนี้</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'รดน้ำพืช 3 ต้น', progress: 66, completed: false },
                  { name: 'เรียนบทเรียน 1 บท', progress: 100, completed: true },
                  { name: 'เข้าระบบ 1 ครั้ง', progress: 100, completed: true }
                ].map((goal, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border-2 ${
                      goal.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{goal.name}</span>
                      {goal.completed && <span className="text-green-500">🏆</span>}
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${goal.completed ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Garden Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">สวนของคุณ</h2>
                <span className="text-sm text-gray-600">อัปเดตล่าสุด: เมื่อสักครู่</span>
              </div>

              {/* Sample Plants Grid */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                
                {/* Sample Plants */}
                {[
                  { emoji: '🌹', name: 'กุหลาบ', stage: 'บาน', health: 95, needsWater: false },
                  { emoji: '🌻', name: 'ทานตะวัน', stage: 'โตเต็มที่', health: 100, needsWater: false },
                  { emoji: '🌿', name: 'สมุนไพร', stage: 'ต้นอ่อน', health: 70, needsWater: true }
                ].map((plant, index) => (
                  <motion.div
                    key={index}
                    className={`w-32 h-32 relative rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      plant.needsWater ? 'border-red-300 bg-red-50' : 'border-green-200 bg-green-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-2 rounded-xl bg-white/50 flex items-center justify-center">
                      <div className="text-4xl">{plant.emoji}</div>
                    </div>
                    
                    {/* Health Bar */}
                    <div className="absolute top-1 left-1 right-1">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${plant.health > 70 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${plant.health}%` }}
                        />
                      </div>
                    </div>

                    {/* Water Alert */}
                    {plant.needsWater && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        ⚠️
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Empty Slots */}
                {[1, 2, 3].map((slot) => (
                  <motion.div
                    key={`empty-${slot}`}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-1">🌱</div>
                      <div className="text-xs">ปลูกพืช</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">กิจกรรมล่าสุด</h3>
                <div className="space-y-2">
                  {[
                    { icon: '💧', text: 'รดน้ำทานตะวัน', time: '5 นาทีที่แล้ว', xp: 5 },
                    { icon: '🌱', text: 'ปลูกสมุนไพรใหม่', time: '1 ชั่วโมงที่แล้ว', xp: 10 },
                    { icon: '📚', text: 'เรียนบทเรียนเสร็จ', time: '2 ชั่วโมงที่แล้ว', xp: 20 }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        +{activity.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleGardenPage