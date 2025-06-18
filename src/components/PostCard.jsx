import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import databaseService from '../appwrite/dataservice'
// FeaturedImage is the id of that image and not the image file 
// Here we have written $id because it is the syntax of appwrite for the id of any tuple in table 
// here $id is the id of a post 
function PostCard({$id, title, featuredImage}) {
  //console.log($id)
  console.log(databaseService.getFilePreview(featuredImage))
  return (
    
    <Link
    to={`/post/${_id}`}
    >
        <div className='w-full bg-gray-200 rounded-xl p-4 hover:bg-[#5d81a6] hover:text-[#D1F8EF] duration-200  '>
            <div className='justify-center mb-4  '>
                <img src={databaseService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl object-cover h-50 w-full' 
                />
            </div>
            <h2 className='text-xl font-bold mt-2'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard