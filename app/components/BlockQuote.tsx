'use client'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode'
import { Quote, User } from '../types'
import Stars from './Stars'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

type Props = {
  quote: Quote
}

const editStyle = {
  display: 'inline-block',
  transform: 'rotateZ(90deg)',
}

export default function BlockQuote({ quote }: Props): JSX.Element {
  const { token } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(token ? jwtDecode(token) : null)
  }, [token])

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <blockquote className='bg-gray-900 text-white p-8'>
      {user && user.privilege > 1 && (
        <Link href={`/edit-quote?id=${quote._id}`} style={{ float: 'right' }} className='px-2'>
          <span style={editStyle}>&#9998;</span>
        </Link>
      )}
      <p className="text-xl">
        {quote.text}
      </p>
      <Stars rating={quote.rating ?? 0} />
      <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
    </blockquote>
  )
}
