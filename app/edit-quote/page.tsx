'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { QuoteCreate } from '../types'
import API from '../API'

const EditQuote = () => {
  const [error, setError] = useState<string | null>();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  console.log(id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const newQuote: QuoteCreate = {
      author: formData.get('author') as string,
      text: formData.get('text') as string,
      source: formData.get('source') as string,
    };

    try {
      const response = await API.PUT('quotes', newQuote);

      if (response.ok) {
        form.reset()
        setError(null)
        alert('Quote added successfully!');
      } else {
        const res = await response.json();
        setError(`${res.message}: ${res.error}`);
      }
    } catch (error) {
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="w-full lg:w-8/12">
      <h2 className="text-xl mb-4">Edit quote</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-1">Author:</label>
          <input
            type="text"
            name="author"
            required
            className="border px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block mb-1">Text:</label>
          <textarea
            name="text"
            required
            className="border px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="source" className="block mb-1">Source:</label>
          <input
            type="text"
            name="source"
            className="border px-3 py-2 w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Quote</button>
      </form>
    </div>
  );
};

export default EditQuote;
