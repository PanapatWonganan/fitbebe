'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import CommunityDashboard from '@/components/garden/CommunityDashboard'

const CommunityGardenPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/garden"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับสู่สวน</span>
            </Link>
            <div className="h-5 border-l border-gray-300" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-500" />
                <span>ชุมชนสวนสุขภาพ</span>
              </h1>
              <p className="text-gray-600 mt-1">ร่วมสร้างสรรค์สวนแห่งความสุขร้วมกัน</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CommunityDashboard />
        </motion.div>

        {/* Demo Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>เกี่ยวกับชุมชนสวนสุขภาพ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">🌍 ชุมชนแห่งการแบ่งปัน</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• <strong>สวนยอดนิยม</strong> - ชมและเรียนรู้จากสวนที่สวยงาม</li>
                <li>• <strong>โครงการชุมชน</strong> - ร่วมทำกิจกรรมเพื่อเป้าหมายร่วม</li>
                <li>• <strong>อันดับคะแนน</strong> - แข่งขันกับเพื่อนนักสวน</li>
                <li>• <strong>การช่วยเหลือ</strong> - รดน้ำและดูแลพืชร่วมกัน</li>
                <li>• <strong>แรงบันดาลใจ</strong> - เรียนรู้เทคนิคการปลูกใหม่ๆ</li>
                <li>• <strong>รางวัลพิเศษ</strong> - ได้ XP และ Star Seeds เพิ่ม</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">✨ กิจกรรมที่ทำได้</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• เยี่ยมชมสวนสาธารณะของสมาชิก</li>
                <li>• ถูกใจสวนที่ชอบ (+5 XP)</li>
                <li>• รดน้ำพืชในสวนเพื่อน (+10 XP, +3 Seeds)</li>
                <li>• เข้าร่วมโครงการชุมชนรายเดือน</li>
                <li>• ดูอันดับนักสวนยอดเยี่ยม</li>
                <li>• แลกเปลี่ยนประสบการณ์การทำสวน</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 เคล็ดลับ:</strong> การมีส่วนร่วมในชุมชนจะช่วยให้คุณได้รับ XP และ Star Seeds เพิ่มเติม 
              พร้อมทั้งแรงบันดาลใจจากสวนสวยๆ ของเพื่อนสมาชิก!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityGardenPage