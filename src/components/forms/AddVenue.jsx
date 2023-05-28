import { useForm, useFieldArray } from "react-hook-form";
import { VENUES_URL } from "../../utils/ApiUrls";
import { useState } from "react";

export function AddVenue() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("accessToken");

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

      const response = await fetch(VENUES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Venue added successfully");
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
      className="py-3 px-5 md:w-[26rem]"
    >
      <h1 className="text-3xl">Add venue</h1>
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
          rows={6}
          placeholder="Description of the venue"
          {...register("description", {
            required: "Please describe the venue (min 20)",
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
            placeholder="zip"
            {...register("zip", {})}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-1">
          <p>Country</p>
          <input
            type="text"
            className="mb-1 py-1 px-0.5 w-full"
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
      <p className="text-green-400">{successMessage}</p>
      <p className="text-red-400">{errorMessage}</p>
      <input
        type="submit"
        className="p-3 my-4 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
