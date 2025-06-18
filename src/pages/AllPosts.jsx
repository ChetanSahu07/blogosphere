import React ,{useEffect, useState} from 'react'
import { Container , PostCard } from '../components'
import databaseService from '../appwrite/dataservice'
import { data } from 'react-router-dom'
import { useSelector } from 'react-redux'



import { getAllBlogs } from '../backendConnect/blog.js'


function AllPosts() {

    const [posts , setPosts ] = useState([])
    const authStatus = useSelector((state)=>state.authReducer.status)
    useEffect( ()=>{
        getAllBlogs().then((posts)=>{
            if(posts){
                setPosts(posts.data)
            }
        })
    },[])

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
    <div className='w-full py-8'>
        <Container>
            {
                <div className='flex flex-wrap'>
                    {
                        posts.map((eachPost)=>(
                            <div key={eachPost._id} className='p-2 w-1/4'>
                                <PostCard _id= {eachPost._id} title = {eachPost.title} image={eachPost.image} />
                            </div>
                        ))
                    }
                </div>
            }
        </Container>
    </div>
  )
}

export default AllPosts