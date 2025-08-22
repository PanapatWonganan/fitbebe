'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Users, 
  CheckCircle, 
  Play,
  Shield,
  Target,
  Crown,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "คุณนิ่ม - แม่ลูก 2",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "หลังคลอดลูกคนที่ 2 ตัวหลวมมาก คิดว่าจะกลับมาฟิตไม่ได้แล้ว แต่ BoostMe ทำให้ฉันกลับมาสวยและแข็งแรงกว่าเดิม ภายใน 3 เดือน!",
      result: "ลดน้ำหนัก 15 กก. ใน 3 เดือน",
      stars: 5
    },
    {
      name: "คุณแป้ง - คุณแม่วัย 28",
      image: "https://randomuser.me/api/portraits/women/2.jpg", 
      text: "ตั้งครรภ์ครั้งแรกกลัวมาก กลัวอ้วน กลัวคลอดยาก แต่ BoostMe ดูแลฉันตลอด 9 เดือน คลอดง่าย หุ่นกลับมาเร็วมาก!",
      result: "คลอดปกติ น้ำหนักขณะตั้งครรภ์เพิ่มแค่ 8 กก.",
      stars: 5
    },
    {
      name: "คุณมิ้น - อายุ 35 ปี",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "อายุ 35 ตั้งครรภ์ลูกแรก กังวลมาก แต่ BoostMe ช่วยให้ฉันผ่านพ้นช่วงตั้งครรภ์อย่างปลอดภัย ลูกเกิดมาแข็งแรง!",
      result: "ตั้งครรภ์ปลอดภัย ลูกน้ำหนัก 3.2 กก.",
      stars: 5
    }
  ];

  // Testimonial rotation
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  const stats = [
    { number: "15,000+", label: "คุณแม่ที่เปลี่ยนชีวิต" },
    { number: "98%", label: "พอใจและแนะนำต่อ" },
    { number: "4.9/5", label: "คะแนนรีวิว" },
    { number: "24/7", label: "ซัพพอร์ตตลอด" }
  ];

  const problems = [
    "😰 ตั้งครรภ์แล้วกลัวอ้วน กลัวหุ่นพัง",
    "😢 หลังคลอดแล้วหุ่นไม่กลับ รู้สึกไม่สวย",
    "🤔 ไม่รู้ว่าออกกำลังกายยังไงให้ปลอดภัย",
    "😔 ไม่มีเวลาไปฟิตเนส มีลูกต้องดูแล",
    "💸 ค่าเทรนเนอร์แพง ไปไม่สม่ำเสมอ",
    "🏥 หาข้อมูลที่ถูกต้องยาก กลัวทำผิด"
  ];

  const solutions = [
    {
      icon: <Shield className="w-8 h-8 text-pink-500" />,
      title: "ปลอดภัย 100%",
      desc: "พัฒนาโดยแพทย์เฉพาะทาง ปลอดภัยทั้งแม่และลูก"
    },
    {
      icon: <Play className="w-8 h-8 text-pink-500" />,
      title: "เรียนที่บ้าน 24/7",
      desc: "ไม่ต้องเดินทาง เรียนได้ตลอดเวลาที่สะดวก"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: "ชุมชนแม่ๆ",
      desc: "เพื่อนแม่ 15,000+ คน ให้กำลังใจและแชร์ประสบการณ์"
    },
    {
      icon: <Target className="w-8 h-8 text-pink-500" />,
      title: "ผลลัพธ์รับประกัน",
      desc: "ไม่พอใจยินดีคืนเงิน 100% ภายใน 30 วัน"
    }
  ];

  const features = [
    "✅ โปรแกรมออกกำลังกายแบ่งตามช่วงอายุครรภ์",
    "✅ คลาสโยคะและสมาธิสำหรับคุณแม่",
    "✅ แผนอาหารที่ปลอดภัยและบำรุงน้ำนม",
    "✅ เทคนิคการคลอดและจัดการความเจ็บปวด",
    "✅ โปรแกรมฟื้นฟูหลังคลอดทีละขั้นตอน",
    "✅ คลาสออกกำลังกายพร้อมลูกน้อย",
    "✅ การดูแลสุขภาพจิตและป้องกัน Baby Blues",
    "✅ ชุมชนออนไลน์สำหรับแลกเปลี่ยนประสบการณ์"
  ];

  const bonuses = [
    {
      title: "🎁 E-book การตั้งครรภ์ที่สมบูรณ์แบบ",
      value: "มูลค่า 1,990 บาท",
      desc: "คู่มือครบถ้วนตั้งแต่เตรียมตัวตั้งครรภ์จนคลอด"
    },
    {
      title: "🍼 แผนอาหาร 9 เดือน พร้อมสูตรอาหาร",
      value: "มูลค่า 2,990 บาท", 
      desc: "เมนูอาหารและสูตรเฉพาะสำหรับคุณแม่แต่ละช่วง"
    },
    {
      title: "👶 คลาสเตรียมพร้อมเป็นแม่ใหม่",
      value: "มูลค่า 3,990 บาท",
      desc: "ทุกอย่างที่ต้องรู้สำหรับการดูแลลูกน้อย"
    },
    {
      title: "💬 กลุ่มปรึกษาส่วนตัวกับแพทย์",
      value: "มูลค่า 4,990 บาท",
      desc: "ถามปัญหาได้ตลอด 24/7 กับทีมแพทย์เฉพาะทาง"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
        🔥 โปรโมชั่นพิเศษ! ลด 70% เฉพาะวันนี้เท่านั้น - เหลือเวลาอีก <span className="bg-white text-red-600 px-2 py-1 rounded font-bold mx-1">
          {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                อันดับ 1 แพลตฟอร์มสุขภาพผู้หญิงในไทย
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-pink-600">ลดน้ำหนัก</span><br/>
                <span className="text-rose-600">ฟื้นฟูหุ่น</span><br/>
                ภายใน <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">90 วัน</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                &ldquo;โปรแกรมเฉพาะสำหรับคุณแม่ไทย ที่ช่วย <strong>15,000+ คน</strong> 
                กลับมาสวยและแข็งแรงกว่าเดิม โดยไม่ต้องออกจากบ้าน&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  🔥 เริ่มเปลี่ยนแปลงวันนี้ - ลด 70%
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors"
                >
                  <Play className="w-5 h-5 inline mr-2" />
                  ดูวิดีโอตัวอย่าง
                </motion.button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[1,2,3,4,5].map(i => (
                      <Image key={i} src={`https://randomuser.me/api/portraits/women/${i}.jpg`} width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white" alt="User profile" />
                    ))}
                  </div>
                  <span className="text-gray-600">15,000+ คุณแม่ใช้แล้ว</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">4.9/5 (2,847 รีวิว)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">ผลลัพธ์จริงจากลูกค้า</h3>
                  <p className="text-gray-600">เปลี่ยนแปลงที่มองเห็นได้</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">น้ำหนักลดเฉลี่ย</span>
                    <span className="text-2xl font-bold text-pink-600">15 กก.</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
                    <span className="text-gray-700">เอวเล็กลง</span>
                    <span className="text-2xl font-bold text-rose-600">8 นิ้ว</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">ความมั่นใจเพิ่มขึ้น</span>
                    <span className="text-2xl font-bold text-yellow-600">500%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-700 font-medium">รับประกันผลลัพธ์ 100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              คุณกำลังเจอปัญหาเหล่านี้อยู่ <span className="text-red-500">ใช่ไหม?</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md text-left"
                >
                  <p className="text-lg text-gray-700">{problem}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">😱 หยุดทำร้ายตัวเองได้แล้ว!</h3>
              <p className="text-lg">
                มีแม่ๆ หลายพันคนที่เคยรู้สึกเหมือนคุณ แต่พวกเธอเปลี่ยนชีวิตได้แล้ว... 
                <strong>ทำไมคุณไม่ลอง?</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-500">วิธีแก้ปัญหา</span> ที่คุณรอคอยมาโดยตลอด
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              BoostMe คือคำตอบที่จะเปลี่ยนชีวิตคุณ ด้วยโปรแกรมที่ถูกออกแบบมาเฉพาะสำหรับผู้หญิงไทย
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-b from-pink-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600">{solution.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              คุณจะได้อะไรบ้างใน <span className="text-pink-600">BoostMe?</span>
            </h2>
            <p className="text-xl text-gray-600">
              โปรแกรมครบครันที่จะดูแลคุณตั้งแต่ก่อนตั้งครรภ์ จนหลังคลอด
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md flex items-center"
              >
                <p className="text-lg text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">🎯 รับประกันผลลัพธ์!</h3>
              <p className="text-yellow-700">
                หากไม่เห็นการเปลี่ยนแปลงภายใน 30 วัน เราคืนเงิน 100% ไม่มีเงื่อนไข!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              เสียงจากลูกค้าจริง ที่<span className="text-pink-600">เปลี่ยนชีวิต</span>แล้ว
            </h2>
            <p className="text-xl text-gray-600">
              ฟังเรื่องราวความสำเร็จจากแม่ๆ ที่เคยอยู่ในสภาพเดียวกับคุณ
            </p>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-2xl text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].stars)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl text-gray-700 mb-6 italic">
              &ldquo;{testimonials[currentTestimonial].text}&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-center mb-4">
              <Image 
                src={testimonials[currentTestimonial].image} 
                alt={testimonials[currentTestimonial].name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                <div className="text-pink-600 font-medium">{testimonials[currentTestimonial].result}</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-500">ราคาพิเศษ!</span> เฉพาะวันนี้เท่านั้น
            </h2>
            <p className="text-xl text-gray-600">
              ปกติโปรแกรมแบบนี้ราคา 29,990 บาท แต่วันนี้...
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-2 rounded-bl-lg font-bold">
              ลด 70%
            </div>
            
            <div className="text-center mb-8">
              <div className="text-gray-400 text-2xl line-through mb-2">29,990 บาท</div>
              <div className="text-5xl md:text-7xl font-bold text-pink-600 mb-4">8,990 บาท</div>
              <div className="text-lg text-gray-600">หรือผ่อนเพียง 299 บาท/เดือน (30 เดือน)</div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎁 โบนัสพิเศษ มูลค่ารวม 13,960 บาท</h3>
              {bonuses.map((bonus, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div>
                    <div className="font-bold text-gray-900">{bonus.title}</div>
                    <div className="text-sm text-gray-600">{bonus.desc}</div>
                  </div>
                  <div className="text-green-600 font-bold">{bonus.value}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl">
                <span className="text-gray-700">มูลค่ารวมทั้งหมด:</span>
                <span className="font-bold text-gray-900">43,950 บาท</span>
              </div>
              <div className="flex justify-between items-center text-2xl mt-2">
                <span className="text-red-500 font-bold">คุณจ่ายเพียง:</span>
                <span className="font-bold text-pink-600">8,990 บาท</span>
              </div>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 mb-4"
              >
                🔥 สั่งซื้อตอนนี้ - ลด 70% (เหลือ {timeLeft.hours}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')})
              </motion.button>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  ปลอดภัย 100%
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  รับประกันผลลัพธ์
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  15,000+ คนไว้วางใจ
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
              <div className="flex items-center text-red-700">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-bold">เตือน!</span>
              </div>
              <p className="text-red-600 mt-1">
                โปรโมชั่นนี้จำกัดเพียง 100 คนแรกเท่านั้น เหลือ 23 ที่นั่ง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-gray-600">
              ข้อสงสัยที่คุณอาจมี เรามีคำตอบให้หมดแล้ว
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "โปรแกรมนี้ปลอดภัยสำหรับคนท้องไหม?",
                a: "ปลอดภัยมากครับ พัฒนาโดยแพทย์เฉพาะทางสูตินรีเวช และมีคุณแม่ตั้งครรภ์มากกว่า 8,000 คนใช้แล้วโดยไม่มีปัญหาใดๆ"
              },
              {
                q: "ใช้เวลาเท่าไหร่ถึงจะเห็นผลลัพธ์?",
                a: "ส่วนใหญ่จะเริ่มเห็นการเปลี่ยนแปลงภายใน 2 สัปดาห์แรก และเห็นผลชัดเจนภายใน 1 เดือน"
              },
              {
                q: "ถ้าไม่พอใจจะคืนเงินได้ไหม?",
                a: "ได้เลยครับ เรารับประกันคืนเงิน 100% ภายใน 30 วัน หากคุณไม่พอใจด้วยเหตุผลใดๆ"
              },
              {
                q: "ต้องออกกำลังกายวันละกี่ชั่วโมง?",
                a: "เพียงวันละ 15-30 นาที 3-4 วันต่อสัปดาห์ก็เพียงพอแล้ว เน้นความสม่ำเสมอมากกว่าความหนัก"
              },
              {
                q: "มีอุปกรณ์ออกกำลังกายให้ไหม?",
                a: "ไม่ต้องซื้ออุปกรณ์แพงๆ ใช้ของใช้ในบ้านธรรมดาก็ได้ผล เช่น ผ้าขนหนู ขวดน้ำ หรือเก้าอี้"
              },
              {
                q: "สามารถใช้ได้กี่คน?",
                a: "1 บัญชีใช้ได้ 3 อุปกรณ์ สามารถแชร์ในครอบครัวได้ และเข้าใช้งานได้ตลอดชีวิต"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">❓ {faq.q}</h3>
                <p className="text-gray-700">✅ {faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              คุณพร้อมเปลี่ยนชีวิตแล้วหรือยัง?
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              อย่าให้โอกาสนี้ผ่านไป... เพราะ 6 เดือนข้างหน้า คุณจะขอบคุณตัวเองที่ตัดสินใจวันนี้
            </p>

            <div className="bg-gray-900 border-2 border-yellow-400 rounded-2xl p-8 mb-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">⏰ โปรโมชั่นสิ้นสุดใน:</h3>
              <div className="text-5xl font-bold text-white bg-red-600 rounded-lg px-6 py-4 inline-block shadow-lg">
                <span className="tabular-nums">
                  {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <p className="mt-4 text-yellow-100 text-lg">หลังจากนี้ราคากลับเป็น <span className="text-yellow-400 font-bold">29,990 บาท</span></p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-600 px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 mb-6"
            >
              🚀 เริ่มต้นชีวิตใหม่วันนี้ - เพียง 8,990 บาท
            </motion.button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                เริ่มได้ทันที
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                รับประกัน 30 วัน
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                ชุมชน 15,000+ คน
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 mr-3" />
            <span className="text-2xl font-bold">BoostMe</span>
          </div>
          <p className="text-gray-400 mb-4">
            แพลตฟอร์มสุขภาพผู้หญิงอันดับ 1 ของไทย
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-white">เงื่อนไขการใช้งาน</a>
            <a href="#" className="hover:text-white">ติดต่อเรา</a>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
            © 2024 BoostMe. All rights reserved. | พัฒนาด้วยความรักสำหรับคุณแม่ไทยทุกคน 💕
          </div>
        </div>
      </footer>
    </div>
  );
} 