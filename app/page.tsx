import { Quote } from './types';
import BlockQuote from './components/BlockQuote'
import API from './API'

export default async function Home(): Promise<JSX.Element> {
  const res = await API.GET('quotes/random', { cache: 'no-store' });
  const quote: Quote = await res.json();

  return (
    <>
      <BlockQuote quote={quote} />

      <form method="GET" className="mt-4">
        <button type="submit" className="h-10 px-6 font-semibold bg-black text-white">
          New quote
        </button>
      </form>
    </>
  );
}
