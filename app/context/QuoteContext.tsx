"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Quote } from '../types'
import API from '../API'

interface QuoteContextType {
  quotes: Quote[]
  setQuotes: (qs: Quote[]) => void
  loading: boolean
}

interface Props {
  children: ReactNode
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export const useQuotes = (): QuoteContextType => useContext(QuoteContext) as QuoteContextType

export const QuoteProvider: React.FC<Props> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    API.GET('quotes')
      .then(res => res.json())
      .then((res: Quote[]) => setQuotes(res))
      .catch((err: any) => console.log('Failed to load quotes'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <QuoteContext.Provider value={{ quotes, setQuotes, loading }}>
      {children}
    </QuoteContext.Provider>
  )
}
