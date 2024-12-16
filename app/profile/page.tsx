"use client"
import { useAuth } from '../context/AuthContext'
import Privileges from '../components/Privileges'
import { useQuotes } from '../context/QuoteContext'
import BlockQuote from '../components/BlockQuote'

const Profile = () => {
  const { user, logout, loading } = useAuth()
  const { quotes, setQuotes } = useQuotes()

  const onDelete = (id: string) => setQuotes(quotes.filter(q => q._id !== id))

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

      <button onClick={logout} className='rounded bg-transparent hover:bg-black text-black hover:text-white py-2 px-4 border border-black hover:border-transparent'>Logout</button>

      <h2 className="text-xl mb-4 mt-4">Favorites</h2>
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        {favorites.map(quote => 
          <BlockQuote quote={quote} key={quote._id} onDelete={onDelete} className='fav-width' />
        )}
      </div>
    </div>
  )
}

export default Profile
