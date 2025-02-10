
// container is nothing it is just a hieght and width div with some css classes to store somthing inside it 

import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div> ;
}

export default Container