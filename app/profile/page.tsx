"use client"
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

type User = {
  email: string;
  privilege: number;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)
  const { setAuth } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded: User = jwtDecode(token)
        console.log(decoded)
        setUser(decoded)
        setAuth(true)
      } catch (error) {
        setAuth(false)
        console.error('Failed to decode token:', error)
      }
    }
  }, [])

  return (
    <div>
      {user ? (
        <p>Welcome, {user?.email}</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  )
}

export default Profile
