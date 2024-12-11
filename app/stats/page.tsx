'use client'
import React, { useEffect, useState } from "react";
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import { Quote } from '../../types'

export default function About(): JSX.Element | null {
  const [data, setData] = useState<[string, number][]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://programming-quotes-api.azurewebsites.net/api/quotes');
        const quotes: Quote[] = await response.json();

        const authorCount = quotes.reduce<Map<string, number>>((acc, quote) => {
          acc.set(quote.author, (acc.get(quote.author) || 0) + 1)
          return acc
        }, new Map())        

        const sorted = Array.from(authorCount.entries())
          .sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)

        setData(sorted);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <>
      <h1>Quotes per author</h1>
      <BarChart quoteCount={data} />
      <PieChart quoteCount={data} />
    </>
  );
}
