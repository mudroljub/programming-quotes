"use client"
import { useAuth } from '../context/AuthContext'
import Privileges from '../components/Privileges'
import { useQuotes } from '../context/QuoteContext'
import BlockQuote from '../components/BlockQuote'

const Profile = () => {
  const { user, logout, loading } = useAuth()
  const { quotes } = useQuotes()

  if (loading) return <p>Loading...</p>
  if (!user) return <p>You are not logged in</p>

  const favorites = quotes.filter(q => user.favorites.includes(q._id))

  return (
    <div>
      <h2 className="text-xl mb-4">My Profile</h2>

      <p className='mb-4'><strong>✉️ Email:</strong> {user.email}</p>
      <p className='mb-2'><strong>🧙🏻‍♂️ Privilege:</strong></p>
      <Privileges privilege={user.privilege} className='mb-4' />
      <p className='mb-4'><strong>⏳ Member since:</strong> {new Date().toLocaleDateString()}</p>

      <button onClick={logout} className='h-10 px-6 font-semibold bg-black text-white'>Logout</button>

      <h2 className="text-xl mb-4">My favorites</h2>
      {
        favorites.map(quote => <BlockQuote quote={quote} key={quote._id} />)
      }
    </div>
  )
}

export default Profile
