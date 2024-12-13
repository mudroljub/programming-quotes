'use client'
import Link from 'next/link'
import { Quote } from '../types'
import Stars from './Stars'
import { useAuth } from '../context/AuthContext'

type Props = {
  quote: Quote
}

const editStyle = {
  display: 'inline-block',
  transform: 'rotateZ(90deg)',
}

export default function BlockQuote({ quote }: Props): JSX.Element {
  const { user } = useAuth()

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <blockquote className='bg-gray-900 text-white p-8 mt-4 mb-4'>
      {user && user.privilege > 1 && (
        <Link href={`/edit-quote?id=${quote._id}`} style={{ float: 'right' }} className='px-2'>
          <span style={editStyle}>&#9998;</span>
        </Link>
      )}

      <p className="text-xl" dangerouslySetInnerHTML={{ __html: quote.text }} />

      <Stars rating={quote.rating ?? 0} />
      <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
    </blockquote>
  )
}
