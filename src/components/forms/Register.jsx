import React from "react";
import { useForm } from "react-hook-form";
import { REGISTER_URL } from "../../utils/ApiUrls";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Registration successful");
        location.href = "/login";
      } else {
        console.log("Registration failed :(");
      }
    } catch (error) {
      console.log("There was an error registering your account", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5 w-96"
    >
      <h1 className="mb-2 text-3xl">Register Form</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-1">
        <p>Name*</p>
        <input
          type="text"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("name", {
            required: "Please enter your full name.",
            minLength: {
              value: 3,
              message:
                "It must be at least 3 letters long (sorry if your name is only 2 characters long...",
            },
            pattern: {
              value: /^[a-zA-Z_]+$/,
              message: "Only a-z and _ allowed",
            },
          })}
          placeholder="Billy_Bob"
        />
        <p className="text-red-400 -mt-1">{errors.name?.message}</p>
      </div>
      <div className="mb-1">
        <p>Email*</p>
        <input
          type="email"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("email", {
            required: "Please enter a valid email.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
              message: "Please enter stud.noroff.no email.",
            },
          })}
          placeholder="example@email.com"
        />
        <p className="text-red-400 -mt-1">{errors.email?.message}</p>
      </div>
      <div className="mb-1">
        <p>Password*</p>
        <input
          type="password"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("password", {
            required: "Please enter a password.",
            minLength: { value: 8, message: "Min length should be 8." },
          })}
          placeholder="********"
        />
        <p className="text-red-400 -mt-1">{errors.password?.message}</p>
      </div>
      <div className="mb-2">
        <p>Avatar</p>
        <input
          type="url"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("url")}
          placeholder="Avatar url"
        />
        <p className="text-red-400 -mt-1">{errors.url?.message}</p>
      </div>
      <div className="mb-2">
        <p>Venue Manager</p>
        <input
          type="checkbox"
          {...register("venueManager", {})}
        />
      </div>
      <input
        type="submit"
        className="p-3 mt-2 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
