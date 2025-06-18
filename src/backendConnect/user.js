import axios from "axios"

const loginUser = async ({email, password})=>{

    try {
        const response = await axios.post(
            "/api/v1/users/login",
            { email, password },
            {withCredentials:true}
        )
        return response.data ;

    } catch (error) {
        console.log(`Error while loggin user ${error.message}`);
        return null ;
    }
}

const registerUser = async ({name , email , password})=>{

    try {
        const response = await axios.post(
            "/api/v1/users/register",
            {name,email,password},
            {withCredentials:true}
        )
        return response.data ;
    } catch (error) {
        console.log(`Error while registering user ${error.message}`);
        return null ;
    }
}

const getCurrentUser = async()=>{
    try {
        const response = await axios.get(
            "/api/v1/users/get-current-user",
            {withCredentials:true}
        )
        return response.data ;

    } catch (error) {
        console.log(`Error while fetching current user ${error.message}`);
        return null ;
    }
}

const logoutUser = async()=>{
    try {
        const response = await axios.post(
            "/api/v1/users/logout",
            {},
            {withCredentials:true}
        )
        return response.data ; 

    } catch (error) {
        console.log(`Error while logging out user ${error.message}`);
        return null ;
    }
}


export {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser
}