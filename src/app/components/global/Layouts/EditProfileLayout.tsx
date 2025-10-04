"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useAuth } from "@/app/context/AuthContext";
import Inputs from "../dashboard/Inputs";
import {
  ProfileApiResponse,
  profileType,
  UpdateProfileType,
} from "@/app/services/@types";
import { setAuthToken } from "@/app/services/apiClient";
import {
  getProfile,
  updateProfile,
} from "@/app/services/dashboard/userService";
import LoadingSpinner from "../LoadingSpinner";

const EditProfileLayout: React.FC = () => {
  const { token } = useAuth();

  const [form, setForm] = useState<UpdateProfileType>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { data, isLoading, error } = useQuery<ProfileApiResponse<profileType>>({
    queryKey: ["profile"],
    queryFn: () => {
      setAuthToken(token);
      return getProfile();
    },
  });

  const {
    mutate,
    isPending,
    error: mutationError,
    data: mutationData,
  } = useMutation<ProfileApiResponse<profileType>, Error, UpdateProfileType>({
    mutationFn: (data) => {
      setAuthToken(token);
      return updateProfile(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          password: "", // Reset password field
        });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Client-side validation for password
    if (form.password && form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // Only include non-empty fields
    const updateData: UpdateProfileType = {};
    if (form.name) updateData.name = form.name;
    if (form.email) updateData.email = form.email;
    if (form.phone) updateData.phone = form.phone;
    if (form.password) updateData.password = form.password;

    mutate(updateData, {
      onError: (err) => {
        console.error("Update profile error:", err);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">
          Error loading profile: {error.message}
        </div>
      </div>
    );
  }

  // Pre-fill form with fetched data
  if (data?.success && data.data && !form.name) {
    setForm({
      name: data.data.name,
      email: data.data.email,
      phone: data.data.phone,
      password: "",
    });
  }

  return (
    <div>
      {mutationData && (
        <p
          className={`text-center mt-4 ${
            mutationData.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {mutationData.message}
        </p>
      )}
      {mutationError && (
        <p className="text-red-600 text-center mt-4">{mutationError.message}</p>
      )}
      <Inputs
        label="full name"
        placeholder=""
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <Inputs
        label="email"
        placeholder=""
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <Inputs
        label="phone"
        placeholder=""
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
      />
      <Inputs
        label="password"
        placeholder=""
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="mx-auto block my-10 rounded border dark:border-white p-2 bg-gray-400 dark:bg-transparent cursor-pointer capitalize font-[NunitoMedium] text-md border-black disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "submit"}
      </button>
    </div>
  );
};

export default EditProfileLayout;
