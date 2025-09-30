import React from "react";
import Inputs from "../dashboard/Inputs";

const EditProfileLayout = () => {
  return (
    <div>
      <Inputs label="full name" placeholder="" />
      <Inputs label="email" placeholder="" />
      <Inputs label="phone" placeholder="" />
      <Inputs label="password" placeholder="" />

      <button className="mx-auto block  my-10 rounded border dark:border-white p-2 bg-gray-400 dark:bg-transparent cursor-pointer capitalize font-[NunitoMedium] text-md border-black">
        submit{" "}
      </button>
    </div>
  );
};

export default EditProfileLayout;
