'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Crown, 
  Gift, 
  Target, 
  Users,
  Settings,
  Plus,
  Droplets,
  Star,
  TrendingUp,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react'

import { useAuth } from '@/contexts/AuthContextNew'
import { useGarden } from '@/contexts/GardenContext'
import { useNotification } from '@/contexts/NotificationContext'
import XPProgressBar, { XPGainAnimation, LevelUpAnimation } from '@/components/garden/XPProgressBar'
import PlantComponent, { PlantGrid } from '@/components/garden/PlantComponent'
import PlantCareModal from '@/components/garden/PlantCareModal'
import PlantShopModal from '@/components/garden/PlantShopModal'
import LearningProgressWidget from '@/components/garden/LearningProgressWidget'
import { UserPlant, PlantType } from '@/lib/garden/types'
import { formatXP, formatThaiDateTime } from '@/lib/garden/api'

const GardenDashboard = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const { 
    gardenData, 
    plantTypes, 
    todayChallenges,
    isLoading,
    isWatering,
    isHarvesting,
    plantSeed,
    waterPlant,
    harvestPlant,
    waterGarden,
    updateChallengeProgress,
    getPlantTypeById,
    canAffordPlant
  } = useGarden()

  const { addNotification } = useNotification()

  // ตรวจสอบ authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // เพิ่ม delay เล็กน้อยให้ user เห็นข้อความก่อน redirect
      const timer = setTimeout(() => {
        router.push('/auth')
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [authLoading, isAuthenticated, router])

  const [selectedPlant, setSelectedPlant] = useState<UserPlant | null>(null)
  const [selectedPlantType, setSelectedPlantType] = useState<PlantType | null>(null)
  const [showPlantShop, setShowPlantShop] = useState(false)
  const [showXPGain, setShowXPGain] = useState<number | null>(null)
  const [showLevelUp, setShowLevelUp] = useState<number | null>(null)

  // Handle plant care actions
  const handleWaterPlant = async (plantId: string) => {
    try {
      const result = await waterPlant(plantId)
      addNotification({
        type: 'success',
        message: `รดน้ำพืชสำเร็จ! ได้รับ ${result.rewards.xp} XP และ ${result.rewards.star_seeds} Star Seeds`
      })
      
      if (result.grew_up) {
        addNotification({
          type: 'info',
          message: '🌱 พืชของคุณเติบโตขึ้นแล้ว!'
        })
      }
      
      setShowXPGain(result.rewards.xp)
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถรดน้ำพืชได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }

  const handleHarvestPlant = async (plantId: string) => {
    try {
      const result = await harvestPlant(plantId)
      addNotification({
        type: 'success',
        message: result.rewards.message
      })
      setShowXPGain(result.rewards.xp)
      setSelectedPlant(null) // Close modal after harvest
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถเก็บเกี่ยวได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }

  const handleWaterGarden = async () => {
    try {
      const result = await waterGarden()
      addNotification({
        type: 'success',
        message: `รดน้ำสวนสำเร็จ! รดน้ำพืช ${result.plants_watered} ต้น ได้รับ ${result.rewards.xp} XP`
      })
      setShowXPGain(result.rewards.xp)
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถรดน้ำสวนได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }

  const handlePlantSeed = async (plantTypeId: string, customName?: string) => {
    try {
      const result = await plantSeed(plantTypeId, { custom_name: customName })
      addNotification({
        type: 'success',
        message: `ปลูก${result.plant.name}สำเร็จ! ได้รับ 10 XP`
      })
      setShowPlantShop(false)
      setShowXPGain(10)
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถปลูกพืชได้ กรุณาตรวจสอบ Star Seeds'
      })
    }
  }

  const handlePlantClick = (plant: UserPlant) => {
    setSelectedPlant(plant)
    setSelectedPlantType(getPlantTypeById(plant.type) || null)
  }

  const handleUpdateChallenge = async (challengeId: string) => {
    try {
      const result = await updateChallengeProgress(challengeId)
      if (result.challenge.is_completed) {
        addNotification({
          type: 'success',
          message: result.rewards?.message || 'ทำภารกิจสำเร็จ!'
        })
        if (result.rewards?.xp) {
          setShowXPGain(result.rewards.xp)
        }
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถอัปเดตภารกิจได้'
      })
    }
  }

  // แสดง loading หรือ redirect หาก auth กำลังโหลดหรือไม่ได้ login
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
        <div className="ml-4 text-gray-600">
          {authLoading ? 'กำลังตรวจสอบการเข้าสู่ระบบ...' : 'กำลังนำไปยังหน้าเข้าสู่ระบบ...'}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
        <div className="ml-4 text-gray-600">กำลังโหลดข้อมูลสวน...</div>
      </div>
    )
  }

  if (!gardenData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">ไม่พบข้อมูลสวน</h2>
          <p className="text-gray-500">กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    )
  }

  const { garden, plants, recent_activities, stats } = gardenData
  const plantsNeedingWater = plants.filter(plant => plant.needs_watering)
  const plantsReadyToHarvest = plants.filter(plant => plant.can_harvest)
  const completedChallenges = todayChallenges.filter(c => c.is_completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <span>🌱</span>
                <span>สวนสุขภาพของคุณ</span>
              </h1>
              <p className="text-gray-600 mt-1">ดูแลพืชและพัฒนาสุขภาพไปด้วยกัน</p>
            </div>
            
            {/* Garden Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span className="font-bold">{garden.star_seeds} Seeds</span>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">{formatXP(garden.xp)} XP</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <XPProgressBar
              level={garden.level}
              currentXP={garden.xp}
              xpForNextLevel={garden.xp_for_next_level}
              canLevelUp={garden.can_level_up}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span>การดำเนินการด่วน</span>
              </h3>

              {/* Water Garden Button */}
              {plantsNeedingWater.length > 0 && (
                <motion.button
                  onClick={handleWaterGarden}
                  disabled={isWatering}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Droplets className="w-5 h-5" />
                  <span>รดน้ำสวน ({plantsNeedingWater.length})</span>
                </motion.button>
              )}

              {/* Plant New Seed */}
              <motion.button
                onClick={() => setShowPlantShop(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                <span>ปลูกพืชใหม่</span>
              </motion.button>

              {/* Demo Lesson Integration */}
              <motion.a
                href="/garden/demo-lesson"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="w-5 h-5" />
                <span>ทดสอบ Course Integration</span>
              </motion.a>

              {/* Friends System */}
              <motion.a
                href="/garden/friends"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-5 h-5" />
                <span>เพื่อนในสวน</span>
              </motion.a>

              {/* Garden Themes */}
              <motion.a
                href="/garden/themes"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Settings className="w-5 h-5" />
                <span>ปรับแต่งธีม</span>
              </motion.a>

              {/* Community Garden */}
              <motion.a
                href="/garden/community"
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-5 h-5" />
                <span>ชุมชนสวน</span>
              </motion.a>

              {/* Advanced Plants System */}
              <motion.a
                href="/garden/advanced-plants"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-5 h-5" />
                <span>ระบบพืชขั้นสูง</span>
              </motion.a>

              {/* Seasonal Events */}
              <motion.a
                href="/garden/seasonal"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                <span>เหตุการณ์ตามฤดูกาล</span>
              </motion.a>

              {/* Garden Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">สรุปสวน</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">พืชทั้งหมด:</span>
                    <span className="font-medium">{stats.total_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">กำลังเติบโต:</span>
                    <span className="font-medium">{stats.growing_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">โตเต็มที่:</span>
                    <span className="font-medium">{stats.mature_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ต้องการน้ำ:</span>
                    <span className="font-medium text-red-600">{stats.plants_need_water}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Challenges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-bold text-lg flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-blue-500" />
                <span>ภารกิจวันนี้</span>
              </h3>

              <div className="space-y-3">
                {todayChallenges.slice(0, 3).map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-3 rounded-xl border-2 transition-colors cursor-pointer ${
                      challenge.is_completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => !challenge.is_completed && handleUpdateChallenge(challenge.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{challenge.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{challenge.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                      </div>
                      {challenge.is_completed && (
                        <div className="ml-2 text-green-500">
                          <Award className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="text-center text-sm text-gray-500 mt-4">
                  สำเร็จแล้ว {completedChallenges}/{todayChallenges.length} ภารกิจ
                </div>
              </div>
            </div>

            {/* Learning Progress Widget */}
            <div className="mt-6">
              <LearningProgressWidget />
            </div>
          </div>

          {/* Main Garden Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">สวนของคุณ</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>อัปเดตล่าสุด: {formatThaiDateTime(new Date().toISOString())}</span>
                </div>
              </div>

              {/* Plant Grid */}
              <PlantGrid
                plants={plants}
                onWater={handleWaterPlant}
                onHarvest={handleHarvestPlant}
                onPlantClick={handlePlantClick}
                isWatering={isWatering}
                isHarvesting={isHarvesting}
                emptySlots={Math.max(0, 6 - plants.length)}
                onEmptySlotClick={() => setShowPlantShop(true)}
              />

              {/* Recent Activities */}
              {recent_activities.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">กิจกรรมล่าสุด</h3>
                  <div className="space-y-2">
                    {recent_activities.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time_ago}</p>
                        </div>
                        {activity.xp_earned > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            +{activity.xp_earned} XP
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plant Care Modal */}
      <PlantCareModal
        plant={selectedPlant}
        plantType={selectedPlantType}
        isOpen={!!selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onWater={handleWaterPlant}
        onHarvest={handleHarvestPlant}
        isWatering={isWatering}
        isHarvesting={isHarvesting}
      />

      {/* Plant Shop Modal */}
      <PlantShopModal
        isOpen={showPlantShop}
        onClose={() => setShowPlantShop(false)}
        plantTypes={plantTypes}
        userLevel={gardenData?.garden.level || 1}
        starSeeds={gardenData?.garden.star_seeds || 0}
        onPlantSeed={handlePlantSeed}
        canAffordPlant={canAffordPlant}
      />

      {/* XP Gain Animation */}
      <AnimatePresence>
        {showXPGain && (
          <XPGainAnimation
            xpGained={showXPGain}
            onComplete={() => setShowXPGain(null)}
          />
        )}
      </AnimatePresence>

      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <LevelUpAnimation
            newLevel={showLevelUp}
            onComplete={() => setShowLevelUp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default GardenDashboard