'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Clock, 
  Users, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Play,
  Baby,
  Target,
  BookOpen,
  Award,
  MessageCircle,
  ChevronRight,
  Calendar,
  Stethoscope
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock course data - in real app, this would come from API
const courseData = {
  1: {
    id: 1,
    title: "Prenatal Fitness: โยคะและออกกำลังกายคุณแม่",
    instructor: "ดร.สุดา เวชกรรมคลอด",
    instructorTitle: "แพทย์เฉพาะทางสูตินรีเวช",
    instructorExperience: "ประสบการณ์ 15+ ปี",
    duration: "9 เดือน",
    totalLessons: 36,
    students: 1850,
    rating: 4.9,
    reviews: 342,
    price: 3990,
    originalPrice: 5990,
    category: "Prenatal",
    level: "เริ่มต้น - ปานกลาง",
    language: "ภาษาไทย",
    image: "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/481298223_1217952123033831_5937761994390873059_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=40lNCr78dCoQ7kNvwH2KfkB&_nc_oc=AdnfZ00IyMApu3eF6zX7w05KcCWfqeEqS7YQX1cIkzasI9QBvsla4HbBkTz5DtGR5v1cdUMOWwOMeooklUYwb--w&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=4HKY7h2LeYd2AV8-wt8gBg&oh=00_AfQ3WwIgKKSAP6DrvWjjNemDHMv5Gc-mfgRES7qN7fmtkw&oe=688D7CC5",
    description: "โปรแกรมออกกำลังกายที่ปลอดภัยสำหรับคุณแม่ตั้งครรภ์ เน้นความแข็งแรงและเตรียมความพร้อมสำหรับการคลอด พัฒนาโดยแพทย์เฉพาะทาง",
    safetyInfo: {
      suitable: [
        "ตั้งครรภ์สัปดาห์ที่ 12 ขึ้นไป",
        "ไม่มีภาวะแทรกซ้อนในการตั้งครรภ์",
        "ได้รับอนุมัติจากแพทย์ผู้ดูแล",
        "ไม่เคยมีประวัติแท้งซ้ำ"
      ],
      notSuitable: [
        "ตั้งครรภ์เสี่ยงสูง",
        "มีอาการเลือดออกผิดปกติ",
        "ความดันโลหิตสูงจากการตั้งครรภ์",
        "มีประวัติก่อนกำหนด",
        "โรคหัวใจ หรือปอด"
      ],
      stopSigns: [
        "เลือดออกจากช่องคลอด",
        "ปวดหน้าอก หรือ หายใจลำบาก",
        "ปวดศีรษะรุนแรง",
        "บวมที่มือ ใบหน้า อย่างฉับพลัน",
        "ปวดท้องรุนแรง หรือ การหดรัดตัวของมดลูก",
        "เจ็บน่องอย่างต่อเนื่อง"
      ]
    },
    curriculum: [
      {
        week: "สัปดาห์ที่ 1-4",
        title: "การเตรียมพื้นฐาน",
        lessons: [
          { title: "ทำความรู้จักกับร่างกายขณะตั้งครรภ์", duration: "15 นาที", type: "theory" },
          { title: "เทคนิคการหายใจสำหรับคุณแม่", duration: "10 นาที", type: "practice" },
          { title: "ท่าโยคะเบื้องต้นที่ปลอดภัย", duration: "20 นาที", type: "practice" },
          { title: "การยืดเหยียดเพื่อลดอาการปวดหลัง", duration: "15 นาที", type: "practice" }
        ]
      },
      {
        week: "สัปดาห์ที่ 5-8", 
        title: "การสร้างความแข็งแรง",
        lessons: [
          { title: "เสริมกล้ามเนื้อแกนกายอย่างปลอดภัย", duration: "25 นาที", type: "practice" },
          { title: "ออกกำลังกายเพื่อเตรียมการคลอด", duration: "30 นาที", type: "practice" },
          { title: "การจัดการอาการคลื่นไส้และอาการไม่สบาย", duration: "12 นาที", type: "theory" },
          { title: "โยคะเพื่อการนอนหลับที่ดี", duration: "18 นาที", type: "practice" }
        ]
      }
    ],
    benefits: [
      "ลดอาการปวดหลังและคอ",
      "เพิ่มความแข็งแรงกล้ามเนื้อแกนกาย", 
      "เตรียมความพร้อมร่างกายสำหรับการคลอด",
      "ลดความเครียดและวิตกกังวล",
      "ปรับปรุงการนอนหลับ",
      "เพิ่มพลังงานและสุขภาพจิตที่ดี"
    ],
    requirements: [
      "เสื่อโยคะ",
      "หมอนรองหรือ bolster",
      "พื้นที่ออกกำลังกายขนาด 2x2 เมตร",
      "เครื่องเล่นวิดีโอ (มือถือ/แท็บเล็ต/คอมพิวเตอร์)"
    ]
  }
};

