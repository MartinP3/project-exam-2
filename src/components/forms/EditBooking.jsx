import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { BOOKINGS_URL } from "../../utils/ApiUrls";
import "react-datepicker/dist/react-datepicker.css";

export function EditBooking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  const id = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOKINGS_URL}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();

          setValue("guests", data.guests);
          setStartDate(new Date(data.dateFrom));
          setEndDate(new Date(data.dateTo));
        } else {
          console.log("Failed to fetch the booking data");
        }
      } catch (error) {
        console.log("There was an error fetching the booking data", error);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BOOKINGS_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Booking info is now updated");
      } else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 402 ||
        response.status === 403
      ) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("There was an error changing the booking", error);
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

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BOOKINGS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setDeleted(true);
      setDeleteStatus("Booking is now deleted");
      setShowModal(true);
    } else {
      setDeleteStatus("Failed to delete booking");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (deleted) {
      location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5 w-96"
    >
      <h1 className="text-3xl">Edit booking</h1>
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
            min: { value: 1, message: "At least 1 please" },
            max: { value: 99, message: "The limit is 99" },
          })}
        />
        <p className="text-red-400 -mt-1">{errors.guests?.message}</p>
      </div>
      <div className="flex gap-4">
        <div>
          <p>Start date*</p>
          <DatePicker
            className="mb-1 py-1 px-0.5 w-full"
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <p>End date*</p>
          <DatePicker
            className="mb-1 py-1 px-0.5 w-full"
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <p className="text-green-400 my-2">{successMessage}</p>
      <p className="text-red-400 my-2">{errorMessage}</p>
      <div className="flex gap-4 justify-between">
        <input
          type="submit"
          className="p-3 w-40 uppercase cursor-pointer shadow-md text-green-400 shadow-green-400 hover:text-green-500 hover:shadow-green-500"
        />
        <button
          onClick={handleDelete}
          className="p-3 w-half uppercase cursor-pointer shadow-md text-red-400 shadow-red-400 hover:text-red-500 hover:shadow-red-500"
        >
          Delete Booking
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-700 bg-opacity-50">
          <div className="bg-neutral-800 w-80 p-6 rounded shadow-lg">
            <p className="text-lg font-semibold">{deleteStatus}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-neutral-800 shadow-md shadow-blue-400 hover:shadow-blue-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
