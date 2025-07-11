import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'



import { logoutUser } from '../../backendConnect/user'


function LogoutBtn() {

  const navigate = useNavigate() ;
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        logoutUser()
        .then(()=>{
            dispatch(logout())
            navigate("/")
        })

    }
    // After any function of authservice , we will use .then()

  return (
    <button onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 hover:bg-slate-800 rounded-full'
    >
        Logout
    </button>
  )
}

export default LogoutBtn