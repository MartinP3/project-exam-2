import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { BOOKINGS_URL } from "../../utils/ApiUrls";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";

export function BookVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  const onSubmit = async (data) => {
    try {
      const venueId = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );

      const formData = { ...data, venueId };

      const response = await fetch(`${BOOKINGS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Venue successfully booked");
      } else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 402 ||
        response.status === 403
      ) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
      } else {
        console.log("Booking of venue failed :(");
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("There was an error booking the venue", error);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("dateFrom", date, true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("dateTo", date, true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5"
    >
      <h1 className="text-3xl">Book venue</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-2">
        <p>Guests*</p>
        <input
          type="number"
          className="mb-1 py-1 px-0.5 w-20"
          placeholder="guests"
          {...register("guests", {
            required: "There is a max limit of X",
            valueAsNumber: true,
            min: { value: 1, message: "At least 1" },
            max: { value: 99, message: "The upper limit is 99" },
          })}
        />
        <p className="text-red-400 -mt-1">{errors.guests?.message}</p>
      </div>
      <div className="flex gap-4">
        <div>
          <p>Start date*</p>
          <DatePicker
            className="mb-1 py-1 px-0.5 w-full"
            selected={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <p>End date*</p>
          <DatePicker
            className="mb-1 py-1 px-0.5 w-full"
            selected={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <p className="text-green-400">{successMessage}</p>
      <p className="text-red-400">{errorMessage}</p>
      <input
        type="submit"
        className="p-3 mt-2 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
