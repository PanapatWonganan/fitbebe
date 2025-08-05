import Link from "next/link";
import { Heart, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BoostMe</span>
            </div>
                          <p className="text-gray-400 text-sm">
                แพลตฟอร์มสุขภาพผู้หญิงออนไลน์ ดูแลคุณตั้งแต่ก่อนตั้งครรภ์ หลังคลอด และสมดุลฮอร์โมน เพื่อสาวๆ ทุกคน
              </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  โปรแกรมสุขภาพทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  ผู้เชี่ยวชาญ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  ราคา
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  บล็อกสุขภาพ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">ช่วยเหลือ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  ศูนย์ช่วยเหลือ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  เงื่อนไขการใช้งาน
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@boostme.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 ถนนฟิตเนส แขวงสุขภาพ เขตสุขใจ กรุงเทพฯ 10110</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BoostMe. สงวนลิขสิทธิ์ทุกประการ - เพื่อสาวๆ ทุกคน
          </p>
        </div>
      </div>
    </footer>
  );
} 