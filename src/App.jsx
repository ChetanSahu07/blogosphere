import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
//import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import axios from 'axios'





import {userLogout, userLogin, userGetCurrentUser} from './backendConnect/auth.js'




import { getCurrentUser } from './backendConnect/user.js'

function App() {

  // We are taking a loading variable so that it will tell that data is fetched 
  // otherwise show loading icon 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  // Now we will use useEffect so that we will ask that wheather we are logged in or not whenever page is loaded 

  useEffect(() => {
    
    // We are fetching the current logged user and after thet inside .then() we will get current user's data 
<<<<<<< HEAD
      getCurrentUser()
=======
      userGetCurrentUser()
>>>>>>> 0a68494 (final commit)
      .then((userData) => {
        // If user is logged in then else 
        
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })

      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-900'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <>
      <div className='flex flex-wrap justify-center items-center h-screen text-lg'>Loading</div>
    </>
  )
}

export default App


