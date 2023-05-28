import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LOGIN_URL } from "../../utils/ApiUrls";
import { UserContext } from "../UserContext";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.accessToken;
        const name = responseData.name;
        const venueManager = responseData.venueManager;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userName", name);
        localStorage.setItem("venueManager", JSON.stringify(venueManager));
        setUser((prevUser) => ({
          ...prevUser,
          loggedIn: true,
          token: accessToken,
          name: name,
          venueManager: venueManager,
        }));
        setSuccessMessage("Login successful");
      } else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 402 ||
        response.status === 403
      ) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
      } else {
        console.log("Login failed :(");
      }
    } catch (error) {
      console.log("There was an error logging into your account", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 px-5 w-96"
    >
      <h1 className="mb-2 text-3xl">Login Form</h1>
      <h2 className="mb-2 text-md">* are required</h2>
      <div className="mb-1">
        <p>Email*</p>
        <input
          type="email"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("email", {
            required: "Please enter a valid email.",
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
              message: "Please enter a valid email",
            },
          })}
          placeholder="example@email.com"
        />
        <p className="text-red-400 -mt-1">{errors.email?.message}</p>
      </div>
      <div className="mb-1">
        <p>Password*</p>
        <input
          type="password"
          className="mb-1 py-1 px-0.5 w-full"
          {...register("password", {
            required: "Please enter your password.",
            minLength: { value: 6, message: "Min length is 6" },
          })}
          placeholder="********"
        />
        <p className="text-red-400 -mt-1">{errors.password?.message}</p>
      </div>
      <p className="text-green-400 my-2">{successMessage}</p>
      <p className="text-red-400 my-2">{errorMessage}</p>
      <input
        type="submit"
        className="p-3 mt-2 uppercase cursor-pointer w-full text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
      />
    </form>
  );
}
