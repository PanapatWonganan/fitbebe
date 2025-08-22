'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SeasonalEventsPanel from '@/components/garden/SeasonalEventsPanel'
import { Calendar, ArrowLeft, Sparkles, CloudRain, Sun } from 'lucide-react'
import Link from 'next/link'

const SeasonalEventsPage = () => {
  const currentSeason = (() => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return { name: 'ฤดูร้อน', emoji: '🌞', color: 'from-orange-400 to-red-400' }
    if (month >= 6 && month <= 10) return { name: 'ฤดูฝน', emoji: '🌧️', color: 'from-blue-400 to-indigo-400' }
    return { name: 'ฤดูหนาว', emoji: '❄️', color: 'from-blue-300 to-gray-400' }
  })()

  const upcomingFestivals = [
    { name: 'วันลอยกระทง', date: '2024-11-15', emoji: '🏮', daysLeft: 45 },
    { name: 'วันปีใหม่', date: '2025-01-01', emoji: '🎊', daysLeft: 92 },
    { name: 'วันตรุษจีน', date: '2025-01-29', emoji: '🐍', daysLeft: 120 },
    { name: 'วันสงกรานต์', date: '2025-04-13', emoji: '💦', daysLeft: 194 }
  ]

  const currentWeather = {
    type: 'cloudy',
    temp: 28,
    description: 'อากาศเมฆเยอะ เหมาะกับการปลูกพืช',
    effect: 'เพิ่มอัตราการเติบโต 20%'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/garden" 
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับสู่สวน</span>
          </Link>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white">
              <Calendar className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">เหตุการณ์ตามฤดูกาล</h1>
              <p className="text-gray-600">เทศกาล สภาพอากาศ และเหตุการณ์พิเศษ</p>
            </div>
          </div>

          {/* Season and Weather Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-r ${currentSeason.color} rounded-xl p-6 text-white`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{currentSeason.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold">{currentSeason.name}</h3>
                  <p className="text-white/80">ฤดูกาลปัจจุบัน</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <CloudRain className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">{currentWeather.temp}°C</h3>
                  <p className="text-white/80">สภาพอากาศ</p>
                </div>
              </div>
              <p className="text-sm text-white/90">{currentWeather.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">+20%</h3>
                  <p className="text-white/80">การเติบโต</p>
                </div>
              </div>
              <p className="text-sm text-white/90">{currentWeather.effect}</p>
            </motion.div>
          </div>

          {/* Upcoming Festivals */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">เทศกาลที่จะมาถึง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingFestivals.map((festival, index) => (
                <motion.div
                  key={festival.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-100"
                >
                  <div className="text-2xl mb-2">{festival.emoji}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{festival.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(festival.date).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    อีก {festival.daysLeft} วัน
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Seasonal Events Panel */}
        <SeasonalEventsPanel />

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🏮</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">เทศกาลไทย</h3>
            <p className="text-gray-600 text-sm">
              เข้าร่วมเทศกาลประจำปีของไทย รับรางวัลพิเศษและพืชหายาก
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CloudRain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">ระบบสภาพอากาศ</h3>
            <p className="text-gray-600 text-sm">
              สภาพอากาศมีผลต่อการเติบโตของพืชและให้โบนัสพิเศษ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🌸</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">พืชตามฤดูกาล</h3>
            <p className="text-gray-600 text-sm">
              ปลูกพืชพิเศษที่มีเฉพาะในช่วงเทศกาลหรือฤดูกาลต่างๆ
            </p>
          </motion.div>
        </div>

        {/* Weather Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>เคล็ดลับการทำสวนตามสภาพอากาศ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌞 ฤดูร้อน</h4>
              <p className="text-gray-700">รดน้ำบ่อยขึ้น เลือกปลูกพืชทนแล้ง ใช้ร่มเงาป้องกันแสงแดดจัด</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌧️ ฤดูฝน</h4>
              <p className="text-gray-700">ระวังน้ำท่วม ปลูกพืชที่ชอบความชื้น ระบายน้ำให้ดี</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonalEventsPage