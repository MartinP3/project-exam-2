import { useForm } from 'react-hook-form';

export function LoginForm() {

  const { register, handleSubmit, formState: {errors} } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log(data);
    })} className="bg-neutral-700 py-3 px-5 w-96">
      <h1 className='mb-2 text-3xl'>Login Form</h1>
      <div className='mb-1'>
        <p>Email</p>
        <input type="email" className='mb-1 py-1 px-0.5 w-full' {...register("email", { required: "Please enter a valid email.", pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/, message: "Please enter a valid email"}})} placeholder="example@email.com"/>
        <p className='text-red-400 -mt-1'>{errors.email?.message}</p>
      </div>
      <div className='mb-1'>
        <p>Password</p>
        <input type="password" className='mb-1 py-1 px-0.5 w-full' {...register("password", { required: "Please enter your password.", minLength: { value: 6, message: "Min length is 6" } })} placeholder="********"/>
        <p className='text-red-400 -mt-1'>{errors.password?.message}</p>
      </div>
      <input type="submit" className='p-3 mt-2 w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500'/>
    </form>
  )
}