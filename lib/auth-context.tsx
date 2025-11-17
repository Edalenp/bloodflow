"use client"

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { api } from './api'
import type { User, AuthTokens } from '@/types'

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, role?: 'donor' | 'medical_staff' | 'admin') => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedTokens = localStorage.getItem('tokens')
    
    if (storedUser && storedTokens) {
      try {
        const userData = JSON.parse(storedUser)
        const tokensData = JSON.parse(storedTokens)
        
        // Validate that tokens exist and are not empty
        if (userData.id && tokensData.access) {
          setUser(userData)
        } else {
          localStorage.removeItem('user')
          localStorage.removeItem('tokens')
        }
      } catch (e) {
        console.error("[v0] Invalid JSON in localStorage:", e)
        localStorage.removeItem('user')
        localStorage.removeItem('tokens')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string, role?: 'donor' | 'medical_staff' | 'admin') => {
    setError(null)
    setLoading(true)
    
    try {
      console.log("[v0] Login attempt:", { email, role })
      
      const response: any = await api.auth.login(email, password)
      console.log("[v0] Login response:", response)
      
      if (!response || !response.data || !response.tokens) {
        console.error("[v0] Invalid response structure:", { response })
        throw new Error('Respuesta inválida del servidor')
      }
      
      if (!response.tokens.access) {
        console.error("[v0] No access token in response:", response.tokens)
        throw new Error('No se recibió token de acceso')
      }
      
      const userData: User = response.data
      const tokens: AuthTokens = response.tokens
      
      if (role && userData.role !== role) {
        throw new Error(`Usuario no es ${role}`)
      }
      
      // Store user data and tokens in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tokens', JSON.stringify(tokens))
      setUser(userData)
      
      console.log("[v0] Login successful:", { userId: userData.id, role: userData.role })
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar sesión'
      setError(errorMessage)
      console.error('[v0] Login error:', errorMessage, err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (formData: any) => {
    setError(null)
    setLoading(true)
    
    try {
      console.log("[v0] Registration attempt:", { email: formData.email })
      
      const response: any = await api.auth.register(formData)
      
      if (!response.data || !response.tokens || !response.tokens.access) {
        throw new Error('Invalid response from server')
      }
      
      const userData: User = response.data
      const tokens: AuthTokens = response.tokens
      
      // Store user data and tokens in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tokens', JSON.stringify(tokens))
      setUser(userData)
      
      console.log("[v0] Registration successful:", { userId: userData.id })
    } catch (err: any) {
      const errorMessage = err.message || 'Error al registrar'
      setError(errorMessage)
      console.error('[v0] Registration error:', errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('tokens')
    setUser(null)
    setError(null)
    router.push('/')
  }, [router])

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
