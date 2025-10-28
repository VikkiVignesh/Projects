import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const SubscriptionCard = ({ title, price, features, highlight }) => {
  return (
    <div className="relative w-72 rounded-2xl p-6 backdrop-blur-md bg-[#0b1120]/90 border border-white/20 shadow-cyan-500/50 shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
      
      {/* Animated RGB border for highlighted plan */}
      {highlight && (
        <div className="absolute -inset-0.5 rounded-2xl border border-cyan-400 border-opacity-50 animate-[rgbBorder_3s_linear_infinite] z-0"></div>
      )}

      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-3xl font-extrabold text-white mt-2">{price}</p>

        <ul className="mt-4 space-y-2 text-gray-300 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircledIcon className="w-4 h-4 text-green-400 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className={`mt-6 py-2 w-full font-semibold rounded-lg shadow-lg transition-transform cursor-pointer duration-300 ${
          highlight
            ? "bg-cyan-400 text-black cursor-not-allowed"
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}>
          {highlight ? "Current Plan" : "Subscribe"}
        </button>
      </div>

      {/* Bottom cyan glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 rounded-full bg-cyan-400 opacity-40 blur-lg"></div>

      {/* RGB border animation keyframes */}
      <style jsx>{`
        @keyframes rgbBorder {
          0%, 100% { border-color: rgb(0,255,255); }
          25% { border-color: rgb(255,0,255); }
          50% { border-color: rgb(255,255,0); }
          75% { border-color: rgb(0,255,0); }
        }
        .animate-[rgbBorder_3s_linear_infinite] {
          animation: rgbBorder 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionCard;
