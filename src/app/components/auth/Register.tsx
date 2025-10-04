"use client";

import { useRegister } from "@/app/hooks/useRegister";
import Image from "next/image";
import React, { useState } from "react";

const Register = () => {
  const { mutate, isPending, data, isSuccess, isError, error } = useRegister();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div>
      <Image
        src="/images/register.png"
        alt="login image"
        width={350}
        height={350}
        quality={80}
        className="mx-auto my-10"
      />
      <form onSubmit={handleSubmit}>
        <div className="container flex flex-col gap-5 justify-center align-middle justify-items-center my-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
          />
          <button
            type="submit"
            className="text-gray-800 border w-28 p-2 rounded m-2 mx-auto"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Register"}
          </button>

          {isSuccess && data && (
            <p
              className={`${
                data.success ? "text-green-600" : "text-red-600"
              } text-center font-[NunitoMedium] text-lg`}
            >
              {data.message}
            </p>
          )}

          {isError && (
            <p className="text-red-600 text-center font-[NunitoMedium] text-lg">
              {error.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
