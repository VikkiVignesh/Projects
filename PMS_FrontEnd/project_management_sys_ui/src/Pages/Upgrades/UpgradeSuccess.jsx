import React, { useEffect, useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/Store";
import { getUserSubscription, upgradeSubscription } from "../../redux/subscription/subActions";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const dispatch=useDispatch()

  const {subscription}=useSelector(store=>store)

  const queryParams=new URLSearchParams(location.search)

  const paymentId=queryParams.get("payment_id");
  const planType=queryParams.get("planType");


  // Progress + redirect logic
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current * 12.5); // 8 seconds = 100%
      if (current === 8) {
        clearInterval(interval);
        navigate("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);


  useEffect(()=>
    {
        dispatch(upgradeSubscription(planType))
        dispatch(getUserSubscription())
    },[])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1120]/90 text-white p-6 relative -mt-20">
      
      {/* Cyan Glow Circle with Green Check */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-40 h-40 rounded-full bg-cyan-500 opacity-20 blur-3xl animate-pulse"></div>
        <div className="relative w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center">
          <CheckCircledIcon className="text-green-400 w-16 h-16 animate-blink" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-2 animate-fade-in">
        Subscription Upgraded!
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Your <span className="text-cyan-400">free</span> is now active 🎉
      </p>

      {/* Plan Details */}
      <div className="relative w-80 rounded-2xl p-6 backdrop-blur-md bg-[#0b1120]/90 border border-cyan-400/40 shadow-lg shadow-cyan-500/40 animate-fade-up">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">free</h2>

        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <div className="flex justify-between">
            <span className="text-gray-400">Start Date:</span>
            <span className="text-cyan-400 font-medium"></span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">End Date:</span>
            <span className="text-cyan-400 font-medium"></span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-gray-400">Status:</span>
            <span className="text-cyan-400 font-semibold">Active</span>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 rounded-full bg-cyan-400 opacity-40 blur-lg"></div>
      </div>

      {/* Toast + Progress Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-80 bg-[#1a2539]/90 border border-cyan-400/30 rounded-lg shadow-lg p-3 flex flex-col gap-2 animate-slide-up">
        <p className="text-sm text-center text-gray-200">
          Redirecting to Home Page...
        </p>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-cyan-400 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px #22c55e); }
          50% { opacity: 0.4; filter: drop-shadow(0 0 2px #22c55e); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease forwards; }
        .animate-fade-up { animation: fade-up 1.2s ease forwards; }
        .animate-blink { animation: blink 1.5s infinite ease-in-out; }
        .animate-slide-up { animation: slide-up 0.8s ease forwards; }
      `}</style>
    </div>
  );
};

export default UpgradeSuccess;
