import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected({children,authentication}) {
    const [loader , setLoader ] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.authReducer.status)

    // Remember the below line 
    //console.log(useSelector((state)=>state.authReducer.status)) 

    useEffect( ()=>{
        if( authentication && authStatus !== authentication ){
            navigate("/login")
        }
        else if( !authentication && authStatus !== authentication ){
           navigate("/")
        }
        setLoader(false)
    },[navigate,authStatus,authentication])

  return loader ? <h1>Loading.....</h1> : <>{children}</> 
}

export default Protected