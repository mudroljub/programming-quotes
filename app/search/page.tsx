'use client'
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import { Quote } from '../types'
import API from '../API'
import BlockQuote from '../components/BlockQuote'

export default function Search(): JSX.Element | null {
  const [quotes, setQuotes] = useState<Quote[] | undefined>()
  const [selectedAuthor, setSelectedAuthor] = useState<string>()
  const [searchString, setSearchString] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GET('quotes')
        const quotes: Quote[] = await response.json()
        setQuotes(quotes)
      } catch (error) {
        console.error("Error fetching quotes:", error)
      }
    }

    fetchData()
  }, [])

  const onChange = (selected: any) => {
    setSelectedAuthor(selected?.value)
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  if (!quotes) return null

  const unique = quotes.reduce((acc, q) => acc.add(q.author), new Set())
  const options = [...unique]
    .sort()
    .map(value => ({ value, label: value }))

  const filtered = quotes
    .filter(q => !selectedAuthor || q.author === selectedAuthor)

  console.log('filtered');
  
  return (
    <>
      <h2 className="text-xl mb-4">Search quotes</h2>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Select
            options={options}
            isSearchable
            isClearable
            onChange={onChange}
            placeholder="Select author"
          />
        </div>
        <div className="col-span-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search quotes"
              className="pl-4 pr-4 py-2 border rounded-lg w-full"
              onInput={onInput}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              🔍
            </span>
          </div>
        </div>
      </div>

      {
        filtered.map(quote => <BlockQuote quote={quote}/>)
      }
    </>
  )
}
