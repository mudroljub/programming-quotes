"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null)

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken !== null) localStorage.setItem('token', newToken)
    else localStorage.clear()
  }

  useEffect(() => {
    setTokenState(localStorage.getItem('token'))
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
