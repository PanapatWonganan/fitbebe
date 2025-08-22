# Fitness LMS Project - Claude Memory

## Project Overview
- **Project Name**: BoostMe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์
- **Tech Stack**: Laravel 11 + Next.js 15.4.4 + MySQL
- **Purpose**: LMS สำหรับสุขภาพผู้หญิง (ตั้งครรภ์, หลังคลอด, สมดุลฮอร์โมน)

## Current System Status

### Backend (Laravel Admin) - Port 8001
- **Location**: `/Users/panapat/khun_bebe/fitness-lms-admin/`
- **Status**: ✅ Working - Admin dashboard functional
- **Database**: MySQL with custom field names
- **Key Issues Fixed**:
  - Password field mapping (`password_hash` → `password`)
  - Session management (file-based, lifetime 1440 min)
  - Missing `remember_token` column added
  - Custom Filament login page implemented

### Frontend (Next.js) - Port 3001  
- **Location**: `/Users/panapat/khun_bebe/fitness-lms/`
- **Status**: ✅ Working - Theme system removed, Notification system implemented
- **Key Features**:
  - ✅ Notification system with real-time updates
  - ✅ Personalized user authentication
  - ✅ Responsive design with animations
  - ❌ Dark/Light theme system (removed per user request)

## Recent Major Changes

### 1. Theme to Notification System Conversion (COMPLETED)
- **Date**: Current session
- **Changes Made**:
  - Removed `ThemeContext.tsx` and all dark/light theme functionality
  - Created comprehensive `NotificationContext.tsx` with:
    - Read/unread state management
    - Notification timestamps
    - Helper functions (success, error, warning, info)
    - Auto-removal after duration
  - Updated `Header.tsx` with:
    - Notification dropdown panel
    - Red badge with unread count
    - "Mark all as read" functionality
    - Time formatting (เมื่อสักครู่, 5 นาทีที่แล้ว, etc.)
  - Created `NotificationContainer.tsx` for toast notifications
  - Updated `layout.tsx` to use NotificationProvider instead of ThemeProvider

### 2. Key Files Modified:
- `src/contexts/NotificationContext.tsx` - Complete notification management system
- `src/components/Header.tsx` - Notification dropdown with personalized features  
- `src/components/NotificationContainer.tsx` - Toast notification display
- `src/app/layout.tsx` - Provider integration
- Installed `@heroicons/react` → Changed to `lucide-react` for consistency

## PENDING MAJOR FEATURE: Personalized Notification System

### 📋 **Detailed Implementation Plan Saved**
**Document**: `/Users/panapat/khun_bebe/fitness-lms/docs/notification-system-design.md`

### 🎯 **Key Implementation Areas**:

#### Phase 1: Database & Backend Infrastructure
- [ ] **Database Schema Design**
  - `notification_templates` table
  - `user_notifications` table  
  - `user_notification_preferences` table
- [ ] **Laravel Services**
  - `NotificationPersonalizationService`
  - `ContextAwareNotificationService` 
  - `TriggerPersonalizedNotifications` Job
- [ ] **API Endpoints**
  - GET `/api/notifications` - Fetch user notifications
  - POST `/api/notifications/mark-read/{id}` 
  - PUT `/api/notifications/preferences`

#### Phase 2: Personalization Engine
- [ ] **User Profile Analysis**
  - Life stage detection (pre-pregnancy, pregnancy, postpartum, hormonal balance)
  - Fitness level assessment
  - Goal tracking system
- [ ] **Smart Triggers**
  - Workout streak notifications
  - Progress milestone celebrations  
  - Time-based reminders
  - Social engagement prompts

#### Phase 3: AI & Machine Learning
- [ ] **Behavioral Pattern Learning**
  - Optimal notification timing
  - Content personalization based on engagement
  - A/B testing framework for messages
- [ ] **Context-Aware Delivery**
  - Menstrual cycle consideration
  - Activity level adaptation
  - Seasonal/weather-based suggestions

#### Phase 4: Real-time Integration
- [ ] **WebSocket Implementation**
  - Laravel Echo setup
  - Real-time notification broadcasting
  - Frontend socket connection
- [ ] **Advanced UI Features**
  - Interactive notification actions
  - Smart notification batching
  - Notification history with search

### 🎨 **Personalization Examples Designed**:
- **High Achiever**: "🔥 {name}! คุณอยู่ใน Top 10% แล้ว ไปต่อกันเลย!"
- **Gentle Beginner**: "💝 {name} ค่ะ เริ่มต้นใหม่วันนี้กันนะคะ ทีละขั้นตอน"  
- **Busy Mom**: "👶 คุณแม่ {name} วันนี้ออกกำลังกายแค่ 15 นาทีก็เพียงพอแล้วค่ะ"
- **Streak Motivation**: "🔥 คุณมี streak 7 วันแล้ว! อย่าให้ขาดวันนี้นะ"

### 📊 **Success Metrics Defined**:
- Open Rate > 40%
- Action Rate > 15%
- Retention Lift > 25%
- User Satisfaction > 4.2/5

## Development Environment
- **Backend**: `php artisan serve` (Port 8001)
- **Frontend**: `npm run dev` (Port 3001)  
- **Database**: MySQL connection confirmed working
- **Dependencies**: All required packages installed

## Important Notes for Future Development
1. **User-centric Design**: All notifications must add value, not just alert
2. **Privacy First**: Implement proper consent management for personalized data
3. **Scalability Ready**: Design for growth with Redis caching and queue systems
4. **Thai Language Support**: Maintain Thai language in all user-facing content
5. **Mobile Optimization**: Ensure all notification features work seamlessly on mobile

## Next Steps When Continuing
1. Review the detailed plan in `docs/notification-system-design.md`
2. Start with Phase 1: Database schema and basic Laravel services
3. Test each component thoroughly before moving to next phase
4. Implement A/B testing from the beginning to optimize engagement

---
*Last Updated: Current Session - Theme removal completed, Personalized notification system designed and documented*