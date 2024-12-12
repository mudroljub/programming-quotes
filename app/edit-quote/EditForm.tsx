'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { Quote, QuoteCreate } from '../types'
import API from '../API'

const EditForm = () => {
  const [error, setError] = useState<string | null>()
  const [quote, setQuote] = useState<Quote | null>()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  // TODO: proveriti privilegiju
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const response = await API.GET(`quotes/${id}`)
        const quote: Quote = await response.json()
        setQuote(quote)
      } catch (error) {
        console.error("Error fetching quotes:", error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const newQuote: QuoteCreate = {
      author: formData.get('author') as string,
      text: formData.get('text') as string,
      source: formData.get('source') as string,
    }

    try {
      const response = await API.PUT(`quotes/${id}`, newQuote)

      if (response.ok) {
        setError(null)
        alert('Quote updated successfully!')
      } else {
        const res = await response.json();
        setError(`${res.message}: ${res.error}`);
      }
    } catch (error) {
      setError('Something went wrong, please try again.')
    }
  }

  if (!quote) return 'Loading...'

  return (
    <div className="w-full lg:w-8/12">
      <h2 className="text-xl mb-4">Edit quote</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-1">Author:</label>
          <input
            type="text"
            name="author"
            defaultValue={quote.author} 
            className="border px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block mb-1">Text:</label>
          <textarea
            name="text"
            defaultValue={quote.text}
            className="border px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="source" className="block mb-1">Source:</label>
          <input
            type="text"
            name="source"
            defaultValue={quote?.source}
            className="border px-3 py-2 w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Quote</button>
      </form>
    </div>
  );
};

export default EditForm;
