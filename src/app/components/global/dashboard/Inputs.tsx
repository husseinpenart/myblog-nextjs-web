import React from "react";
import { InputTypes } from "../../@types/index.global";

const Inputs = ({ placeholder, onChange, value, label , type,name }: InputTypes) => {
  return (
    <div className="m-5">
      <div className="relative ">
        <input
          type={!type ? "text" :type}
          id="floating_outlined"
          className="block px-2.5 pb-2.5 pt-4 w-full font-[NunitoMedium] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer leadin"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute  font-[NunitoMedium] text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Inputs;
