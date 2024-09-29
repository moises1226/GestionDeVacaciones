import React from 'react'

const Button = (value) => {

    const {name} = value;

  return ( 

    <>

        <button className='bg-primary px-5 py-2 text-white'>{name}</button>
    
    
    </>



  )
}

export default Button
