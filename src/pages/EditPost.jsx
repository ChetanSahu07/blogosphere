import React ,{useEffect, useState} from 'react'
import { PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/dataservice'



import { getBlog } from '../backendConnect/blog.js'

function EditPost() {

    const [post , setPost ] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(()=>{

        if(slug){
            getBlog({_id:slug}).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate("/")
        }
    },[navigate,slug])


  return post ? (
    <div className='py-8'>
        <PostForm post={post} />
    </div>
  ) : null
}

export default EditPost