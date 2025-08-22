"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Heart, User, ShoppingCart, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificationHelpers, useNotification } from "@/contexts/NotificationContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logout, loading, isAuthenticated } = useAuth();
  const { success, info, warning, error } = useNotificationHelpers();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotification();

  const handleLogout = async () => {
    try {
      await logout();
      success("ออกจากระบบแล้ว", "ขอบคุณที่ใช้บริการ BoostMe");
      setIsMenuOpen(false);
    } catch (err) {
      error("เกิดข้อผิดพลาด", "ไม่สามารถออกจากระบบได้ โปรดลองใหม่อีกครั้ง");
    }
  };

  const handleNotificationTest = () => {
    const testNotifications = [
      () => success("สำเร็จ!", "การดำเนินการเสร็จสิ้น"),
      () => info("ข้อมูลใหม่", "คุณมีคอร์สใหม่ที่น่าสนใจ"),
      () => warning("คำเตือน", "อย่าลืมทำแบบทดสอบประจำสัปดาห์"),
      () => error("ข้อผิดพลาด", "การเชื่อมต่อขาดหาย")
    ];
    
    const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)];
    randomNotification();
  };

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    return `${days} วันที่แล้ว`;
  };

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/garden", label: "🌱 สวนสุขภาพ" },
    { href: "/courses", label: "โปรแกรมสุขภาพ" },
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/contact", label: "ติดต่อ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              BoostMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300"
                aria-label="แจ้งเตือน"
              >
                <Bell className="h-5 w-5 transition-transform duration-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">การแจ้งเตือน</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleNotificationTest}
                        className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                      >
                        ทดสอบ
                      </button>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                        >
                          อ่านทั้งหมด
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>ไม่มีการแจ้งเตือน</p>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-red-500' : 'bg-gray-300'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium text-gray-900 ${
                                  !notification.read ? 'font-semibold' : ''
                                }`}>
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              {notification.message && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                              )}
                              {notification.timestamp && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatTime(notification.timestamp)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm">ตะกร้า</span>
            </button>
            
            {/* Authentication buttons */}
            {loading ? (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated && user ? (
              <div className="hidden sm:flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName || user.email}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-pink-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{user.fullName || user.email}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  title="ออกจากระบบ"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">เข้าสู่ระบบ</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Click outside to close notification dropdown */}
        {isNotificationOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsNotificationOpen(false)}
          />
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 font-medium px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 px-4 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link 
                      href="/dashboard"
                      className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors w-full text-left py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-pink-600" />
                      </div>
                      <span>Dashboard</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full text-left py-2"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth"
                    className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors w-full text-left py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                )}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors w-full text-left py-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>ตะกร้า</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
} 