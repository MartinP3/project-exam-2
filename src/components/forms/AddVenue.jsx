// import {  useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { VENUES_URL } from '../../utils/ApiUrls';

export function AddVenue() {

  const { register, handleSubmit, control, formState: {errors} } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const token = localStorage.getItem('accessToken');

  const onSubmit = async (data) => {
    try {
      const response = await fetch(VENUES_URL, {
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
        
      }
      else if (response.status === 403) {
        console.log('Sorry, you are not authorized to add a venue, please become a venue manger first');
      }
      else {
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
      <h1 className='text-3xl'>Add venue</h1>
      <h2 className='mb-2 text-md'>* are required</h2>
      <div className='mb-1'>
        <p>Name*</p>
        <input type="name" className='mb-1 py-1 px-0.5 w-full' {...register("name", { required: "Please enter a name"})} placeholder="Humble Abode no.69420"/>
        <p className='text-red-400 -mt-1'>{errors.name?.message}</p>
      </div>
      <div className='mb-1'>
        <p>Description*</p>
        <textarea className='mb-1 py-1 px-0.5 w-full' placeholder='Description of the venue'{...register("description", {required: "Please describe the venue", min: 20})}/>
        <p className='text-red-400 -mt-1'>{errors.description?.message}</p>
      </div>
      <div className='mb-1'>
        <p>Media</p>
        {fields.map((item, index) => (
        <div key={item.id}>
          <input type="url" className='py-1 px-0.5 w-full' placeholder="Media" {...register(`media.${index}`, {})} />
          <button type="button" className="text-red-400" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <p className='text-red-400 -mt-1'>{errors.media?.message}</p>
      <button type="button" className='text-green-400' onClick={() => append()}>
        ++++
      </button>
      </div>
      <div className='flex gap-4'>
        <div className='mb-1'>
          <p>Price*</p>
          <input type="number" className='mb-1 py-1 px-0.5 w-full' placeholder="499" {...register("price", {required: "Please put a price", valueAsNumber: true, min: { value: 1, message: "At least get a dollar outta it!" }})} />
          <p className='text-red-400 -mt-1'>{errors.price?.message}</p>
        </div>
        <div className='mb-1'>
          <p>Max guests*</p>
          <input type="number" className='mb-1 py-1 px-0.5 w-full' placeholder="Guest Limit" {...register("maxGuests", {required: "Please put the max guest limit", valueAsNumber: true, min: { value: 1, message: "At least 1 please" }})} />
          <p className='text-red-400 -mt-1'>{errors.maxGuests?.message}</p>
        </div>
      </div>
      <div className='flex gap-6 justify-start'>
        <div>
          <p>Wifi</p>
          <input type="checkbox" {...register("wifi", {})} />
        </div>
        <div>
          <p>Parking</p>
          <input type="checkbox" {...register("parking", {})} />
        </div>
        <div>
          <p>Pets</p>
          <input type="checkbox" {...register("pets", {})} />
        </div>
        <div>
          <p>Breakfast</p>
          <input type="checkbox" {...register("breakfast", {})} />
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='mb-1'>
          <p>Address</p>
          <input type="text" className='mb-1 py-1 px-0.5 w-40' placeholder="Shawtystreet 42" {...register("address", {})} />
        </div>
        <div className='mb-1'>
          <p>City</p>
          <input type="text" className='mb-1 py-1 px-0.5 w-full' placeholder="Cooltown" {...register("city", {})} />
        </div>
        <div className='mb-1'>
          <p>Zip</p>
          <input type="text" className='mb-1 py-1 px-0.5 w-12' placeholder="4206" {...register("zip", {valueAsNumber: true})} />
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='mb-1'>
          <p>Country</p>
          <input type="text" className='mb-1 py-1 px-0.5 w-40' placeholder="Atlantis" {...register("country", {})} />
        </div>
        <div className='mb-1'>
          <p>Continent</p>
          <input type="text" className='mb-1 py-1 px-0.5 w-full' placeholder="Antarctica" {...register("continent", {})} />
        </div>
      </div>
      <input type="submit" className='p-3 mt-2 w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500'/>
    </form>
  )
}