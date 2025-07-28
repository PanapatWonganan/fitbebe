"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/CourseCard";
import { SearchFilter } from "@/components/SearchFilter";

interface FilterOptions {
  category: string;
  level: string;
  priceRange: string;
  duration: string;
}

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    level: "",
    priceRange: "",
    duration: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, filterOptions: FilterOptions) => {
    let filtered = allCourses;

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()) ||
          (course.description && course.description.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Category filter
    if (filterOptions.category) {
      filtered = filtered.filter((course) => course.category === filterOptions.category);
    }

    // Level filter
    if (filterOptions.level) {
      filtered = filtered.filter((course) => course.level === filterOptions.level);
    }

    // Price range filter
    if (filterOptions.priceRange) {
      filtered = filtered.filter((course) => {
        switch (filterOptions.priceRange) {
          case "ฟรี":
            return course.price === 0;
          case "1,000-2,000 บาท":
            return course.price >= 1000 && course.price <= 2000;
          case "2,001-3,000 บาท":
            return course.price >= 2001 && course.price <= 3000;
          case "3,001-5,000 บาท":
            return course.price >= 3001 && course.price <= 5000;
          case "มากกว่า 5,000 บาท":
            return course.price > 5000;
          default:
            return true;
        }
      });
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            โปรแกรมครบครันสำหรับผู้หญิง
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เลือกโปรแกรมที่เหมาะกับช่วงชีวิตของคุณ ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด และสมดุลฮอร์โมน
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>🤰 {allCourses.length} โปรแกรม</span>
            <span>👩‍⚕️ 15+ ผู้เชี่ยวชาญ</span>
            <span>⭐ 4.9 คะแนนเฉลี่ย</span>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            แสดงผล {filteredCourses.length} จาก {allCourses.length} โปรแกรม
            {searchQuery && (
              <span className="text-pink-600 font-medium">
                {" "}
                สำหรับ &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ไม่พบโปรแกรมที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-600 mb-6">
              ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อหาโปรแกรมที่เหมาะสำหรับคุณ
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ category: "", level: "", priceRange: "", duration: "" });
                setFilteredCourses(allCourses);
              }}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && filteredCourses.length >= 9 && (
          <div className="text-center mt-12">
            <button className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg hover:bg-pink-600 hover:text-white transition-colors font-medium">
              โหลดโปรแกรมเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Women's health and pregnancy programs
const allCourses = [
  {
    id: 1,
    title: "Prenatal Yoga: โยคะสำหรับคุณแม่ตั้งครรภ์",
    instructor: "ดร.สุดา เวชกรรมคลอด",
    duration: "9 เดือน",
    students: 1850,
    rating: 4.9,
    price: 3990,
    originalPrice: 5990,
    image: "/course-prenatal-yoga.jpg",
    category: "Prenatal",
    level: "เริ่มต้น",
    description: "โยคะที่ปลอดภัยและเหมาะสมสำหรับแต่ละไตรมาสของการตั้งครรภ์"
  },
  {
    id: 2,
    title: "Postnatal Recovery: ฟื้นฟูร่างกายหลังคลอด",
    instructor: "ครูแอน ฟิตแม่",
    duration: "12 สัปดาห์",
    students: 2100,
    rating: 4.8,
    price: 2990,
    originalPrice: 4490,
    image: "/course-postnatal.jpg",
    category: "Postnatal",
    level: "เริ่มต้น",
    description: "โปรแกรมฟื้นฟูกล้ามเนื้อหน้าท้อง เสริมแกนกาย และดูแลสุขภาพจิต"
  },
  {
    id: 3,
    title: "Hormonal Balance: สมดุลฮอร์โมนธรรมชาติ",
    instructor: "ดร.นิรมล ฮอร์โมนคลินิก",
    duration: "8 สัปดาห์",
    students: 1675,
    rating: 4.9,
    price: 3490,
    originalPrice: 4990,
    image: "/course-hormonal.jpg",
    category: "Hormonal Balance",
    level: "กลาง",
    description: "โปรแกรมสมดุลฮอร์โมนผ่านการออกกำลังกาย โภชนาการ และการจัดการความเครียด"
  },
  {
    id: 4,
    title: "Pre-conception Fitness: เตรียมร่างกายสู่การเป็นแม่",
    instructor: "ดร.พิมพ์ พร ไฟร์ทิลิตี้",
    duration: "6 เดือน",
    students: 890,
    rating: 4.7,
    price: 4990,
    originalPrice: 6990,
    image: "/course-preconception.jpg",
    category: "Pre-conception",
    level: "เริ่มต้น",
    description: "เตรียมความพร้อมของร่างกายและจิตใจเพื่อการตั้งครรภ์ที่สุขภาพดี"
  },
  {
    id: 5,
    title: "Gentle Movement for Pregnancy",
    instructor: "ครูมานี ยิ่งยืน",
    duration: "9 เดือน",
    students: 1320,
    rating: 4.8,
    price: 2990,
    originalPrice: 3990,
    image: "/course-gentle-pregnancy.jpg",
    category: "Prenatal",
    level: "เริ่มต้น",
    description: "การเคลื่อนไหวเบาๆ ที่ปลอดภัยตลอดช่วงตั้งครรภ์เพื่อสุขภาพแม่และลูก"
  },
  {
    id: 6,
    title: "Breastfeeding Support & Core Recovery",
    instructor: "ครูสมฤดี ลักเตชั่น",
    duration: "6 เดือน",
    students: 1540,
    rating: 4.9,
    price: 2490,
    originalPrice: 3490,
    image: "/course-breastfeeding.jpg",
    category: "Postnatal",
    level: "เริ่มต้น",
    description: "สนับสนุนการให้นมและฟื้นฟูกล้ามเนื้อแกนกายหลังคลอด"
  },
  {
    id: 7,
    title: "PCOS Management: จัดการโรค PCOS ด้วยการออกกำลังกาย",
    instructor: "ดร.วราภรณ์ เอนโดไครน์",
    duration: "10 สัปดาห์",
    students: 980,
    rating: 4.8,
    price: 3990,
    originalPrice: 5490,
    image: "/course-pcos.jpg",
    category: "Hormonal Balance",
    level: "กลาง",
    description: "โปรแกรมเฉพาะสำหรับผู้หญิงที่มีโรค PCOS เพื่อสมดุลฮอร์โมนและสุขภาพดี"
  },
  {
    id: 8,
    title: "Menopause Wellness: ดูแลตัวเองในช่วงวัยทอง",
    instructor: "ดร.สุวรรณี เมโนพอส",
    duration: "12 สัปดาห์",
    students: 750,
    rating: 4.7,
    price: 3490,
    originalPrice: 4990,
    image: "/course-menopause.jpg",
    category: "Hormonal Balance",
    level: "เริ่มต้น",
    description: "ดูแลสุขภาพในช่วงวัยหมดประจำเดือนด้วยการออกกำลังกายและโภชนาการ"
  },
  {
    id: 9,
    title: "Fertility Yoga: โยคะเพื่อเพิ่มโอกาสการตั้งครรภ์",
    instructor: "อาจารย์สิริ เฟอร์ทิลิตี้",
    duration: "8 สัปดาห์",
    students: 1200,
    rating: 4.9,
    price: 2990,
    originalPrice: 3990,
    image: "/course-fertility-yoga.jpg",
    category: "Pre-conception",
    level: "เริ่มต้น",
    description: "โยคะและเทคนิคผ่อนคลายเพื่อเพิ่มโอกาสการตั้งครรภ์ตามธรรมชาติ"
  },
  {
    id: 10,
    title: "Women's Mental Health & Movement",
    instructor: "นักจิตวิทยาลัดดา ใจดี",
    duration: "6 สัปดาห์",
    students: 1100,
    rating: 4.8,
    price: 2490,
    originalPrice: 3490,
    image: "/course-mental-health.jpg",
    category: "Mental Wellness",
    level: "เริ่มต้น",
    description: "ดูแลสุขภาพจิตผู้หญิงผ่านการเคลื่อนไหวและเทคนิคจิตบำบัด"
  },
  {
    id: 11,
    title: "Diastasis Recti Recovery: แก้ไขกล้ามเนื้อหน้าท้องแยก",
    instructor: "ครูนภา ฟิสิโอ",
    duration: "16 สัปดาห์",
    students: 850,
    rating: 4.9,
    price: 4490,
    originalPrice: 5990,
    image: "/course-diastasis.jpg",
    category: "Postnatal",
    level: "กลาง",
    description: "แก้ไขปัญหากล้ามเนื้อหน้าท้องแยกหลังคลอดด้วยเทคนิคเฉพาะทาง"
  },
  {
    id: 12,
    title: "Comprehensive Women's Health Program",
    instructor: "ทีม FitLearn Women's Health",
    duration: "ตลอดชีพ",
    students: 3200,
    rating: 5.0,
    price: 1990,
    originalPrice: 2990,
    image: "/course-comprehensive.jpg",
    category: "Comprehensive",
    level: "ทุกระดับ",
    description: "โปรแกรมครบครันสำหรับผู้หญิงทุกช่วงวัย ตั้งแต่วัยรุ่น ตั้งครรภ์ หลังคลอด จนถึงวัยทอง"
  }
]; 