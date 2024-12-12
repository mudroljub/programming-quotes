"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  auth: boolean | null
  setAuth: (auth: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuth(!!token)
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
