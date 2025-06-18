import React, { useEffect, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authservice from '../../appwrite/auth'
// Here we are a new hook that is useNavigate which does same task as Link in react-router-dom
// Here we will contionally show the logout button

export default function Header() {
    // first of all we will check that we are logged in or not
    
    const authStatus = useSelector((state)=>state.authReducer.status)
    const userD = useSelector((state)=>state.authReducer?.userData)

    const [userData , seruserData ] = useState(userD) 

    useEffect(()=>{
        //console.log(userD)
        seruserData(userD)
    },[userD])

    //console.log(userData.userData.name)
    // creating variable for useNavigate hook
    const navigate = useNavigate()

    // The items in the navbar are stored in a array of objects 
    // and then it is shown in the loop 

    const navItems = [
        {
            name: 'Home',
            url: "/",
            active: true
        },
        {
            name: 'login',
            url: "/login",
            active: !authStatus
        },
        {
            name: 'Singup',
            url: "/signup",
            active: !authStatus
        },
        {
            name: 'All Posts',
            url: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            url: "/add-post",
            active: authStatus
        },
        {
            name: authStatus && userData != null ? `User: ${userData.data.name}` : "userData is null",
            url: "/",
            active: authStatus
        }
    ]

    // remember that after header, all things inside it are wrapped inside a container that we have created 
    return (
        <header className='py-3 shadow bg-[#3674B5] text-[#D1F8EF]'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4 mx-4'>
                        <Link to='/'>
                            <Logo widht='70px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        { navItems.map((eachItem)=>
                        eachItem.active ? (
                            <li key={eachItem.name} >
                                <button
                                onClick={() => navigate(eachItem.url)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-slate-800 rounded-full'
                                >
                                    {eachItem.name}
                                </button>
                            </li>
                        ) : null
                        )}
                        {/* very very intresting syntax is written in below line */}
                        { authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}