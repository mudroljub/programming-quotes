'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '../API'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { setToken } = useAuth()
  const [error, setError] = useState()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const response = await API.POST('auth/token', { email, password })

    if (response.ok) {
      const res = await response.json()
      setToken(res.token)
      router.push('/profile')
    } else {
      const res = await response.json()
      setError(res.message)
      setToken(null)
    }
  }
 
  return (
    <div>
    <h2 className="text-xl mb-4">Login or Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border px-3 py-2 focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border px-3 py-2 focus:outline-none"
          required
        />
      </div>
      <p className="text-red-500">{error}</p>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  </div>
  )
}