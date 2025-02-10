import React, { useState } from 'react'
import { login as login_store } from '../store/authSlice'
import { useDispatch , useSelector } from 'react-redux'
import Input from './Input'
import authservice from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from './button'


import Logo from './logo/logo'
// The main thing that we are using is useForm from react hook form 

function Login() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    // Two things we are going to use from useForm that are register and handleSubmit 
    // Remeber that handleSubmit is a function that takes input as another function which is created by us 
    // handleSubmit should be given to onSubmit in the form 


    // we are creating a state to show the errors 
    const [error, setError] = useState("")

    // lets create a method for logging in 
    // always remember that when login submission happen then empty the state error that we have created 
    const login = async (data) => {
        setError("")
        try {
            // Always remember that The login function always returns a session
            //console.log(data)
            const session = await authservice.login(data)
            if (session) {
                // Now the userData always come from getcurrentUser()
                const userData = await authservice.getCurrentUser()
                
                if (userData) {
                   
                    dispatch(login_store(userData))
                    //navigate("/")
                    window.location.href = "/";
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full' >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`} >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text'></p>}
                <form onSubmit={handleSubmit(login)}
                    className='mt-8'
                >
                    <div className='space-y-5'>
                        <Input
                            type="email"
                            placeholder="enter your email"
                            label="Email: "
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email is not valid"
                                }
                            })}
                        />
                        <Input
                            label="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// The thing that need to be remember is that register should be used in spreaded version in every input {...register}
// and the for every input ...register("input_name", {Here it is your choice wheather you want to pass something or not}) this input_name should be unique 
// Also remember the validation , required and other things also we can pass 

export default Login