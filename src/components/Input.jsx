import React from 'react'
import { useId, forwardRef } from 'react'
import Button from './button'


// So here the main concept is that we will use same input component every place so need the unique id and its reference 
// So we are using forwardRef here 
// SYNTAX ::
// const Variable = forwardRef( function Variable({parameters},ref){//code})


const Input = forwardRef(function input({
    label,
    type="text",
    className="",
    ...props
} , ref ) {
    const id = useId()

    return (
      <div>
        {label && <label 
        className='inline-block mb-1 pl-1'
        htmlFor={id}>
            {label}
        </label>
        }
        <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
        ref = {ref}
        {...props}
        id = {id}
        />
      </div>
    )
  })


export default Input