'use client';
import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const [message, setMessage] = useState<React.ReactNode>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('http://localhost:5000/api/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      const res = await response.json()
      setMessage(<p className="text-green-500">Logged in successfully</p>)
      localStorage.setItem('token', res.token)
      // TODO: navigate to Profile
    } else {
      const res = await response.json()
      setMessage(<p className="text-red-500">{res.message}</p>)
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
      {message}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  </div>
  )
}