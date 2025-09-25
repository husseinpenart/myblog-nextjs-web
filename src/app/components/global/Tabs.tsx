import React, { useRef, useState } from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { TabStatus } from '../@types/index.global'
import { motion, AnimatePresence } from "framer-motion";

const Tabs = () => {
    const [tabs, setTabs] = useState<TabStatus>("Login")
    const handleChangeTab = (tabs: "Login" | "Register") => {
        setTabs(tabs)
    }
    return (
        <div>
            <div className='border-2 border-white  inset-2 shadow-md shadow-amber-100 bg-amber-100 rounded-xl p-2 w-[50rem]'>
                <div className='flex flex-wrap justify-center justify-items-center gap-10 border-b border-gray-300'>
                    <div> <button className={`${tabs == "Login" ? " font-[NunitoBold] text-xl " : ""} text-center text-black p-1 cursor-pointer`} onClick={() => handleChangeTab("Login")} >Login</button></div>
                    <div className=' border-l h-10 border-gray-600 '></div>
                    <div> <button className={`${tabs == "Register" ? " font-[NunitoBold] text-xl " : ""} text-center text-black p-1 cursor-pointer`} onClick={() => handleChangeTab("Register")}>Register</button></div>
                </div>
                {/* /// login form and registration */}
                <AnimatePresence mode='wait'>
                    {tabs == "Login" ? <div className=''>
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Login />
                        </motion.div>
                    </div> : <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Register />
                    </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Tabs