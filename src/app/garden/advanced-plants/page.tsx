'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdvancedPlantPanel from '@/components/garden/AdvancedPlantPanel'
import { Sparkles, ArrowLeft, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

const AdvancedPlantsPage = () => {
  // Demo plant data - in real app this would come from user's garden
  const [selectedPlant, setSelectedPlant] = useState({
    id: '12345',
    name: 'ดอกบัวทอง',
    stage: 3
  })

  const demoPlants = [
    { id: '12345', name: 'ดอกบัวทอง', type: 'บัว', stage: 3, abilities: 2 },
    { id: '12346', name: 'กุหลาบรุ้ง', type: 'กุหลาบ', stage: 2, abilities: 1 },
    { id: '12347', name: 'มะลิกาญจน์', type: 'มะลิ', stage: 4, abilities: 3 },
    { id: '12348', name: 'ออร์คิดม่วง', type: 'กล้วยไม้', stage: 1, abilities: 0 }
  ]

  const getStageColor = (stage: number) => {
    if (stage >= 4) return 'from-purple-500 to-pink-500'
    if (stage >= 3) return 'from-blue-500 to-indigo-500'
    if (stage >= 2) return 'from-green-500 to-emerald-500'
    return 'from-gray-400 to-gray-600'
  }

  const getStageEmoji = (stage: number) => {
    if (stage >= 4) return '👑'
    if (stage >= 3) return '⭐'
    if (stage >= 2) return '🌟'
    return '🌱'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/garden" 
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับสู่สวน</span>
          </Link>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ระบบพืชขั้นสูง</h1>
              <p className="text-gray-600">จัดการความสามารถพิเศษและวิวัฒนาการของพืช</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plant Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Crown className="h-6 w-6 text-yellow-500" />
                <span>พืชในสวนของคุณ</span>
              </h2>
              
              <div className="space-y-3">
                {demoPlants.map((plant) => (
                  <motion.button
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      selectedPlant.id === plant.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{plant.name}</h3>
                      <span className="text-xl">{getStageEmoji(plant.stage)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{plant.type} • Stage {plant.stage}</span>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span className="text-yellow-600 font-medium">{plant.abilities}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className={`h-1 rounded-full bg-gradient-to-r ${getStageColor(plant.stage)}`} />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">สถิติรวม</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {demoPlants.reduce((sum, plant) => sum + plant.abilities, 0)}
                    </div>
                    <div className="text-gray-600">ความสามารถ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {demoPlants.filter(plant => plant.stage >= 3).length}
                    </div>
                    <div className="text-gray-600">พืชขั้นสูง</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Plant Panel */}
          <div className="lg:col-span-2">
            <AdvancedPlantPanel
              plantId={selectedPlant.id}
              plantName={selectedPlant.name}
              plantStage={selectedPlant.stage}
              onAbilityUsed={() => {
                console.log('Ability used for plant:', selectedPlant.id)
              }}
              onEvolutionComplete={() => {
                console.log('Evolution complete for plant:', selectedPlant.id)
                // In real app, this would refresh the plant list
              }}
            />
          </div>
        </div>

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">ความสามารถพิเศษ</h3>
            <p className="text-gray-600 text-sm">
              ใช้พลังพิเศษของพืชเพื่อเพิ่ม XP, Star Seeds และเอฟเฟกต์ต่างๆ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">วิวัฒนาการ</h3>
            <p className="text-gray-600 text-sm">
              พัฒนาพืชให้เป็นรูปแบบที่หายากและมีความสามารถที่แกร่งขึ้น
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🧬</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">การผสมพันธุ์</h3>
            <p className="text-gray-600 text-sm">
              ผสมพันธุ์พืชเพื่อสร้างสายพันธุ์ใหม่ที่มีลักษณะพิเศษ (เร็วๆ นี้)
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedPlantsPage