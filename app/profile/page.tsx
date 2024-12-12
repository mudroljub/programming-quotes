"use client"
import { useAuth } from '../context/AuthContext'
import Privileges from '../components/Privileges'

const Profile = () => {
  const { user, setToken, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <p>You are not logged in</p>

  return (
    <div>
      <h2 className="text-xl mb-4">My Profile</h2>

      <p className='mb-2'><strong>Email:</strong> {user.email}</p>

      <Privileges privilege={user.privilege} />

      <p className='mt-2'><strong>Logged in until:</strong> {new Date(user.exp * 1000).toLocaleString()}</p>
      
      <button onClick={() => setToken(null)} className='mt-4 h-10 px-6 font-semibold bg-black text-white'>Logout</button>
    </div>
  )
}

export default Profile
