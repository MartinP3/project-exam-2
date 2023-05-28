import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PROFILES_URL } from "../../utils/ApiUrls";

export function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const userName = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  // Avatar url fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PROFILES_URL}/${userName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();

          setValue("avatar", data.avatar);
          setValue("venueManager", data.venueManager);
        } else if (
          response.status === 400 ||
          response.status === 401 ||
          response.status === 402 ||
          response.status === 403
        ) {
          const errorData = await response.json();
          setErrorMessage(errorData.errors[0].message);
        } else {
          console.log("Failed to fetch the profile picture data");
        }
      } catch (error) {
        console.log("There was an error fetching the data", error);
      }
    };

    fetchData();
  }, [userName]);

  const params = "media";

  const token = localStorage.getItem("accessToken");

  const [SuccessMessageAvatar, setSuccessMessageAvatar] = useState("");
  const [SuccessMessageManager, setSuccessMessageManager] = useState("");

  // Avatar url updating
  const onSubmitAvatar = async (data) => {
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
        setSuccessMessageAvatar("Profile picture updated");
      } else {
        console.log("Something went wrong :(");
      }
    } catch (error) {
      console.log("Something went EXTRA WRONG!", error);
    }
  };

  // Manager status updating
  const onSubmitManager = async (data) => {
    try {
      const response = await fetch(`${PROFILES_URL}/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessageManager("Manager status updated");
        localStorage.setItem("venueManager", data.venueManager);
      } else {
        console.log("Something went wrong :(");
      }
    } catch (error) {
      console.log("Something went EXTRA WRONG!", error);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmitAvatar)}
        className="py-3 px-5 w-80 sm:w-96"
      >
        <div className="mb-2">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="url"
            id="avatar"
            className="mb-1 py-1 px-0.5 w-full"
            {...register("avatar")}
            placeholder="Avatar url"
          />
          <p className="text-green-400 -mt-1">{SuccessMessageAvatar}</p>
          <p className="text-red-400 -mt-1">{errors.url?.message}</p>
        </div>
        <button
          className=' type="submit"
          className=" h-12 mt-2 w-full uppercase cursor-pointer text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"'
        >
          update
        </button>
      </form>
      <form
        onSubmit={handleSubmit(onSubmitManager)}
        className="py-3 px-5"
      >
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
            className="mb-1"
            {...register("venueManager")}
          />
          <p className="text-green-400 -mt-1">{SuccessMessageManager}</p>
          <p className="text-red-400 -mt-1">{errors.url?.message}</p>
        </div>
        <p className="text-red-400 my-2">{errorMessage}</p>
        <button
          className=' type="submit"
          className=" h-12 mt-2 w-full uppercase cursor-pointer text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"'
        >
          update
        </button>
      </form>
    </div>
  );
}
