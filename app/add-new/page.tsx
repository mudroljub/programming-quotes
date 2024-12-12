'use client';
import { useState } from 'react';
import { QuoteCreate } from '../types'
import API from '../API'

const AddQuoteForm = () => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const newQuote: QuoteCreate = {
      author: formData.get('author') as string,
      text: formData.get('text') as string,
      source: formData.get('source') as string,
    };

    try {
      const response = await API.POST('quotes', newQuote);

      if (response.ok) {
        setMessage('Quote added successfully!');
      } else {
        const res = await response.json();
        setMessage(`Error: ${res.message}`);
      }
    } catch (error) {
      setMessage('Something went wrong, please try again.');
    }
  };

  return (
    <div className="w-full lg:w-8/12">
      <h2 className="text-xl mb-4">Add new quote</h2>

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
          <label htmlFor="source" className="block mb-1">Source (optional):</label>
          <input
            type="text"
            name="source"
            className="border px-3 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Quote</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AddQuoteForm;
