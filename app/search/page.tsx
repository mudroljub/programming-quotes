'use client'
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import { Quote } from '../types'
import API from '../API'
import SearchInput from './SearchInput'

export default function Search(): JSX.Element | null {
  const [quotes, setQuotes] = useState<Quote[] | undefined>()

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

  const handleChange = (selected: any) => {
    console.log(selected?.value)
  }

  if (!quotes) return null

  const unique = quotes.reduce((acc, q) => acc.add(q.author), new Set())
  const options = [...unique]
    .sort()
    .map(value => ({ value, label: value }))

  return (
    <>
      <h2 className="text-xl mb-4">Search quotes</h2>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Select
            options={options}
            isSearchable
            isClearable
            onChange={handleChange}
            placeholder="Select author"
          />
        </div>
        <div className="col-span-8">
          <SearchInput />
        </div>
      </div>
    </>
  )
}
