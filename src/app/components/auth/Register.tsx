import Image from 'next/image'
import React from 'react'

const Register = () => {
  return (
    <div>
      <Image
        src="/images/register.png"
        alt="login image"
        width={350}
        height={350}
        quality={80}
        className='mx-auto my-10'
      />
      <form >
        <div className='container flex flex-col gap-5 justify-center align-middle justify-items-center my-10'>
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' name="" id="" placeholder='Name' />
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' name="" id="" placeholder='Email' />
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' name="" id="" placeholder='Phone' />
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' placeholder='Password' />
          <button className='text-gray-800 border w-28 p-2 rounded m-2 mx-auto' >Register</button>
        </div>
      </form>


    </div>
  )
}

export default Register