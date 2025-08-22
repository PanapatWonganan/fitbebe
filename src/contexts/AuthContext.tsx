'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { loginUser, registerUser, getUserProfile, logoutUser, User as ApiUser } from '@/lib/api/auth'

interface User {
  id: string
  email: string
  fullName: string | null
  role: 'student' | 'instructor' | 'admin'
  avatarUrl: string | null
  emailVerified: boolean
  phone?: string | null
  createdAt?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone?: string
  role?: 'student' | 'instructor'
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('boostme_token')
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const response = await fetch('https://boostme-backend-production.up.railway.app/api/v1/auth/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('boostme_token')
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('boostme_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://boostme-backend-production.up.railway.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('boostme_token', data.token)
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'การเข้าสู่ระบบล้มเหลว' }
      }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: 'เกิดข้อผิดพลาดในระบบ' }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok) {
        setUser(responseData.user)
        return { success: true }
      } else {
        return { success: false, error: responseData.error || 'การสมัครสมาชิกล้มเหลว' }
      }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error: 'เกิดข้อผิดพลาดในระบบ' }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('boostme_token')
      if (token) {
        await fetch('https://boostme-backend-production.up.railway.app/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('boostme_token')
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}