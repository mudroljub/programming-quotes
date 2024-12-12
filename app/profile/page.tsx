"use client"
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'

type User = {
  id: string;
  email: string;
  privilege: number;
  exp: number;
};

const Profile = () => {
  const [token, setToken] = useState<string | null>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
    setLoading(false)
  }, [])

  if (loading) return <p>Loading...</p>
  if (!token) return <p>You are not logged in</p>

  const user: User = jwtDecode(token)

  return (
    <div>
      <p>Welcome, {user?.email}</p>
    </div>
  )
}

export default Profile
