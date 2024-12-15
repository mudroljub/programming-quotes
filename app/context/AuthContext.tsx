"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import API from '../API'

interface AuthContextType {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  setUser: (user: User) => void
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

  const setToken = (tok: string) => {
    setTokenInState(tok)
    localStorage.setItem('token', tok)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, setUser, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
