import Link from 'next/link'

export default function API(): JSX.Element {
  return (
    <div>
      <h2 className="text-xl">Programming Quotes API</h2>
      
      <p className="mt-4"><b>Github repo:</b> <Link href="https://github.com/mudroljub/programming-quotes-api">github.com/mudroljub/programming-quotes-api</Link>
      </p>
      <p className="mt-4"><b>API:</b> <Link href="https://programming-quotes-api.azurewebsites.net/">programming-quotes-api.azurewebsites.net</Link></p>
    </div>
  );
}
