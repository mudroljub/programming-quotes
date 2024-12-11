import Link from 'next/link'

export default function API(): JSX.Element {
  return (
    <div>
      <p>
      This client application uses the Programming Quotes API.</p> 
      
      <p className="mt-4">Github repo: <Link href="https://github.com/mudroljub/programming-quotes-api">github.com/mudroljub/programming-quotes-api</Link>
      </p>
      <p className="mt-4">Available at: <Link href="https://programming-quotes-api.azurewebsites.net/">programming-quotes-api.azurewebsites.net/</Link></p>
    </div>
  );
}
