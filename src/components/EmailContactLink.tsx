"use client";

import { FaEnvelope } from "react-icons/fa";

const email = "technoivr9@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${email}`;
const mobileDevicePattern = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i;

export default function EmailContactLink() {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!mobileDevicePattern.test(navigator.userAgent)) {
      return;
    }

    event.preventDefault();
    window.location.href = `mailto:${email}`;
  }

  return (
    <a
      href={gmailComposeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-accent/30 hover:bg-accent/5 transition-all"
    >
      <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
        <FaEnvelope size={18} />
      </span>
      <span className="text-sm font-medium text-gray-700">Email</span>
    </a>
  );
}
