'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Trophy, 
  Users, 
  Target, 
  Calendar,
  CheckCircle,
  Flame,
  Sparkles,
  Baby,
  Crown,
  Gift,
  TrendingUp,
  Award,
  Smile
} from 'lucide-react';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const userStats = {
    currentStage: 'Prenatal',
    week: 24,
    totalBadges: 12,
    currentStreak: 7,
    wellnessScore: 8.2,
    communityImpact: 45,
    nextMilestone: 'Mindful Mama',
    daysToMilestone: 3
  };

  const badges = [
    { id: 1, name: 'Healthy Mama', icon: '🤰', description: 'ออกกำลังกาย 7 วันติดต่อกัน', earned: true, date: '2024-01-15' },
    { id: 2, name: 'Consistency Champion', icon: '💪', description: 'เข้าเรียนสม่ำเสมอ 30 วัน', earned: true, date: '2024-01-20' },
    { id: 3, name: 'Supportive Sister', icon: '💝', description: 'ให้กำลังใจสมาชิกอื่น 50 ครั้ง', earned: true, date: '2024-01-25' },
    { id: 4, name: 'Mindful Mama', icon: '🧘‍♀️', description: 'ทำสมาธิ 10 วันติดต่อกัน', earned: false, progress: 70 },
    { id: 5, name: 'Nutrition Ninja', icon: '🥗', description: 'ติดตามอาหาร 14 วันติดต่อกัน', earned: false, progress: 43 },
    { id: 6, name: 'Recovery Queen', icon: '👶', description: 'ฟื้นฟูหลังคลอดครบ 6 สัปดาห์', earned: false, progress: 0 }
  ];

  const wellnessData = {
    physical: 8.5,
    mental: 7.8,
    nutrition: 8.1,
    community: 8.9
  };

  const weeklyProgress = [
    { day: 'จ', physical: 8, mental: 7, nutrition: 9, community: 8 },
    { day: 'อ', physical: 9, mental: 8, nutrition: 8, community: 9 },
    { day: 'พ', physical: 7, mental: 8, nutrition: 8, community: 8 },
    { day: 'พฤ', physical: 9, mental: 9, nutrition: 9, community: 9 },
    { day: 'ศ', physical: 8, mental: 7, nutrition: 8, community: 9 },
    { day: 'ส', physical: 9, mental: 8, nutrition: 8, community: 8 },
    { day: 'อา', physical: 8, mental: 8, nutrition: 8, community: 9 }
  ];

  const achievements = [
    { text: 'เสร็จสิ้นบทเรียน Prenatal Yoga', time: '2 ชั่วโมงที่แล้ว', type: 'course' },
    { text: 'ได้ badge "Healthy Mama"', time: '1 วันที่แล้ว', type: 'badge' },
    { text: 'ให้กำลังใจสมาชิก 5 คน', time: '3 วันที่แล้ว', type: 'community' },
    { text: 'Wellness Score ถึง 8.0+', time: '5 วันที่แล้ว', type: 'milestone' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">🌸 Your Wellness Garden</h1>
              <p className="text-gray-600">สวัสดีคุณแม่! วันนี้รู้สึกยังไงบ้างคะ</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900">{userStats.currentStreak} วันติดต่อกัน</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Journey Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Baby className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userStats.currentStage} Journey</h2>
                <p className="text-pink-100">สัปดาห์ที่ {userStats.week} - คุณทำได้ดีมากค่ะ! 💕</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.wellnessScore}</div>
              <div className="text-pink-100">Wellness Score</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Wellness Score Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Wellness Balance</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['week', 'month'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        selectedPeriod === period
                          ? 'bg-pink-500 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {period === 'week' ? 'สัปดาห์' : 'เดือน'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wellness Categories */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {[
                  { key: 'physical', label: 'Physical', icon: Heart, color: 'pink', value: wellnessData.physical },
                  { key: 'mental', label: 'Mental', icon: Smile, color: 'purple', value: wellnessData.mental },
                  { key: 'nutrition', label: 'Nutrition', icon: Sparkles, color: 'green', value: wellnessData.nutrition },
                  { key: 'community', label: 'Community', icon: Users, color: 'blue', value: wellnessData.community }
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.key} className="text-center">
                      <div className={`bg-${category.color}-100 rounded-full p-3 w-fit mx-auto mb-2`}>
                        <Icon className={`h-6 w-6 text-${category.color}-600`} />
                      </div>
                      <div className={`text-2xl font-bold text-${category.color}-600 mb-1`}>
                        {category.value}
                      </div>
                      <div className="text-sm text-gray-600">{category.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Progress Chart */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">ความคืบหน้าสัปดาห์นี้</h4>
                <div className="flex justify-between items-end h-32 bg-gray-50 rounded-lg p-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="flex flex-col space-y-1">
                        {[
                          { value: day.physical, color: 'bg-pink-400' },
                          { value: day.mental, color: 'bg-purple-400' },
                          { value: day.nutrition, color: 'bg-green-400' },
                          { value: day.community, color: 'bg-blue-400' }
                        ].map((bar, barIndex) => (
                          <div
                            key={barIndex}
                            className={`w-4 ${bar.color} rounded-sm transition-all duration-500`}
                            style={{ height: `${bar.value * 3}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Next Milestone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">เป้าหมายถัดไป</h3>
                    <p className="text-gray-600">Badge &ldquo;{userStats.nextMilestone}&rdquo;</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">{userStats.daysToMilestone}</div>
                  <div className="text-sm text-gray-600">วันให้ถึงเป้าหมาย</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>ความคืบหน้า</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500" style={{ width: '70%' }} />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Badge Collection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Badge Collection</h3>
                <div className="flex items-center space-x-1 bg-pink-100 px-3 py-1 rounded-full">
                  <Trophy className="h-4 w-4 text-pink-600" />
                  <span className="text-sm font-semibold text-pink-600">{userStats.totalBadges}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {badges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative p-3 rounded-xl text-center transition-all duration-300 ${
                      badge.earned
                        ? 'bg-gradient-to-b from-yellow-100 to-yellow-200 border-2 border-yellow-300'
                        : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{badge.name}</div>
                    
                    {!badge.earned && badge.progress && (
                      <div className="absolute -bottom-1 left-1 right-1">
                        <div className="w-full bg-gray-300 rounded-full h-1.5">
                          <div
                            className="bg-pink-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-pink-600 hover:text-pink-700 text-sm font-medium">
                ดู Badge ทั้งหมด →
              </button>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ความสำเร็จล่าสุด</h3>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      achievement.type === 'badge' ? 'bg-yellow-100' :
                      achievement.type === 'course' ? 'bg-pink-100' :
                      achievement.type === 'community' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {achievement.type === 'badge' ? <Award className="h-4 w-4 text-yellow-600" /> :
                       achievement.type === 'course' ? <CheckCircle className="h-4 w-4 text-pink-600" /> :
                       achievement.type === 'community' ? <Users className="h-4 w-4 text-blue-600" /> :
                       <TrendingUp className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{achievement.text}</p>
                      <p className="text-xs text-gray-500">{achievement.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-200 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Impact</h3>
                  <p className="text-sm text-gray-600">ผลกระทบเชิงบวกต่อชุมชน</p>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{userStats.communityImpact}</div>
                <p className="text-sm text-gray-600 mb-4">การให้กำลังใจที่แจกออกไป</p>
                
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    &ldquo;คุณช่วยให้แม่ท้องและแม่ใหม่ {userStats.communityImpact} คนรู้สึกมีกำลังใจมากขึ้น ❤️&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
} 