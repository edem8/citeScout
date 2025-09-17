"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

export default function HeaderNavigation() {
  const [user] = useAuthState(auth);

  return (
    <header className="w-full flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-20 relative z-10">
      {/* Left: Logo */}
      <div className="flex font-semibold items-center text-center lg:text-left mb-4 lg:mb-0">
        <img
          src="/images/cite.png"
          alt="sight Logo"
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-2xl md:text-sm lg:text-lg font-medium tracking-wide cursor-pointer">
          sights
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 lg:gap-10 text-sm md:text-sm mb-4 lg:mb-0">
        {[
          { href: "/", label: "Home" },
          { href: "#", label: "How it works" },
          { href: "#", label: "About" },
          { href: "#", label: "FAQs" },
          { href: "#", label: "Support" },
          { href: "#", label: "Waitlist" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="relative text-white group transition"
          >
            {label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Right: Sign In Button */}
      {!user && (
        <div className="flex-shrink-0">
          <a
            href="/signup"
            className="text-white bg-blue-900 hover:bg-blue-900/80 p-3 rounded-full md:text-sm font-medium cursor-pointer"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
