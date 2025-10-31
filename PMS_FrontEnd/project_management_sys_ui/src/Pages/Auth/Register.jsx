import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {useDispatch} from "react-redux"
import {registerUser} from "../../redux/Auth/Action"


const Register = ({ toggleForm }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSuccessMsg("");

  try {
    const response = await dispatch(registerUser(data));

    if (response.success) {
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => toggleForm(), 2000); // switch to login form
    } else {
      setSuccessMsg("Registration failed! Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    setSuccessMsg("Something went wrong. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Register
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        {...register("name", { required: "User Name is required" })}
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      {errors.name && (
        <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      {errors.email && (
        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters required" },
        })}
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      {errors.password && (
        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      {errors.confirmPassword && (
        <p className="text-red-400 text-sm mt-1">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button
        type="submit"
        className="bg-cyan-400 text-black font-semibold mt-2 hover:bg-cyan-500"
      >
        Register
      </Button>

      <p className="text-sm text-gray-300 text-center mt-2">
        Already have an account?{" "}
        <span
          onClick={toggleForm}
          className="text-cyan-400 font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Register;
