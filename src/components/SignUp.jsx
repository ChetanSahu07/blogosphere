import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authservice from '../appwrite/auth'
import Button from './button'
import Input from './Input'
import Logo from './Logo/Logo'
import { login } from '../store/authSlice'




import { userCreateAccount, userGetCurrentUser } from '../backendConnect/auth.js'

function SignUp() {
    const [error, SetError] = useState("")
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signupAccount = async (data) => {
        SetError("")
        try {
            const session = await userCreateAccount(data) ;
            if (session) {
                const userData = await userGetCurrentUser() ;
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            SetError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center" >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`} >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>

                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                { error && <p className="text-red-600 mt-8 text-center">{error}</p> }
                <form onSubmit={handleSubmit(signupAccount)}>
                    <div className='space-y-5'>
                        <Input
                        type="Name"
                        placeholder="Enter Full Name: "
                        label="name"
                        {...register("name",{
                            required:true
                        })}
                        />

                        <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email",{
                            required:true ,
                            validate:{
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />

                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter a password"
                        {...register("password",{
                            required:true
                        })}
                        />

                        <Button
                        type='submit'
                        children="SignUp"
                        className="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
