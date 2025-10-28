import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const Login = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // handle login logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
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
      </div>

      <Button
        type="submit"
        className="bg-cyan-400 text-black font-semibold mt-2 hover:bg-cyan-500"
      >
        Login
      </Button>

      {/* Switch to Register */}
      <p className="text-sm text-gray-300 text-center mt-2">
        Don’t have an account?{" "}
        <span
          onClick={toggleForm}
          className="text-cyan-400 font-semibold cursor-pointer"
        >
          Register
        </span>
      </p>
    </form>
  );
};

export default Login;
