import { useState } from 'react'
import ReactStars from 'react-stars'

import { Quote } from '../types'
import API from '../API'
import { useAuth } from '../context/AuthContext'

type Props = {
  id: string
  rating: number | undefined
}

export default function Stars({ rating = 0, id }: Props): JSX.Element {
  const [value, setValue] = useState<number>(rating)
  const { user } = useAuth()

  const vote = async (newVote: number) => {
    if (!user) return
    try {
      const res = await API.POST(`quotes/vote/${id}`, { newVote })
      const quote: Quote = await res.json()
      console.log(quote);
      
      setValue(quote.rating as number)
    } catch (error) {
      alert('Something went wrong, please try again.')
    }
  }

  return (
    <div className="text-yellow-500 text-lg">
      <ReactStars size={20} value={value} onChange={vote} />
    </div>
  )
}
