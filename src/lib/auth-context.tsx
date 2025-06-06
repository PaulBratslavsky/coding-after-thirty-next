"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: number
  username: string
  email: string
  // Add other user properties from your Strapi user model
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  refetch: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetch("/api/auth/me")
      const data = await result.json()

      if (data.ok) {
        setUser(data.data)
      } else {
        setUser(null)
        setError(data.error)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setError("Failed to fetch user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, loading, error, refetch: fetchUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
