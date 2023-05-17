import React from 'react';
import { useForm } from 'react-hook-form';
import { REGISTER_URL } from '../../utils/ApiUrls';

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.log('Registration failed :(');
      }
    } catch (error) {
      console.log('There was an error registering your account', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-700 py-3 px-5 w-96">
      <h1 className='mb-2 text-3xl'>Register Form</h1>
      <div className='mb-1'>
        <p>Name</p>
        <input type='text' className='mb-1 py-1 px-0.5 w-full' {...register("name", { required: "Please enter your full name.", minLength: { value: 3, message: "It must be at least 3 letters long (sorry if your name is only 2 characters long..." } })} placeholder="Billy Bob"/>
        <p className='text-red-400 -mt-1'>{errors.name?.message}</p>
      </div>
      <div className='mb-1'>
        <p>Email</p>
        <input type='email' className='mb-1 py-1 px-0.5 w-full' {...register("email", { required: "Please enter a valid email.", pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/, message: "Please enter a valid email"}})} placeholder="example@email.com"/>
        <p className='text-red-400 -mt-1'>{errors.email?.message}</p>
      </div>
      <div className='mb-1'>
        <p>Password</p>
        <input type='password' className='mb-1 py-1 px-0.5 w-full' {...register("password", { required: "Please enter a password.", minLength: { value: 6, message: "Min length should be 6" } })} placeholder="********"/>
        <p className='text-red-400 -mt-1'>{errors.password?.message}</p>
      </div>
      <div className='mb-2'>
        <p>Avatar</p>
        <input type='url' className='mb-1 py-1 px-0.5 w-full' {...register("url")} placeholder="Avatar url"/>
        <p className='text-red-400 -mt-1'>{errors.url?.message}</p>
      </div>
      <input type="submit" className='p-3 mt-2 w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500'/>
    </form>
  )
}