import React from 'react'
import imgg from '../../../logo.png'
export default function Logo(){
    return(
        <div>
            <img src={imgg} className='w-40 rounded-full' />
        </div>
    )
}