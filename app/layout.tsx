import { ReactNode } from 'react';
import type { Metadata } from "next";
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import { QuoteProvider } from './context/QuoteContext'
import "./globals.css";

export const metadata: Metadata = {
  title: "Programming Quotes",
  description: "Programming Quotes app",
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <AuthProvider>
          <Header/>
          <QuoteProvider>
            <main className="max-w-4xl flex-grow container mx-auto pt-4">
              {children}
            </main>
          </QuoteProvider>
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>🄯 Programming Quotes by mudroljub</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}