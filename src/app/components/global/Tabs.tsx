import React from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'

const Tabs = () => {
    return (
        <div>
            <div className='border-2 border-white  inset-2 shadow-md shadow-amber-100 bg-amber-100 rounded-xl p-2 w-[50rem]'>

                <div className='flex flex-wrap justify-center justify-items-center gap-10 border-b border-gray-300'>
                    <div> <button className='text-center text-black p-1 '>Login</button></div>
                    <div className=' border-l h-10 border-gray-600 '></div>
                    <div> <button className='text-center text-black p-1 '>Register</button></div>
                </div>
                {/* /// login form and registration */}
                {/* <Login />    */}
                <Register />

            </div>


        </div>
    )
}

export default Tabs