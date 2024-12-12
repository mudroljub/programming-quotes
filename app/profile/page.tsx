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
      <h2 className="text-xl mb-4">My Profile</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Privilege level:</strong> {user.privilege}</p>
      <p><strong>Logged in until:</strong> {new Date(user.exp * 1000).toLocaleString()}</p>
      
      <button onClick={() => localStorage.clear()} className='mt-4 h-10 px-6 font-semibold bg-black text-white'>Logout</button>
    </div>
  )
}

export default Profile
