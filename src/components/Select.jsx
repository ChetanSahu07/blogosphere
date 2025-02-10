import React from 'react'
import { useId, forwardRef } from 'react'


// This is the component for scroll bar 

function Select({
    options,
    label,
    className,
    ...props
},ref) {

    const id = useId()

  return (
    <div>
        { label && 
        <label htmlFor={id}>
        </label>
        }
        <select
        id = {id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        >
            {
                options?.map((eachOption)=>(
                    <option key={eachOption} value={eachOption}>
                        {eachOption}
                    </option>
                )) 
            }
        </select>
    </div>
  )
}

export default forwardRef(Select)