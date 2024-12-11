import Link from 'next/link'

export default function About(): JSX.Element {
  return (
    <div>
      <h2 className="text-xl">About</h2>

      <p className="mt-4">
      Programming Quotes is a place where I’ve been collecting quotes and thoughts from the world of programming for years. These quotes are my way of reminding myself why I love coding.</p> 
      
      <p className="mt-4">From deep wisdom to fun ones that remind us not to take ourselves too seriously – there’s something here for every programmer. Whether you’re a veteran or just starting out, I hope you enjoy the quotes and maybe find one that speaks to you.
      </p>
      <p className="mt-4"><Link href="https://github.com/mudroljub">mudroljub</Link></p>
    </div>
  );
}
