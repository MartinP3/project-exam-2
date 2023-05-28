import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { REGISTER_URL } from "../../utils/ApiUrls";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  /**
   * This is where the data gets sent to the API and the user
   * gets redirected to the login page on successful registration.
   */
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
      } else if (
        /*
        This is where errors get handled and displayed accordingly to the user so that they
        can know what went wrong and how to fix it.
        */
        response.status === 400 ||
        response.status === 401 ||
        response.status === 402 ||
        response.status === 403
      ) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
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
      className="py-3 px-5 w-80 sm:w-96"
    >
      <h1 className="mb-2 text-3xl">Register Form</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-1">
        <label htmlFor="name">Name*</label>
        <input
          id="name"
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
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("email", {
            required: "Please enter a valid email.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
              message: "Please use a stud.noroff.no email.",
            },
          })}
          placeholder="example@email.com"
        />
        <p className="text-red-400 -mt-1">{errors.email?.message}</p>
      </div>
      <div className="mb-1">
        <label htmlFor="password">Password*</label>
        <input
          id="password"
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
        <label htmlFor="avatar">Avatar</label>
        <input
          id="avatar"
          type="url"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("url")}
          placeholder="Avatar url"
        />
        <p className="text-red-400 -mt-1">{errors.url?.message}</p>
      </div>
      <div className="mb-2">
        <label
          htmlFor="venueManager"
          className="block"
        >
          Venue Manager
        </label>
        <input
          id="venueManager"
          type="checkbox"
          {...register("venueManager", {})}
        />
      </div>
      <p className="my-2 text-red-400">{errorMessage}</p>
      <input
        type="submit"
        className="p-3 mt-2 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
