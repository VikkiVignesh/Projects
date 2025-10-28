import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
 const plans = [
  {
    title: "Free Plan",
    price: "$0",
    features: [
      "Create up to 3 Projects",
      "Basic Task Management",
      "Limited Team Collaboration (Up to 2 Members)",
      "Basic Chat & File Sharing",
      "Community Support",
      "Access to Public Templates",
      "View-Only Dashboard Access",
      "Email Notifications (Basic)",
    ],
  },
  {
    title: "Monthly Plan",
    price: "$9.99/mo",
    features: [
      "Unlimited Projects & Tasks",
      "Advanced Chat with File Attachments",
      "Task Automation (Rules & Triggers)",
      "Custom Project Templates",
      "Priority Email & Chat Support",
      "Advanced Analytics & Insights",
      "Team Role Management & Permissions",
    ],
    highlight: true, // highlighted with RGB border
  },
  {
    title: "Annual Plan",
    price: "$99.99/yr",
    features: [
      "Everything in Monthly Plan",
      "Save 20% Annually",
      "Unlimited Team Members",
      "Extended File Storage (10GB)",
      "Advanced Security Controls (2FA, Encrypted Storage)",
      "Custom Branding for Workspaces",
      "Dedicated Account Manager",
    ],
  },
];


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1120]/90 p-10">
      <h1 className="text-4xl font-bold text-white mb-10">
        Choose Your Plan
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {plans.map((plan, index) => (
          <SubscriptionCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscription;
