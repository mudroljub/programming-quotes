"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types'

interface AuthContextType {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  logout: () => void
  loading: boolean
}

interface Props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setTokenInState] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setTokenInState(token)
      setUser(jwtDecode(token))  
    }
    setLoading(false)
  }, [])

  const setToken = (tok: string) => {
    setTokenInState(tok)
    localStorage.setItem('token', tok)
    setUser(jwtDecode(tok))
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
