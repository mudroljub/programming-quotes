'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Quote } from '../types'
import Stars from './Stars'
import { useAuth } from '../context/AuthContext'
import API from '../API'

const editStyle = {
  display: 'inline-block',
  transform: 'rotateZ(90deg)',
}

type Props = {
  quote: Quote
  onDelete?: Function
}

export default function BlockQuote({ quote, onDelete }: Props): JSX.Element {
  const { user } = useAuth()
  const [shouldDelete, setShouldDelete] = useState(false)

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  const deleteQuote = async () => {
    try {
      await API.DELETE(`quotes/${quote._id}`)
      alert('Quote deleted successfully!')
      if (onDelete) onDelete(quote._id)
    } catch (error) {
      alert('Something went wrong, please try again.')
    }
  }

  const tryDelete = () => {
    if (shouldDelete)
      deleteQuote()
    setShouldDelete(true)
  }

  const red = shouldDelete ? 'text-red-500' : ''

  return (
    <blockquote className='bg-gray-900 text-white p-8 mt-4 mb-4'>
      <span style={{ float: 'right' }}>
        {user && user.privilege > 1 && (
          <Link href={`/edit-quote?id=${quote._id}`} className='px-1 text-lg'>
            <span style={editStyle}>&#9998;</span>
          </Link>
        )}
        {user && user.privilege > 2 && (
          <span onClick={tryDelete} className={`px-1 text-lg cursor-pointer ${red}`}>&#10005;</span>
        )}
      </span>

      <p className="text-xl" dangerouslySetInnerHTML={{ __html: quote.text }} />

      <Stars rating={quote.rating} id={quote._id} />
      <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
    </blockquote>
  )
}
