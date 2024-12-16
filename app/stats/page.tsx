'use client'
import React from "react";
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import { useQuotes } from '../context/QuoteContext'

export default function About(): JSX.Element | null {
  const { quotes } = useQuotes()

  const authorCount = quotes.reduce<Map<string, number>>((acc, quote) => {
    acc.set(quote.author, (acc.get(quote.author) || 0) + 1)
    return acc
  }, new Map())        

  const sorted = Array.from(authorCount.entries())
    .sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)

  return (
    <>
      <h2 className="text-xl mb-4">Quotes per author</h2>
      <BarChart quoteCount={sorted} />
      <PieChart quoteCount={sorted} />
    </>
  );
}
