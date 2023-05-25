import React from "react";
import { useForm } from "react-hook-form";
import { PROFILES_URL } from "../../utils/ApiUrls";

export function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userName = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const params = "media";

  const token = localStorage.getItem("accessToken");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${PROFILES_URL}/${userName}/${params}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("It.. it went well???");
      } else {
        console.log("Something went wrong :(");
      }
    } catch (error) {
      console.log("Something went EXTRA WRONG!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-700 py-3 px-5 w-96"
    >
      <div className="mb-2">
        <p>Avatar</p>
        <input
          type="url"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("avatar")}
          placeholder="Avatar url"
        />
        <p className="text-red-400 -mt-1">{errors.url?.message}</p>
      </div>
      <input
        type="submit"
        className="p-3 mt-2 w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500"
      />
    </form>
  );
}
