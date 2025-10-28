import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between Login and Register
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120]/90 p-5">
  <div className="relative w-full max-w-md rounded-lg overflow-hidden">
    {/* Animated Border Line */}
    <span className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none border-line"></span>

    {/* Actual Card */}
    <div className="relative bg-white/5 backdrop-blur-md  shadow-lg border border-white/20 p-8">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 font-semibold rounded-l-2xl transition-all ${
            isLogin ? "bg-cyan-400 text-black" : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 font-semibold rounded-r-2xl transition-all ${
            !isLogin ? "bg-cyan-400 text-black" : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Register
        </button>
      </div>

      {isLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
    </div>
  </div>
</div>


  );
};

export default Auth;
