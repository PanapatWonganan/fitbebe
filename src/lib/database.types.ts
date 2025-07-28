export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'instructor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          category: string
          level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          duration_weeks: number
          price: number
          original_price: number | null
          thumbnail_url: string | null
          video_url: string | null
          is_published: boolean
          rating: number | null
          total_students: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor_id: string
          category: string
          level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          duration_weeks: number
          price: number
          original_price?: number | null
          thumbnail_url?: string | null
          video_url?: string | null
          is_published?: boolean
          rating?: number | null
          total_students?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor_id?: string
          category?: string
          level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          duration_weeks?: number
          price?: number
          original_price?: number | null
          thumbnail_url?: string | null
          video_url?: string | null
          is_published?: boolean
          rating?: number | null
          total_students?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          video_url: string | null
          duration_minutes: number
          order_index: number
          is_free: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          video_url?: string | null
          duration_minutes: number
          order_index: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number
          order_index?: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrolled_at: string
          completed_at: string | null
          progress_percentage: number
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_amount: number
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_amount: number
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_amount?: number
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed_at: string | null
          watch_time_minutes: number
          is_completed: boolean
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed_at?: string | null
          watch_time_minutes?: number
          is_completed?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed_at?: string | null
          watch_time_minutes?: number
          is_completed?: boolean
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          course_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'student' | 'instructor' | 'admin'
      course_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
    }
  }
} 