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

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

  if (!token) return <p>You are not logged in</p>

  const user: User = jwtDecode(token)

  return (
    <div>
      <p>Welcome, {user?.email}</p>
    </div>
  )
}

export default Profile
