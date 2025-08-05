'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Award, 
  Target, 
  Baby,
  Sparkles,
  Shield,
  BookOpen,
  CheckCircle,
  Smile,
  Star
} from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Care with Love",
      subtitle: "ดูแลด้วยใจ",
      description: "เราเข้าใจว่าการเป็นผู้หญิงมีความพิเศษในทุกช่วงชีวิต เราจึงออกแบบทุกโปรแกรมด้วยความรัก ความเข้าใจ และความใส่ใจอย่างลึกซึ้ง"
    },
    {
      icon: Shield,
      title: "Safety First",
      subtitle: "ความปลอดภัยเป็นอันดับหนึ่ง",
      description: "ทุกโปรแกรมผ่านการรับรองจากแพทย์ผู้เชี่ยวชาญ ปลอดภัยสำหรับผู้หญิงทุกช่วงชีวิต โดยเฉพาะก่อนตั้งครรภ์และหลังคลอด"
    },
    {
      icon: Users,
      title: "Community Support",
      subtitle: "ชุมชนที่เข้าใจกัน",
      description: "สร้างพื้นที่ปลอดภัยให้ผู้หญิงได้แบ่งปันประสบการณ์ ให้กำลังใจซึ่งกันและกัน และเรียนรู้ไปด้วยกันในการเดินทางสู่ความสุขภาพดี"
    },
    {
      icon: BookOpen,
      title: "Evidence-Based",
      subtitle: "ใช้หลักฐานทางวิทยาศาสตร์",
      description: "ทุกโปรแกรมอิงตามงานวิจัยและหลักฐานทางการแพทย์ ร่วมกับผู้เชี่ยวชาญด้านสุขภาพผู้หญิงโดยตรง"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "ก่อตั้ง BoostMe",
      description: "เริ่มต้นด้วยความฝันที่จะดูแลสุขภาพผู้หญิงไทยให้ดีขึ้น"
    },
    {
      year: "2024",
      title: "8,000+ คุณแม่",
      description: "มีคุณแม่และผู้หญิงร่วมเดินทางไปกับเรามากกว่า 8,000 คน"
    },
    {
      year: "2024",
      title: "15+ ผู้เชี่ยวชาญ",
      description: "ผู้เชี่ยวชาญด้านสุขภาพผู้หญิงระดับชาติร่วมทีมกับเรา"
    },
    {
      year: "2024",
      title: "4.9 ดาว",
      description: "ได้รับคะแนนความพึงพอใจเฉลี่ย 4.9 จาก 5 ดาว"
    }
  ];

  const teamMembers = [
    {
      name: "ดร.สุดา เวชกรรมคลอด",
      role: "Chief Medical Officer",
      specialty: "แพทย์เฉพาะทางสูตินรีเวช",
      description: "ประสบการณ์ 15+ ปีในการดูแลคุณแม่และทารก",
      image: "👩‍⚕️"
    },
    {
      name: "ครูแอน ฟิตแม่",
      role: "Head of Wellness Programs",
      specialty: "ผู้เชี่ยวชาญการฟื้นฟูหลังคลอด",
      description: "นักกายภาพบำบัดเฉพาะทางสำหรับผู้หญิง",
      image: "💪"
    },
    {
      name: "ดร.นิรมล ฮอร์โมนคลินิก",
      role: "Hormone Specialist",
      specialty: "ผู้เชี่ยวชาญด้านฮอร์โมนผู้หญิง",
      description: "วิจัยและรักษาความผิดปกติของฮอร์โมน 20+ ปี",
      image: "⚖️"
    },
    {
      name: "คุณมิ้ม Community Manager",
      role: "Community & Support",
      specialty: "ผู้ดูแลชุมชนและให้การสนับสนุน",
      description: "แม่ของลูก 2 คน มีประสบการณ์ตรงในการเลี้ยงลูก",
      image: "💝"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-pink-100 mb-6">
              <Heart className="h-8 w-8" />
              <span className="text-2xl font-semibold">BoostMe</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              เพื่อสาวๆ ทุกคน
              <br />
              <span className="text-yellow-300">ทุกช่วงชีวิต</span>
            </h1>
            
            <p className="text-xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
              เราเป็นแพลตฟอร์มสุขภาพผู้หญิงออนไลน์ที่เข้าใจและดูแลคุณตั้งแต่ก่อนตั้งครรภ์ 
              หลังคลอด และการสมดุลฮอร์โมน ด้วยโปรแกรมที่ปลอดภัยและมีหลักฐานทางวิทยาศาสตร์
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">พันธกิจของเรา</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  สร้างแพลตฟอร์มที่ทุกผู้หญิงสามารถเข้าถึงความรู้และการดูแลสุขภาพที่ถูกต้อง 
                  ปลอดภัย และเหมาะสมกับช่วงชีวิตของตนเอง โดยไม่ต้องกังวลหรือรู้สึกโดดเดี่ยว
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">วิสัยทัศน์</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  เป็นแพลตฟอร์มอันดับ 1 ในใจผู้หญิงไทยสำหรับการดูแลสุขภาพแบบองค์รวม 
                  ที่ช่วยให้ทุกผู้หญิงมีความมั่นใจ แข็งแรง และมีความสุขในทุกช่วงชีวิต
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
            >
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <Baby className="h-10 w-10 text-pink-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900">ทำไมเราถึงเริ่ม BoostMe?</h3>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    &ldquo;เราเห็นว่าผู้หญิงไทยมักขาดข้อมูลที่ถูกต้องเกี่ยวกับการดูแลตัวเองในแต่ละช่วงชีวิต&rdquo;
                  </p>
                  <p>
                    &ldquo;โดยเฉพาะหลังคลอด ที่มักจะได้รับคำแนะนำที่ไม่มีหลักฐานทางวิทยาศาสตร์&rdquo;
                  </p>
                  <p>
                    &ldquo;เราจึงรวมตัวกันเพื่อสร้างพื้นที่ปลอดภัยที่ผู้หญิงทุกคนสามารถเรียนรู้และดูแลตัวเองได้อย่างถูกต้อง&rdquo;
                  </p>
                </div>
                
                <div className="text-pink-600 font-semibold">
                  - ทีมก่อตั้ง BoostMe
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ค่านิยมของเรา
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              หลักการที่ยึดถือในการสร้างสรรค์ทุกโปรแกรมและการบริการ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-3 rounded-full flex-shrink-0">
                      <Icon className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                        <p className="text-pink-600 font-medium">{value.subtitle}</p>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              เส้นทางการเดินทางของเรา
            </h2>
            <p className="text-xl text-gray-600">
              จากความฝันสู่การเป็นจริง
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 text-center"
              >
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ทีมผู้เชี่ยวชาญของเรา
            </h2>
            <p className="text-xl text-gray-600">
              ผู้เชี่ยวชาญที่มีประสบการณ์และใส่ใจในการดูแลผู้หญิง
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center border border-pink-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-700 text-sm font-medium mb-3">{member.specialty}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ผลลัพธ์ที่เราภูมิใจ
            </h2>
            <p className="text-xl text-pink-100">
              ความสำเร็จของสมาชิกคือความสำเร็จของเรา
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "8,000+", label: "คุณแม่สุขภาพดี", icon: Users },
              { number: "4.9", label: "คะแนนความพึงพอใจ", icon: Star },
              { number: "50+", label: "โปรแกรมสุขภาพ", icon: BookOpen },
              { number: "99%", label: "ความปลอดภัย", icon: Shield }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-pink-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Heart className="h-10 w-10 text-pink-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              พร้อมเริ่มต้นเดินทางสู่ความสุขภาพดีแล้วหรือยัง?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              เข้าร่วมกับคุณแม่และผู้หญิงมากกว่า 8,000 คนที่เลือกดูแลตัวเองกับ BoostMe
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
                เริ่มต้นทดลองฟรี
              </button>
              <button className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-colors duration-300">
                ดูโปรแกรมทั้งหมด
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
} 