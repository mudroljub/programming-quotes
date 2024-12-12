"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types'

interface AuthContextType {
  token: string | null
  user: User | null
  setToken: (token: string | null) => void
}

interface Props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setTokenState(token)
      setUser(jwtDecode(token))  
    }
  }, [])

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken !== null) {
      localStorage.setItem('token', newToken)
      setUser(jwtDecode(newToken))
    }
    else {
      localStorage.clear()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  )
}
