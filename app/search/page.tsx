'use client'
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import { Quote } from '../types'
import API from '../API'
import BlockQuote from '../components/BlockQuote'

export default function Search(): JSX.Element | null {

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<string>()
  const [searchString, setSearchString] = useState<string>('')

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

  const onDelete = (id: string) => {
    const filtered = quotes.filter(q => q._id !== id)
    setQuotes(filtered)
  }

  const highlightMatches = (text: string, searchString: string) => {
    const regex = new RegExp(`(${searchString})`, 'gi')
    return text.replace(regex, '<span style="color: tomato;">$1</span>')
  }

  const includes = (s1: string, s2: string) => s1.toLowerCase().includes(s2.toLowerCase())

  const unique = quotes.reduce((acc, q) => acc.add(q.author), new Set())
  const options = [...unique]
    .sort()
    .map(value => ({ value, label: value }))

  const result = quotes
    .filter(q => (
      (searchString.length > 2 && includes(q.text, searchString) && !selectedAuthor || selectedAuthor === q.author) || 
      (!searchString.length && selectedAuthor === q.author)
    ))
    .map(q => ({
      ...q,
      text: highlightMatches(q.text, searchString)
    }))
  
  if (!quotes) return null

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
        result.map(quote => <BlockQuote quote={quote} key={quote._id} onDelete={onDelete} />)
      }
    </>
  )
}
