'use client'
import React, { useState, useMemo } from "react"
import Select from 'react-select'

import BlockQuote from '../components/BlockQuote'
import { useQuotes } from '../context/QuoteContext'

export default function Search(): JSX.Element | null {

  const { quotes, setQuotes } = useQuotes()
  const [selectedAuthor, setSelectedAuthor] = useState<string>()
  const [searchString, setSearchString] = useState<string>('')

  const onChange = (selected: any) => {
    setSelectedAuthor(selected?.value)
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const onDelete = (id: string) => {
    setQuotes(quotes.filter(q => q._id !== id))
  }

  const highlightMatches = (text: string, searchString: string) => {
    const regex = new RegExp(`(${searchString})`, 'gi')
    return text.replace(regex, '<span style="color: tomato;">$1</span>')
  }

  const includes = (s1: string, s2: string) => s1.toLowerCase().includes(s2.toLowerCase())

  const authors = useMemo(() => 
    [...quotes.reduce((set, q) => set.add(q.author), new Set())]
      .sort()
      .map(value => ({ value, label: value }))
  , [quotes])

  const result = useMemo(() => quotes
    .filter(q => (
      (selectedAuthor === q.author && includes(q.text, searchString)) ||
      (!selectedAuthor && searchString.length > 2 && includes(q.text, searchString))
    ))
    .map(q => ({
      ...q,
      text: highlightMatches(q.text, searchString)
    })), [quotes, searchString, selectedAuthor])
  
  if (!quotes) return null

  return (
    <>
      <h2 className="text-xl mb-4">Search quotes</h2>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Select
            options={authors}
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
