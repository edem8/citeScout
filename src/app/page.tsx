"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import Loader from "@/components/loader";
import HeaderNavigation from "@/components/header";
import GridBackground from "@/components/grid";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  // Log user and loading states for debugging
  console.log("User state:", user);
  console.log("Loading state:", loading);

  const handleSendDocs = () => {
    if (loading) {
      console.log("Authentication is still loading...");
      return; // Don't allow routing if loading is still true
    }
    // After loading is done, push to the correct route
    router.push(user ? "/upload" : "/signin");
  };

  if (loading) return <Loader />; // Show loader while loading the auth state

  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 md:p-8 lg:px-10 text-white">
      {/* Grid Background */}
      <GridBackground />

      {/* Header */}
      <HeaderNavigation />
      {/* Caption */}
      <div className="relative text-white flex items-center gap-2 border border-blue-800 tracking-wide mb-4 lg:mb-15 text-sm px-4 py-2 rounded-full overflow-hidden">
        <div className="flex items-center gap-2 justify-center text-[11px] md:text-xs lg:text-sm">
          <span className="relative z-10">AI Research Agent</span>
        </div>
        <span
          className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_40%,transparent_70%)] bg-[length:200%_100%] animate-shimmer"
          aria-hidden="true"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-lg tracking-wide text-center font-medium relative mb-4 lg:mb-6">
        <p className="text-white text-xxl leading-xxl md:text-5xl lg:text-6xl">
          Citation Insights
        </p>
        <p className="text-[#99A1A9] text-xxl leading-xxl md:text-5xl mt-1 lg:text-6xl">
          About your Research
        </p>
      </h1>

      {/* Subheading */}
      <p className="text-[11px] md:text-xs lg:text-base font-normal text-[#99A1A9] relative text-center max-w-[18rem] md:max-w-xs lg:max-w-sm">
        Verify your citation format with our AI expert. Send your document and
        we will do the rest.
      </p>

      {/* "Send Documents" Button */}
      <div className="mt-10">
        <button
          className="text-white bg-blue-900 hover:bg-blue-900/80 px-6 py-3 rounded-full text-lg font-medium transition-all duration-300"
          onClick={handleSendDocs}
        >
          Send Documents
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-14 text-center text-sm text-gray-400 w-full z-10">
        <span>© copyright 2025 </span>
      </div>
    </main>
  );
}
