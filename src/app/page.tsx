'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Star, Clock, CheckCircle, ArrowRight, Play, Heart, Dumbbell, Leaf, Utensils, Baby } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredCourses = [
    {
      id: 1,
      title: "Fertile Fit คอร์สบำรุงมดลูก เตรียมพร้อมสู่ความเป็นแม่",
      subtitle: "Pre-Pregnancy Fertility & Womb Care",
      instructor: "Bebe X ทีมผู้เชี่ยวชาญ",
      duration: "8 สัปดาห์",
      students: 1250,
      rating: 4.9,
      price: 4990,
      originalPrice: 6990,
      image: "/course-fertile-fit.jpg",
      category: "Exercise X Bebe",
      lifecycle: "pre-pregnancy",
      description: "เพิ่มโอกาสในการตั้งครรภ์ ด้วยการปรับสมดุลมดลูก, ฮอร์โมน และจิตใจให้พร้อม",
      bonus: "🎁 แถมฟรี: E-book Relaxation & Nutrition เบื้องต้น"
    },
    {
      id: 2,
      title: "Mommy Reboot คอร์สกู้ร่างมนุษย์แม่",
      subtitle: "Postpartum Fitness & Emotional Recovery",
      instructor: "Bebe X ทีมผู้เชี่ยวชาญ",
      duration: "12 สัปดาห์",
      students: 2380,
      rating: 4.8,
      price: 5990,
      originalPrice: 8990,
      image: "/course-mommy-reboot.jpg",
      category: "Exercise X Bebe", 
      lifecycle: "postpartum",
      description: "ฟื้นฟูร่างกายและจิตใจหลังคลอด ทั้งพุง หน้าท้อง กล้ามเนื้อ และใจที่อ่อนล้า",
      bonus: "🎁 แถมฟรี: E-book Relaxation & Nutrition เบื้องต้น"
    },
    {
      id: 3,
      title: "Hormone Reset คอร์สออกกำลังปรับฮอร์โมน",
      subtitle: "Hormonal Balance Fit",
      instructor: "Bebe X ทีมผู้เชี่ยวชาญ",
      duration: "10 สัปดาห์",
      students: 1890,
      rating: 4.9,
      price: 4490,
      originalPrice: 6490,
      image: "/course-hormone-reset.jpg",
      category: "Exercise X Bebe",
      lifecycle: "hormonal", 
      description: "รีเซ็ตระบบฮอร์โมน ลดอาการ PMS, ปวดประจำเดือน, เครียด, นอนไม่หลับ, น้ำหนักขึ้นง่าย",
      bonus: "🎁 แถมฟรี: E-book Relaxation & Nutrition เบื้องต้น"
    }
  ];

  const benefits = [
    "👶 Postnatal Recovery: โปรแกรมฟื้นฟูหลังคลอดอย่างมีประสิทธิภาพ",
    "⚖️ Hormonal Balance: สมดุลฮอร์โมนด้วยวิธีธรรมชาติ", 
    "💪 Pre-Pregnancy Fitness: เตรียมร่างกายและจิตใจก่อนตั้งครรภ์",
    "👩‍⚕️ Expert Guidance: คำปรึกษาจากผู้เชี่ยวชาญด้านสุขภาพผู้หญิง",
    "✅ เรียนที่บ้านได้ตลอด 24/7 เหมาะกับไลฟ์สไตล์แม่บ้าน",
    "🎯 ปลอดภัย 100% ผ่านการรับรองจากแพทย์ผู้เชี่ยวชาญ"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-2 text-pink-100">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-medium">เฉพาะสำหรับผู้หญิงทุกช่วงชีวิต</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                คุณแม่
                <br />
                <span className="text-yellow-300">สวยได้</span>
                <br />
                <span className="text-pink-100">แข็งแรงได้</span>
              </h1>
              
              <p className="text-xl text-pink-100 leading-relaxed">
                ดูแลสุขภาพผู้หญิงตั้งแต่ก่อนตั้งครรภ์ หลังคลอด 
                และสมดุลฮอร์โมนด้วยโปรแกรมที่ปลอดภัย
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses">
                  <button className="w-full bg-yellow-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-200 transition-colors duration-300 flex items-center justify-center">
                    <Heart className="h-5 w-5 mr-2" />
                    เริ่มต้นเป็นแม่สุขภาพดี
                  </button>
                </Link>
                <Link href="/courses">
                  <button className="w-full border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-pink-500 transition-colors duration-300">
                    ดูโปรแกรมทั้งหมด
                  </button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 text-pink-100">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>8,000+ คุณแม่สุขภาพดี</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-current" />
                  <span>4.9 คะแนน</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 overflow-hidden group">
                {/* Background Image with Multiple Overlays */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-pink-300 to-rose-400">
                  {/* Primary Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/481298223_1217952123033831_5937761994390873059_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=40lNCr78dCoQ7kNvwH2KfkB&_nc_oc=AdnfZ00IyMApu3eF6zX7w05KcCWfqeEqS7YQX1cIkzasI9QBvsla4HbBkTz5DtGR5v1cdUMOWwOMeooklUYwb--w&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=4HKY7h2LeYd2AV8-wt8gBg&oh=00_AfQ3WwIgKKSAP6DrvWjjNemDHMv5Gc-mfgRES7qN7fmtkw&oe=688D7CC5')`
                    }}
                  />
                  
                  {/* Gradient Overlays for Design Depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 via-transparent to-rose-600/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse" />
                  <div className="absolute bottom-6 left-4 w-8 h-8 bg-pink-300/30 rounded-full blur-sm animate-bounce" />
                  
                  {/* Content Overlay */}
                  <div className="relative h-full flex items-center justify-center">
                    {/* Play Button with Enhanced Design */}
                    <Link href="/courses/1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300 group-hover:shadow-xl"
                      >
                        <Play className="h-12 w-12 text-white ml-1" fill="currentColor" />
                        
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-30" />
                      </motion.button>
                    </Link>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      15:30
                    </div>
                    
                    {/* Live Indicator */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded-full">
                        PREVIEW
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section with Enhanced Styling */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">โปรแกรมแนะนำ: Hormone Reset</h3>
                    <div className="flex items-center space-x-1 bg-yellow-300/20 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <span className="text-yellow-300 text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <p className="text-pink-100 leading-relaxed">
                    รีเซ็ตระบบฮอร์โมน ลดอาการ PMS และปรับสมดุลร่างกาย
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-pink-200">
                      <span>ความคืบหน้า</span>
                      <span>3/12 บทเรียน</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-2 rounded-full transition-all duration-500" style={{ width: '25%' }} />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <Link href="/courses/1" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                      >
                        เริ่มเรียนเลย
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                      aria-label="Add to favorites"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              5 มิติการดูแลเฉพาะผู้หญิง
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เข้าใจผู้หญิงอย่างลึกซึ้ง ดูแลสุขภาพแบบองค์รวมตามธรรมชาติของร่างกายและจิตใจ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Exercise X Bebe Pillar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Dumbbell className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exercise X Bebe</h3>
              <h4 className="text-lg font-medium text-pink-600 mb-2">การออกกำลังกาย</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                โปรแกรมออกกำลังกายเฉพาะผู้หญิง มี 3 คอร์สหลัก:
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Fertile Fit - บำรุงมดลูก</div>
                <div>• Mommy Reboot - ฟื้นฟูหลังคลอด</div>
                <div>• Hormone Reset - ปรับฮอร์โมน</div>
                <div className="text-yellow-600 font-medium mt-2">🎁 แถม e-book ฟรี!</div>
              </div>
            </motion.div>

            {/* Relaxation X Dr.XX Pillar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Leaf className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Relaxation X Dr.XX</h3>
              <h4 className="text-lg font-medium text-pink-600 mb-2">การผ่อนคลาย</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                เทคนิคการผ่อนคลายและจัดการความเครียดโดยแพทย์เฉพาะทาง เพื่อสุขภาพจิตที่ดี
              </p>
            </motion.div>

            {/* Nutrition X Dr.XX Pillar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Utensils className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nutrition X Dr.XX</h3>
              <h4 className="text-lg font-medium text-pink-600 mb-2">โภชนาการ</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                แผนโภชนาการเฉพาะผู้หญิงโดยแพทย์เฉพาะทาง เพื่อสุขภาพที่สมบูรณ์แบบ
              </p>
            </motion.div>

            {/* Community Pillar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Users className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <h4 className="text-lg font-medium text-pink-600 mb-2">ชุมชน</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                ชุมชนผู้หญิงที่เข้าใจกัน แชร์ประสบการณ์ ให้กำลังใจ และเติบโตไปด้วยกัน
              </p>
            </motion.div>

            {/* Parenting tips X Dr.XX Pillar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Baby className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Parenting tips X Dr.XX</h3>
              <h4 className="text-lg font-medium text-pink-600 mb-2">คำแนะนำการเลี้ยงลูก</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                คำแนะนำจากแพทย์เฉพาะทางเรื่องการเลี้ยงลูก พัฒนาการ และปัญหาที่พบบ่อย
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Exercise X Bebe - 3 คอร์สหลัก
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              โปรแกรมออกกำลังกายเฉพาะผู้หญิง พร้อม e-book Relaxation & Nutrition แถมฟรี 
              <span className="text-pink-600 font-semibold"> *ต้องการคอร์สเต็ม Relaxation & Nutrition สามารถลงทะเบียนแยกได้</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-pink-100"
              >
                <div className="relative h-48 bg-gradient-to-br from-pink-400 to-rose-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      -{Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-pink-600 text-sm font-medium mb-3">{course.subtitle}</p>
                  <p className="text-gray-600 mb-2 font-medium">{course.instructor}</p>
                  <p className="text-gray-500 text-sm mb-3">{course.description}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-yellow-700 text-sm font-medium">{course.bonus}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-pink-600">
                          ฿{course.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 line-through">
                          ฿{course.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                        เริ่มเรียน
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Courses Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ดูโปรแกรมทั้งหมด
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                ทำไมสาวๆ ถึงเลือก FitLearn?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                เข้าใจทุกช่วงชีวิตของผู้หญิง ด้วยโปรแกรมที่ออกแบบโดยผู้เชี่ยวชาญเฉพาะทาง
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8 border border-pink-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ทดลองฟรี 7 วัน!
                    </h3>
                    <p className="text-gray-600">
                      ไม่มีผูกมัด ยกเลิกได้ตลอดเวลา
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-pink-100">
                      <span className="text-gray-600">คอร์สสำหรับผู้หญิงทั้งหมด</span>
                      <CheckCircle className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-pink-100">
                      <span className="text-gray-600">แผนการเรียนส่วนตัว</span>
                      <CheckCircle className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-pink-100">
                      <span className="text-gray-600">ปรึกษาเทรนเนอร์ผู้หญิง</span>
                      <CheckCircle className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600">ชุมชนสาวฟิต</span>
                      <CheckCircle className="h-5 w-5 text-pink-500" />
                    </div>
                  </div>
                  <Link href="/courses">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center">
                      เริ่มทดลองฟรี
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              พร้อมเป็นสาวฟิตแล้วหรือยัง?
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              เริ่มต้นการเดินทางสู่ความสวย ความแข็งแรง และความมั่นใจในตัวเอง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <button className="bg-yellow-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-200 transition-colors duration-300">
                  เริ่มเป็นสาวฟิต
                </button>
              </Link>
              <Link
                href="/courses"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-pink-500 transition-colors duration-300 inline-flex items-center justify-center"
              >
                ดูคอร์สทั้งหมด
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}