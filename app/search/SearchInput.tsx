'use client'
import React from "react";

export default function SearchInput(): JSX.Element | null {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="pl-4 pr-4 py-2 border rounded-lg w-full"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        🔍
      </span>
    </div>
  )
}
