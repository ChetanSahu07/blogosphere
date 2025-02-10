import React from 'react'

// Here we have created a button which we can use in different places 
// so here we can provide props like onClick function and other props that is mentioned 
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '' ,
    ...props 
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${className} ${bgColor} `} 
    {...props}
    >
        {children}
    </button>
  )
}

export default Button