import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { VENUES_URL } from "../../utils/ApiUrls";

export function EditVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const token = localStorage.getItem("accessToken");

  const id = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VENUES_URL}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setValue("name", data.name);
            setValue("description", data.description);
            setValue("media", data.media);
            setValue("price", data.price);
            setValue("maxGuests", data.maxGuests);
          }

          if (data.meta) {
            setValue("breakfast", data.meta.breakfast);
            setValue("parking", data.meta.parking);
            setValue("pets", data.meta.pets);
            setValue("wifi", data.meta.wifi);
          }

          if (data.location) {
            setValue("address", data.location.address);
            setValue("city", data.location.city);
            setValue("continent", data.location.continent);
            setValue("country", data.location.country);
            setValue("zip", data.location.zip);
          }
        } else {
          console.log("Failed to fetch venue data");
        }
      } catch (error) {
        console.log("There was an error fetching venue data", error);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${VENUES_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Venue updated successfully");
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Updating of venue failed :(");
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("There was an error updating your venue", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5 w-96"
    >
      <h1 className="text-3xl">Edit venue</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-1">
        <p>Name*</p>
        <input
          type="name"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("name", { required: "Please enter a name" })}
          placeholder="Humble Abode no.69420"
        />
        <p className="text-red-400 -mt-1">{errors.name?.message}</p>
      </div>
      <div className="mb-1">
        <p>Description*</p>
        <textarea
          className="mb-1 py-1 px-0.5 w-full"
          placeholder="Description of the venue"
          rows={6}
          {...register("description", {
            required: "Please describe the venue",
            min: 20,
          })}
        />
        <p className="text-red-400 -mt-1">{errors.description?.message}</p>
      </div>
      <div className="mb-1">
        <p>Media</p>
        {fields.map((item, index) => (
          <div key={item.id}>
            <input
              type="url"
              className="py-1 px-0.5 w-full"
              placeholder="Media"
              {...register(`media.${index}`, {})}
            />
            <button
              type="button"
              className="text-red-400 uppercase"
              onClick={() => remove(index)}
            >
              remove
            </button>
          </div>
        ))}
        <p className="text-red-400 -mt-1">{errors.media?.message}</p>
        <button
          type="button"
          className="text-green-400"
          onClick={() => append()}
        >
          ++++
        </button>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <p>Price*</p>
          <input
            type="number"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="499"
            {...register("price", {
              required: "Please put a price",
              valueAsNumber: true,
              min: { value: 1, message: "At least get a dollar outta it!" },
            })}
          />
          <p className="text-red-400 -mt-1">{errors.price?.message}</p>
        </div>
        <div className="mb-1">
          <p>Max guests*</p>
          <input
            type="number"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="Guest Limit"
            {...register("maxGuests", {
              required: "Please put the max guest limit",
              valueAsNumber: true,
              min: { value: 1, message: "At least 1 please" },
              max: { value: 99, message: "The limit is 99" },
            })}
          />
          <p className="text-red-400 -mt-1">{errors.maxGuests?.message}</p>
        </div>
      </div>
      <div className="flex gap-6 justify-start">
        <div>
          <p>Wifi</p>
          <input
            type="checkbox"
            {...register("wifi", {})}
          />
        </div>
        <div>
          <p>Parking</p>
          <input
            type="checkbox"
            {...register("parking", {})}
          />
        </div>
        <div>
          <p>Pets</p>
          <input
            type="checkbox"
            {...register("pets", {})}
          />
        </div>
        <div>
          <p>Breakfast</p>
          <input
            type="checkbox"
            {...register("breakfast", {})}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <p>Address</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-40"
            placeholder="Shawtystreet 42"
            {...register("address", {})}
          />
        </div>
        <div className="mb-1">
          <p>City</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="Cooltown"
            {...register("city", {})}
          />
        </div>
        <div className="mb-1">
          <p>Zip</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-12"
            placeholder="4206"
            {...register("zip", { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <p>Country</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-40"
            placeholder="Atlantis"
            {...register("country", {})}
          />
        </div>
        <div className="mb-1">
          <p>Continent</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="Antarctica"
            {...register("continent", {})}
          />
        </div>
      </div>
      <input
        type="submit"
        className="p-3 mt-2 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}