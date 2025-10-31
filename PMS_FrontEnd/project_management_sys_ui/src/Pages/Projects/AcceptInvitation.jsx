import React from "react";
import { useDispatch } from "react-redux";
import { acceptInvitation } from "../../redux/projects/ProjecActions";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { HandshakeIcon } from "lucide-react";

const AcceptInvitation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParam = new URLSearchParams(window.location.search);
  const token = urlParam.get("token");

  const handleAcceptInvitation = () => {
    if (!token) {
      alert("Invalid invitation link");
      return;
    }
    dispatch(acceptInvitation({ inviteToken: token, navigate }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1120]/95 p-6 text-white">
      {/* Card Container */}
      <div className="relative w-[400px] max-w-md rounded-2xl p-8 bg-[#0b1120]/80 border border-white/20 shadow-cyan-500/50 shadow-xl text-center backdrop-blur-md overflow-hidden">
        {/* Cyan Animated Border */}
        <div className="absolute -inset-0.5 rounded-2xl border border-cyan-400 border-opacity-50 animate-[rgbBorder_3s_linear_infinite]"></div>

        {/* Icon */}
        <div className="relative z-10 flex justify-center mb-4">
          <HandshakeIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="relative z-10 text-2xl font-bold mb-2">
          You’re Invited to Join a Project
        </h1>

        {/* Description */}
        <p className="relative z-10 text-gray-300 mb-6 text-sm">
          You’ve received an invitation to collaborate on an exciting project.
          Click below to accept and get started!
        </p>

        {/* Button */}
        <div className="relative z-10">
          <Button
            onClick={handleAcceptInvitation}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg py-2 transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Accept Invitation
          </Button>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 rounded-full bg-cyan-400 opacity-40 blur-lg"></div>

        {/* Border animation */}
        <style >{`
          @keyframes rgbBorder {
            0%, 100% {
              border-color: rgb(0, 255, 255);
            }
            25% {
              border-color: rgb(255, 0, 255);
            }
            50% {
              border-color: rgb(255, 255, 0);
            }
            75% {
              border-color: rgb(0, 255, 0);
            }
          }
          .animate-[rgbBorder_3s_linear_infinite] {
            animation: rgbBorder 3s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AcceptInvitation;
