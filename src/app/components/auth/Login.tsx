import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {
  const router = useRouter()
  const navigated = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    router.push('/panel')
  }
  return (
    <div>
      <Image
        src="/images/img-login.svg"
        alt="login image"
        width={350}
        height={350}
        quality={80}
        className='mx-auto my-10'
      />
      <form >
        <div className='container flex flex-col gap-5 justify-center align-middle justify-items-center my-10'>
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' name="" id="" placeholder='email' />
          <input type="text" className='border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto' placeholder='password' />
          <button className='text-gray-800 border w-28 p-2 rounded m-2 mx-auto' onClick={()=>navigated}>Login</button>
        </div>
      </form>


    </div>
  )
}

export default Login