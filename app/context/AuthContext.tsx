"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import API from '../API'

interface AuthContextType {
  user: User | null
  login: (jwt: string, usr: User) => void
  logout: () => void
  loading: boolean
}

interface Props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      }
      API.GET('users/profile', options)
        .then(res => res.json())
        .then(res => setUser(res))
        .finally(() => setLoading(false))
    } else 
      setLoading(false)
  }, [])

  const login = (jwt: string, usr: User) => {
    localStorage.setItem('token', jwt)
    setUser(usr)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
