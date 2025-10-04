import { useLogin } from "@/app/hooks/userLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const { mutate, isPending, data, isSuccess, isError, error } = useLogin();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: (res) => {
        if (res.success && res.data) {
          router.push("/panel");
        }
      },
      onError: (err: any) => {
        const server = err?.response;
        const message = server?.message ?? err.message;
        console.error("Login error:", message);
      },
    });
  };

  return (
    <div>
      <Image
        src="/images/img-login.svg"
        alt="login image"
        width={350}
        height={350}
        quality={80}
        className="mx-auto my-10"
      />
      <form>
        <div className="container flex flex-col gap-5 justify-center align-middle justify-items-center my-10">
          <input
            type="text"
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
          />
          <input
            type="password"
            className="border border-gray-300 p-2 placeholder:text-gray-600 rounded-md w-[40vh] mx-auto"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="text-gray-800 border w-28 p-2 rounded m-2 mx-auto"
            onClick={handleSubmit}
          >
            {isPending ? "please wait..." : "Login"}
          </button>
        </div>
      </form>
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
          {(error as any)?.response?.message ?? (error as Error).message}
        </p>
      )}
    </div>
  );
};

export default Login;
