import axios from "axios"

const base_url = import.meta.env.VITE_BACKEND_BASE_URL ; 

const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${base_url}/api/v1/blogs/`, { withCredentials: true });

        return response.data;
    } catch (error) {
        console.log(`Error in fetching the all blogs ${error?.message}`);
        return null;
    }
}

const getBlogImage = async ({_id}) => {
    try {
        const response = await axios.post(`${base_url}/api/v1/blogs/get-blog-image`,
             {_id} ,
            { withCredentials: true }
        )
        return response.data;

    } catch (error) {
        console.log(`Error in fetching the blog image ${error?.message}`);
        return null;
    }
}


const getBlog = async ({_id})=>{
    
    try {
        const response = await axios.get(`${base_url}/api/v1/blogs/b/${_id}` , {withCredentials:true}) ; 
        return response.data.data ; 
    } catch (error) {
        console.log(`Error in fetching the single blog ${error?.message}`);
        return null;
    }
}


const updateBlog = async({title,content,_id,image})=>{
    try {
        const formData = new FormData() ;
        formData.append("title" , title ) 
        formData.append("content" , content)
        formData.append("_id" , _id )
        formData.append("image", image)
        const response = await axios.patch(
            `${base_url}/api/v1/blogs/update-blog`,
            formData,
            {withCredentials:true}
        )
        //console.log(response.data);
        
        return response.data ; 
    } catch (error) {
        console.log(`Error in updating the blog ${error?.message}`);
        return null;
    }
}

const createBlog = async({title , image , content , isActive })=>{

    try {
        
        const formData  = new FormData() ;
        formData.append("title" , title ) 
        formData.append("content" , content)
        formData.append("isActive" , isActive )
        formData.append("image", image)

        const response = await axios.post(
            `${base_url}/api/v1/blogs/upload-blog`,
            formData,
            {withCredentials:true}
        )
        //console.log(response.data);
        
        return response.data  ; 

    } catch (error) {
        console.log(`Error in creating the blog ${error?.message}`);
        return null;
    }
}

const deleteBlog = async({_id})=>{

    try {
        const response = await axios.delete(
            `${base_url}/api/v1/blogs/delete-blog/${_id}`,
            {withCredentials:true}
        )
        console.log(response.data);
        
        return response.data ; 
    } catch (error) {
        console.log(`Error in deleting the blog ${error?.message}`);
        return null;
    }
}



export {
    getAllBlogs,
    getBlogImage,
    getBlog,
    updateBlog,
    createBlog,
    deleteBlog
}