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

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const formData = {
        ...data,
        meta: {
          wifi: data.wifi || false,
          parking: data.parking || false,
          breakfast: data.breakfast || false,
          pets: data.pets || false,
        },
        location: {
          address: data.address || "Unknown",
          city: data.city || "Unknown",
          zip: data.zip || "Unknown",
          country: data.country || "Unknown",
          continent: data.continent || "Unknown",
        },
      };

      const response = await fetch(`${VENUES_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Venue details are updated");
      } else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 402 ||
        response.status === 403
      ) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
      } else {
        console.log("Adding of venue failed :(");
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.log("There was an error adding your venue", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5 w-80 sm:w-96"
    >
      <h1 className="text-3xl">Edit venue</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-1">
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="name"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("name", { required: "Please enter a name" })}
          placeholder="Humble Abode no.69420"
        />
        <p className="text-red-400 -mt-1">{errors.name?.message}</p>
      </div>
      <div className="mb-1">
        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
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
        <label htmlFor="media">Media</label>
        {fields.map((item, index) => (
          <div key={item.id}>
            <input
              id="media"
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
          <label htmlFor="price">Price*</label>
          <input
            id="price"
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
          <label htmlFor="maxGuests">Max guests*</label>
          <input
            id="maxGuests"
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
          <label
            htmlFor="wifi"
            className="block"
          >
            Wifi
          </label>
          <input
            id="wifi"
            type="checkbox"
            {...register("wifi", {})}
          />
        </div>
        <div>
          <label
            htmlFor="parking"
            className="block"
          >
            Parking
          </label>
          <input
            id="parking"
            type="checkbox"
            {...register("parking", {})}
          />
        </div>
        <div>
          <label
            htmlFor="pets"
            className="block"
          >
            Pets
          </label>
          <input
            id="pets"
            type="checkbox"
            {...register("pets", {})}
          />
        </div>
        <div>
          <label
            htmlFor="breakfast"
            className="block"
          >
            Breakfast
          </label>
          <input
            id="breakfast"
            type="checkbox"
            {...register("breakfast", {})}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="mb-1 py-1 px-0.5 w-32 md:w-40"
            placeholder="Shawtystreet 42"
            {...register("address", {})}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="Cooltown"
            {...register("city", {})}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="zip">Zip</label>
          <input
            id="zip"
            type="text"
            className="mb-1 py-1 px-0.5 w-12"
            placeholder="zip"
            {...register("zip", {})}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            className="mb-1 py-1 px-0.5 w-40"
            placeholder="Atlantis"
            {...register("country", {})}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="continent">Continent</label>
          <input
            id="continent"
            type="text"
            className="mb-1 py-1 px-0.5 w-full"
            placeholder="Antarctica"
            {...register("continent", {})}
          />
        </div>
      </div>
      <p className=" text-green-400">{successMessage}</p>
      <p className="text-red-400">{errorMessage}</p>
      <input
        type="submit"
        className="p-3 my-4 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
