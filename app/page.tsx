import { Quote } from './types';
import BlockQuote from './components/BlockQuote'
import API from './API'

export default async function Home(): Promise<JSX.Element> {
  const res = await API.GET('quotes/random', { cache: 'no-store' });
  const quote: Quote = await res.json();

  return (
    <div>
      <h2 className="text-xl">Quote of the day</h2>
    
      <BlockQuote quote={quote} />

      <form method="GET">
        <button type="submit" className="h-10 px-6 font-semibold bg-black text-white">
          New quote
        </button>
      </form>
    </div>
  );
}
