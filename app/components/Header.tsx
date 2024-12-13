'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuth()

  function isActive(link: string): string {
    return `hover:underline ${pathname === link ? 'font-bold' : ''}`
  }

  const profile = user
    ? <Link href="/profile" style={{ float: 'right' }}>👤 Profile</Link>
    : <Link href="/login" style={{ float: 'right' }}>🔒 Login</Link>

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {profile}
        <h1 className="text-xl mb-1">Programming Quotes 💬</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={isActive('/')}>Home</Link>
            </li>
            <li>
              <Link href="/search" className={isActive('/search')}>Search</Link>
            </li>
            {user && user?.privilege > 1 &&
              <li>
                <Link href="/add-new" className={isActive('/add-new')}>Add new</Link>
              </li>
            }
            <li>
              <Link href="/stats" className={isActive('/stats')}>Stats</Link>
            </li>
            <li>
              <Link href="/api" className={isActive('/api')}>API</Link>
            </li>
            <li>
              <Link href="/about" className={isActive('/about')}>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
