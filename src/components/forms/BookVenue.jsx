import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { BOOKINGS_URL } from '../../utils/ApiUrls';
import "react-datepicker/dist/react-datepicker.css";

export function BookVenue() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const token = localStorage.getItem('accessToken');

  const onSubmit = async (data) => {
    try {
      const response = await fetch(BOOKINGS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Venue added successfully');
        const data = await response.json();
        console.log(data);
        
      } else {
        console.log('Adding of venue failed :(');
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log('There was an error adding your venue', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-700 py-3 px-5 w-96">
      <h1 className='text-3xl'>Book venue</h1>
      <h2 className='mb-2 text-md'>* are required</h2>
      <div className='mb-2'>
        <p>Guests*</p>
        <input type="number" className='mb-1 py-1 px-0.5 w-20' placeholder="Amount" {...register("maxGuests", {required: "There is a max limit of X", valueAsNumber: true, min: { value: 1, message: "At least 1 please" }, max: { value: 99, message: "The limit is 99" }})} />
        <p className='text-red-400 -mt-1'>{errors.maxGuests?.message}</p>
      </div>
      <div className='flex gap-4'>
        <div>
          <p>Start date*</p>
          <DatePicker className='mb-1 py-1 px-0.5 w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div>
          <p>End date*</p>
          <DatePicker className='mb-1 py-1 px-0.5 w-full' selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <input type="submit" className='p-3 mt-2 w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500'/>
    </form>
  )
}