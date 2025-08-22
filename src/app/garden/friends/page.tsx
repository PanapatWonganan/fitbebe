'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import FriendsList from '@/components/garden/FriendsList'

const FriendsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/garden"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  <span>เพื่อนในสวน</span>
                </h1>
                <p className="text-gray-600 mt-1">เชื่อมต่อและดูแลสวนร่วมกับเพื่อน</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🌸 Friend System Demo
            </h2>
            <p className="text-gray-600">
              ระบบเพื่อนสำหรับ Wellness Garden ที่ให้คุณเชื่อมต่อกับเพื่อนและช่วยเหลือกันในการดูแลสวน
            </p>
          </div>

          {/* Features Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <h3 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>ฟีเจอร์ Friend System</span>
            </h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p>• ✅ เพิ่มเพื่อนด้วยอีเมล</p>
              <p>• ✅ ส่งและรับคำขอเป็นเพื่อน</p>
              <p>• ✅ ค้นหาผู้ใช้ในระบบ</p>
              <p>• ✅ จัดการรายชื่อเพื่อน</p>
              <p>• 🚧 เยี่ยมชมสวนเพื่อน (กำลังพัฒนา)</p>
              <p>• 🚧 ช่วยรดน้ำพืชเพื่อน (กำลังพัฒนา)</p>
            </div>
          </div>
        </div>

        {/* Friends List Component */}
        <FriendsList />

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>วิธีใช้งาน</span>
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>1. 👫 **แท็บเพื่อน**: ดูรายชื่อเพื่อนทั้งหมด สามารถเยี่ยมชมสวนหรือลบเพื่อนได้</p>
            <p>2. 📨 **แท็บคำขอ**: ดูคำขอเป็นเพื่อนที่ได้รับ และส่งคำขอใหม่ด้วยอีเมล</p>
            <p>3. 🔍 **แท็บค้นหา**: ค้นหาผู้ใช้ในระบบด้วยชื่อหรืออีเมล</p>
            <p>4. ⭐ **การโต้ตอบ**: ในอนาคตจะสามารถช่วยเหลือเพื่อนในการดูแลสวนได้</p>
          </div>
        </div>

        {/* Back to Garden */}
        <div className="mt-8 text-center">
          <Link 
            href="/garden"
            className="inline-flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>กลับไปสวน</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FriendsPage