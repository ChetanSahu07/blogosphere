import React, { useState, useEffect } from 'react'
import databaseService from '../appwrite/dataservice'
import { data } from 'react-router-dom'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

// Is user is not logged in then we will get zero posts from database 


import { getAllBlogs } from '../backendConnect/blog'

function Home() {
    
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state)=>state.authReducer.status)
    useEffect(() => {
        getAllBlogs().then((posts) => {
            if (posts) {
                setPosts(posts.data)
            }
        })
    }, [])


    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((eachPost)=>(
                            <div className='w-1/4 p-2' key={eachPost._id} >
                                <PostCard {...eachPost} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home