# 🚀 Supabase Setup Guide สำหรับ FitLearn LMS

## 📋 ขั้นตอนการติดตั้ง Supabase

### 1. สร้าง Supabase Project
1. ไปที่ [supabase.com](https://supabase.com)
2. สร้างบัญชีใหม่ หรือ Login
3. คลิก **"New Project"**
4. ตั้งชื่อโปรเจค: `fitlearn-lms`
5. เลือก Region ที่ใกล้ที่สุด (Southeast Asia)
6. ตั้งรหัสผ่าน database

### 2. ตั้งค่า Environment Variables
1. Copy ไฟล์ `.env.example` เป็น `.env.local`:
```bash
cp .env.example .env.local
```

2. เข้าไปที่ Supabase Dashboard > Settings > API
3. Copy ค่าเหล่านี้ใส่ในไฟล์ `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. สร้าง Database Schema
1. เข้าไปที่ Supabase Dashboard > SQL Editor
2. Copy เนื้อหาจากไฟล์ `supabase-schema.sql`
3. Paste และ Run ใน SQL Editor

### 4. ตั้งค่า Storage (สำหรับไฟล์วิดีโอ/รูปภาพ)
1. ไปที่ Storage > Buckets
2. สร้าง bucket ใหม่:
   - **Name**: `course-media`
   - **Public**: ✅ (checked)
3. สร้าง bucket อีกอัน:
   - **Name**: `avatars`
   - **Public**: ✅ (checked)

### 5. ตั้งค่า Authentication
1. ไปที่ Authentication > Settings
2. เปิดใช้งาน providers ที่ต้องการ:
   - Email/Password ✅
   - Google (optional)
   - Facebook (optional)

## 🔑 Database Schema อธิบาย

### Tables หลัก:
- **`profiles`** - ข้อมูลผู้ใช้ (เชื่อมกับ auth.users)
- **`courses`** - ข้อมูลคอร์ส
- **`lessons`** - บทเรียนใน course
- **`enrollments`** - การลงทะเบียนเรียน
- **`lesson_progress`** - ความก้าวหน้าของผู้เรียน
- **`reviews`** - รีวิวคอร์ส

### User Roles:
- **`student`** - ผู้เรียน (default)
- **`instructor`** - เทรนเนอร์/ผู้สอน
- **`admin`** - ผู้ดูแลระบบ

## 🔒 Row Level Security (RLS)
- ✅ ผู้ใช้เห็นเฉพาะข้อมูลที่เกี่ยวข้องกับตัวเอง
- ✅ เทรนเนอร์จัดการได้เฉพาะคอร์สของตัวเอง
- ✅ คอร์สที่ publish แล้วเท่านั้นที่มองเห็นได้

## 🎯 Sample Data
Schema จะสร้างข้อมูลตัวอย่าง:
- 3 เทรนเนอร์
- 3 คอร์สตัวอย่าง (โยคะ, HIIT, กล้ามเนื้อ)

## 🔧 TypeScript Types
ไฟล์ `src/lib/database.types.ts` มี TypeScript types ครบถ้วนสำหรับ:
- Database schema
- Table rows, inserts, updates
- Custom enums

## 🚀 การใช้งาน
```typescript
import { supabase } from '@/lib/supabase'

// ดึงข้อมูลคอร์สทั้งหมด
const { data: courses } = await supabase
  .from('courses')
  .select('*')
  .eq('is_published', true)

// สร้าง enrollment ใหม่
const { data } = await supabase
  .from('enrollments')
  .insert({
    user_id: user.id,
    course_id: courseId,
    payment_amount: course.price
  })
```

## 🎥 Storage URLs
```typescript
// สำหรับรูปภาพคอร์ส
const { data } = supabase.storage
  .from('course-media')
  .getPublicUrl('course-thumbnails/course-1.jpg')

// สำหรับวิดีโอบทเรียน
const { data } = supabase.storage
  .from('course-media')
  .getPublicUrl('lesson-videos/lesson-1.mp4')
```

## 🔥 Features ที่จะได้:
- ✅ Authentication ครบถ้วน
- ✅ Real-time subscriptions
- ✅ File upload/storage
- ✅ Database backup อัตโนมัติ
- ✅ Edge functions
- ✅ Analytics dashboard

---

พร้อมแล้ว! ตอนนี้ LMS สามารถใช้ Supabase เป็น backend ได้เต็มรูปแบบ 🎉 