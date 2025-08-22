'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  Clock,
  Shield,
  Activity,
  User,
  ArrowLeft,
  Play,
  Phone
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface ChecklistItem {
  id: string;
  category: 'safety' | 'health' | 'preparation' | 'environment';
  question: string;
  required: boolean;
  checked: boolean;
  warning?: string;
}

export default function PreClassChecklist() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Safety Checks
    {
      id: 'doctor_approval',
      category: 'safety',
      question: 'ฉันได้รับอนุมัติจากแพทย์ให้ออกกำลังกายได้',
      required: true,
      checked: false
    },
    {
      id: 'no_bleeding',
      category: 'safety', 
      question: 'ฉันไม่มีอาการเลือดออกผิดปกติ',
      required: true,
      checked: false,
      warning: 'หากมีเลือดออก กรุณาหยุดทันทีและปรึกษาแพทย์'
    },
    {
      id: 'no_severe_pain',
      category: 'safety',
      question: 'ฉันไม่มีอาการปวดท้องรุนแรงหรือการหดรัดตัวของมดลูก',
      required: true,
      checked: false,
      warning: 'หากมีอาการปวดท้องรุนแรง ห้ามออกกำลังกาย'
    },
    {
      id: 'no_dizziness',
      category: 'safety',
      question: 'ฉันไม่มีอาการวิงเวียนศีรษะหรือเป็นลม',
      required: true,
      checked: false
    },

    // Health Status
    {
      id: 'feeling_well',
      category: 'health',
      question: 'วันนี้ฉันรู้สึกสบายดีและพร้อมออกกำลังกาย',
      required: true,
      checked: false
    },
    {
      id: 'adequate_sleep',
      category: 'health',
      question: 'เมื่อคืนฉันนอนหลับเพียงพอ (อย่างน้อย 6 ชั่วโมง)',
      required: false,
      checked: false
    },
    {
      id: 'no_fever',
      category: 'health',
      question: 'ฉันไม่มีไข้หรืออาการป่วย',
      required: true,
      checked: false
    },
    {
      id: 'normal_blood_pressure',
      category: 'health',
      question: 'ความดันโลหิตของฉันอยู่ในเกณฑ์ปกติ',
      required: false,
      checked: false
    },

    // Preparation
    {
      id: 'hydrated',
      category: 'preparation',
      question: 'ฉันดื่มน้ำเพียงพอแล้ว (อย่างน้อย 1-2 แก้ว)',
      required: true,
      checked: false
    },
    {
      id: 'proper_clothing',
      category: 'preparation',
      question: 'ฉันใส่เสื้อผ้าที่เหมาะสมสำหรับออกกำลังกาย',
      required: true,
      checked: false
    },
    {
      id: 'empty_bladder',
      category: 'preparation',
      question: 'ฉันได้เข้าห้องน้ำแล้ว',
      required: true,
      checked: false
    },
    {
      id: 'light_meal',
      category: 'preparation',
      question: 'ฉันไม่ได้กินอาหารหนักในช่วง 2 ชั่วโมงที่ผ่านมา',
      required: true,
      checked: false
    },

    // Environment
    {
      id: 'safe_space',
      category: 'environment',
      question: 'พื้นที่ออกกำลังกายปลอดภัย ไม่ลื่น และมีพื้นที่เพียงพอ',
      required: true,
      checked: false
    },
    {
      id: 'room_temperature',
      category: 'environment',
      question: 'อุณหภูมิห้องเหมาะสม ไม่ร้อนเกินไป',
      required: true,
      checked: false
    },
    {
      id: 'emergency_contact',
      category: 'environment',
      question: 'มีผู้ใหญ่อยู่ใกล้ๆ หรือสามารถติดต่อได้ในกรณีฉุกเฉิน',
      required: true,
      checked: false
    }
  ]);

  const [currentTime] = useState(new Date());
  const [showWarning, setShowWarning] = useState<string | null>(null);

  const handleChecklistChange = (id: string, checked: boolean) => {
    const item = checklist.find(item => item.id === id);
    
    if (!checked && item?.warning) {
      setShowWarning(item.warning);
      return;
    }

    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
    setShowWarning(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return Shield;
      case 'health': return Heart;
      case 'preparation': return User;
      case 'environment': return Activity;
      default: return CheckCircle;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'safety': return 'ความปลอดภัย';
      case 'health': return 'สถานะสุขภาพ';
      case 'preparation': return 'การเตรียมตัว';
      case 'environment': return 'สภาพแวดล้อม';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'red';
      case 'health': return 'pink';
      case 'preparation': return 'blue';
      case 'environment': return 'green';
      default: return 'gray';
    }
  };

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const requiredItems = checklist.filter(item => item.required);
  const checkedRequiredItems = requiredItems.filter(item => item.checked);
  const canProceed = checkedRequiredItems.length === requiredItems.length;

  const completedPercentage = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100);

  const handleStartLesson = () => {
    // Navigate to the first lesson
    router.push(`/courses/${courseId}/lessons/1`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/courses/${courseId}/assessment`}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับไปประเมินสุขภาพ</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Pre-Class Checklist</h1>
              <p className="text-sm text-gray-600">ตรวจสอบความพร้อมก่อนเริ่มบทเรียน</p>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">ความคืบหน้า</h2>
              <p className="text-sm text-gray-600">
                {checklist.filter(item => item.checked).length} จาก {checklist.length} รายการ
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">{completedPercentage}%</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completedPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-bold text-red-800">คำเตือนด้านความปลอดภัย</h3>
            </div>
            <p className="text-gray-700 mb-6">{showWarning}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowWarning(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ปิด
              </button>
              <button
                onClick={() => {
                  setShowWarning(null);
                  // Could add emergency contact functionality here
                }}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>ติดต่อแพทย์</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Checklist Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {Object.entries(groupedChecklist).map(([category, items]) => {
            const Icon = getCategoryIcon(category);
            const color = getCategoryColor(category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden"
              >
                <div className={`bg-${color}-50 border-b border-${color}-100 px-6 py-4`}>
                  <div className="flex items-center space-x-3">
                    <div className={`bg-${color}-100 p-2 rounded-full`}>
                      <Icon className={`h-5 w-5 text-${color}-600`} />
                    </div>
                    <h3 className={`text-lg font-semibold text-${color}-800`}>
                      {getCategoryTitle(category)}
                    </h3>
                    <div className="flex-1" />
                    <div className="text-sm text-gray-600">
                      {items.filter(item => item.checked).length}/{items.length}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {items.map((item, index) => (
                    <motion.label
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        item.checked 
                          ? `bg-${color}-50 border-2 border-${color}-200` 
                          : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) => handleChecklistChange(item.id, e.target.checked)}
                          className={`h-5 w-5 rounded focus:ring-2 focus:ring-${color}-500 text-${color}-600`}
                        />
                        {item.checked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1"
                          >
                            <CheckCircle className={`h-3 w-3 text-${color}-600 fill-current`} />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${item.checked ? `text-${color}-800` : 'text-gray-700'}`}>
                            {item.question}
                          </span>
                          {item.required && (
                            <span className="text-red-500 text-sm">*</span>
                          )}
                        </div>
                        {item.warning && !item.checked && (
                          <p className="text-xs text-yellow-600 mt-1 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            คำเตือน: {item.warning}
                          </p>
                        )}
                      </div>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Emergency Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800">หยุดออกกำลังกายทันทีหาก:</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-red-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>เลือดออกจากช่องคลอด</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>ปวดหน้าอกหรือหายใจลำบาก</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>ปวดศีรษะรุนแรง</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>บวมมือ ใบหน้า อย่างฉับพลัน</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>ปวดท้องรุนแรง</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span>รู้สึกเจ็บน่องอย่างต่อเนื่อง</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-red-800 text-sm font-medium">
                📞 กรณีฉุกเฉิน: โทร 1669 หรือติดต่อแพทย์ผู้ดูแลทันที
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Link
              href={`/courses/${courseId}/assessment`}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับไปแก้ไขการประเมิน</span>
            </Link>
            
            <button
              onClick={handleStartLesson}
              disabled={!canProceed}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                canProceed
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Play className="h-5 w-5" />
              <span>เริ่มบทเรียน</span>
            </button>
          </div>
          
          {!canProceed && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                กรุณาเช็ครายการที่มีเครื่องหมาย * ให้ครบถ้วนก่อนเริ่มบทเรียน
              </p>
              <p className="text-xs text-red-600 mt-1">
                ยังขาดอีก {requiredItems.length - checkedRequiredItems.length} รายการ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 