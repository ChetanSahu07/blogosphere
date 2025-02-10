import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import databaseService from '../../appwrite/dataservice'
import {Input , RTE , Select, Button} from '../index'


function PostForm({post}) {

    // Control will be passed to RTE , watch is used to have continues tracking on any input 
    const { register , handleSubmit , control , watch , setValue , getValues } = useForm({
        defaultValues:{
            title: post?.title || '' ,
            content : post?.content || '' ,
            slug: post?.slug || '' ,
            status: post?.status || 'active'
        }
    })

    // Above we are taking some default values of post if someone wants to edit existing post then he can take existing values otherwise
    // we will take empty values 

    const navigate = useNavigate()
    const userData =  useSelector((state)=>state.authReducer.userData)
    console.log(useSelector((state)=>state))
    // The data is automatically handled by useForm()
    // data.image gives an array of image in data 

    const submit = async (data)=>{
        if(post){
            const file = await data.image[0] ? databaseService.uploadFile(data.image[0]) : null 

            if(file){
                databaseService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost( post.$id , {
                ...data ,
                featuredImage : file ? file.$id : undefined 
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            
            const file =  data.image[0] ? await databaseService.uploadFile(data.image[0]) : null ;
            
            if(file){
                
                data.featuredImage = file.$id ;
                
                console.log(data)
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            
            
        }
    }

    const slugTransform = useCallback((value)=>{
        if( value && typeof value === "string" ){
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g, "-") ;
        }

        return '' ;

    }, [] )

    // In React Hook Form, subscriptions are used to optimize performance by avoiding unnecessary re-renders. 
    // The watch method subscribes to form field values and updates only when the watched field changes, instead of causing the entire form to re-render on every input change.
    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            // The above 'value' contains all the value of registered input . It is an object.
            if(name==='title'){
                setValue( "slug", slugTransform(value.title), {shouldValidate:true} ) ;
                // This setValue funtion is used to set value of registerd inputs.
            }
        });

        return ()=> subscription.unsubscribe()  ;

    },[watch, slugTransform, setValue ])


  return (
    <form onSubmit={handleSubmit(submit)} className="text-[#D1F8EF] flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options = { ["active", "inactive"] }
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm