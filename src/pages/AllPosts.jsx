import React ,{useEffect, useState} from 'react'
import { Container , PostCard } from '../components'
import databaseService from '../appwrite/dataservice'
import { data } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AllPosts() {

    const [posts , setPosts ] = useState([])
    const authStatus = useSelector((state)=>state.authReducer.status)
    useEffect( ()=>{
        databaseService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
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
                            <div key={eachPost.$id} className='p-2 w-1/4'>
                                <PostCard $id = {eachPost.$id} title = {eachPost.title} featuredImage={eachPost.featuredImage} />
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