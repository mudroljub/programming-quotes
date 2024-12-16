'use client'
import React, { useMemo } from "react";
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import { useQuotes } from '../context/QuoteContext'

export default function About(): JSX.Element | null {
  const { quotes } = useQuotes()

  const data = useMemo(() => {
    const authorCount = quotes
      .reduce<Map<string, number>>((dict, quote) => 
         dict.set(quote.author, (dict.get(quote.author) || 0) + 1)
      , new Map())
    return Array.from(authorCount.entries())
      .sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)
  }, [quotes])

  return (
    <>
      <h2 className="text-xl mb-4">Quotes per author</h2>
      <BarChart quoteCount={data} />
      <PieChart quoteCount={data} />
    </>
  )
}
