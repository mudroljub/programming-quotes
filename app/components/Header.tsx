'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()

  function isActive(link: string): string {
    return `hover:underline ${pathname === link ? 'font-bold' : ''}`
  }

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/login" style={{ float: 'right' }}>Login</Link>
        <h1 className="text-xl">Programming Quotes</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={isActive('/')}>Home</Link>
            </li>
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