export default function CoursePage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const course = courseData[courseId as keyof typeof courseData];

  const [showSafetyModal, setShowSafetyModal] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลคอร์ส</h1>
          <Link href="/courses" className="text-pink-600 hover:text-pink-700">
            กลับไปหน้าคอร์สทั้งหมด
          </Link>
        </div>
      </div>
    );
  }

  const handleStartCourse = () => {
    // Navigate to health assessment
    window.location.href = `/courses/${courseId}/assessment`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50">
      
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-pink-100">
                <Baby className="h-5 w-5" />
                <span className="text-sm font-medium">{course.category}</span>
                <span className="text-pink-200">•</span>
                <span className="text-sm">{course.level}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-pink-100 leading-relaxed">
                {course.description}
              </p>
              
              {/* Instructor */}
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">{course.instructor}</div>
                  <div className="text-pink-100 text-sm">{course.instructorTitle}</div>
                  <div className="text-pink-200 text-sm">{course.instructorExperience}</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-pink-100">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} คน</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-current" />
                  <span>{course.rating} ({course.reviews} รีวิว)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.totalLessons} บทเรียน</span>
                </div>
              </div>
            </motion.div>

            {/* Course Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-pink-300/50 to-rose-400/50 rounded-xl mb-4 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${course.image}')`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-300"
                      >
                        <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">฿{course.price.toLocaleString()}</div>
                      <div className="text-pink-200 line-through text-sm">฿{course.originalPrice.toLocaleString()}</div>
                    </div>
                    <div className="bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      ประหยัด {Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </div>
                  </div>
                  
                  <button
                    onClick={handleStartCourse}
                    className="w-full bg-yellow-300 text-gray-900 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Stethoscope className="h-5 w-5" />
                    <span>ประเมินสุขภาพและเริ่มเรียน</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowSafetyModal(true)}
                    className="w-full border-2 border-white text-white py-3 rounded-xl font-medium hover:bg-white hover:text-pink-500 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Shield className="h-5 w-5" />
                    <span>ข้อมูลความปลอดภัย</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Safety Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">ข้อมูลความปลอดภัยสำคัญ</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      เหมาะสำหรับ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {course.safetyInfo.suitable.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      ไม่เหมาะสำหรับ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {course.safetyInfo.notSuitable.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setShowSafetyModal(true)}
                      className="text-red-600 text-sm font-medium mt-2 hover:text-red-700"
                    >
                      ดูข้อมูลเพิ่มเติม →
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Course Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">เนื้อหาการเรียน</h3>
                
                <div className="space-y-6">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{section.week}</h4>
                        <span className="text-sm text-gray-500">{section.lessons.length} บทเรียน</span>
                      </div>
                      <h5 className="font-medium text-pink-600 mb-3">{section.title}</h5>
                      
                      <div className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                lesson.type === 'theory' ? 'bg-blue-100' : 'bg-pink-100'
                              }`}>
                                {lesson.type === 'theory' ? 
                                  <BookOpen className={`h-4 w-4 ${lesson.type === 'theory' ? 'text-blue-600' : 'text-pink-600'}`} /> :
                                  <Play className="h-4 w-4 text-pink-600" />
                                }
                              </div>
                              <span className="text-gray-900 font-medium">{lesson.title}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">ประโยชน์ที่คุณจะได้รับ</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">สิ่งที่ต้องเตรียม</h3>
                
                <ul className="space-y-3">
                  {course.requirements.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Instructor Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">ผู้สอน</h3>
                
                <div className="text-center">
                  <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="h-8 w-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{course.instructor}</h4>
                  <p className="text-pink-600 text-sm font-medium">{course.instructorTitle}</p>
                  <p className="text-gray-600 text-sm mt-2">{course.instructorExperience}</p>
                  
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-pink-600">{course.students.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">นักเรียน</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-pink-600">{course.rating}</div>
                        <div className="text-xs text-gray-600">คะแนน</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
              >
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">ต้องการความช่วยเหลือ?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษา
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    ปรึกษาผู้เชี่ยวชาญ
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 text-red-600 mr-3" />
                ข้อมูลความปลอดภัยครบถ้วน
              </h3>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  หยุดออกกำลังกายทันทีเมื่อมีอาการเหล่านี้:
                </h4>
                <ul className="space-y-2">
                  {course.safetyInfo.stopSigns.map((sign, index) => (
                    <li key={index} className="flex items-start text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-3">✅ เหมาะสำหรับ:</h4>
                  <ul className="space-y-1">
                    {course.safetyInfo.suitable.map((item, index) => (
                      <li key={index} className="text-green-700 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h4 className="font-semibold text-red-800 mb-3">❌ ไม่เหมาะสำหรับ:</h4>
                  <ul className="space-y-1">
                    {course.safetyInfo.notSuitable.map((item, index) => (
                      <li key={index} className="text-red-700 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ ข้อควรระวัง:</h4>
                <p className="text-yellow-700 text-sm">
                  กรุณาปรึกษาแพทย์ผู้ดูแลการตั้งครรภ์ก่อนเริ่มโปรแกรมการออกกำลังกายใดๆ 
                  และหยุดทันทีหากมีอาการผิดปกติ
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  ปิด
                </button>
                <button
                  onClick={() => {
                    setShowSafetyModal(false);
                    handleStartCourse();
                  }}
                  className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-medium hover:bg-pink-700 transition-colors"
                >
                  เข้าใจแล้ว เริ่มประเมินสุขภาพ
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 