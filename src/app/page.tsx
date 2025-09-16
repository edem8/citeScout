"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import Loader from "@/components/loader";
import GridBackground from "@/components/grid";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const handleSendDocs = () => {
    if (user) {
      router.push("/upload");
    } else {
      router.push("/signin");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center  p-4 md:p-8 lg:px-10 text-white">
      {/* Grid Background */}
      <GridBackground />

      <header className="w-full flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-20 relative z-10">
        {/* Left: Logo */}
        <div className="flex font-semibold items-center text-center lg:text-left mb-4 lg:mb-0">
          <img
            src="/images/cite.png"
            alt="CITESCOUT Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-2xl md:text-sm font-semibold cursor-pointer">
            sights
          </h1>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 lg:gap-8 text-sm md:text-sm mb-4 lg:mb-0">
          {[
            { href: "/", label: "Home" },
            { href: "/how-it-works", label: "How it works" },
            { href: "/about", label: "About" },
            { href: "/faqs", label: "FAQs" },
            { href: "/contact", label: "Contact" },
            { href: "/waitlist", label: "Waitlist" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-white group transition"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Sign In Button */}
        <div className="flex-shrink-0">
          {!user && (
            <a
              href="/signup"
              className="text-white bg-blue-900 hover:bg-blue-900/80 p-3 rounded-full md:text-sm font-medium cursor-pointer"
            >
              Get Started
            </a>
          )}
        </div>
      </header>

      {/* Caption */}
      <div className="relative text-white flex items-center gap-2 border border-blue-800 tracking-wide  mb-4 lg:mb-10 text-sm  px-4 py-2 rounded-full overflow-hidden">
        <div className="flex items-center gap-2 justify-center text-[11px] md:text-xs lg:text-sm">
          <span className="relative z-10">AI Research Agent</span>
        </div>

        {/* Shimmer overlay */}
        <span
          className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_40%,transparent_70%)] bg-[length:200%_100%] animate-shimmer"
          aria-hidden="true"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-lg tracking-wide text-center  font-normal relative mb-4 lg:mb-8">
        <p className="text-white text-xxl leading-xxl md:text-5xl lg:text-6xl ">
          Citation Insights
        </p>

        <p className="text-[#99A1A9] text-xxl leading-xxl mt-1 md:text-5xl lg:text-6xl">
          About your Research
        </p>
      </h1>

      {/* Subheading */}
      <p className="text-[11px] md:text-xs lg:text-base font-normal text-[#99A1A9] relative text-center max-w-[18rem] md:max-w-xs lg:max-w-sm">
        Verify your citation format with our AI expert. Send  your document and we will
        do the rest.
      </p>

      {/* Main Content
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-4xl mx-auto mb-8 relative z-10">
        <div className="flex items-center bg-[#1a1a2ecf] shadow-lg rounded-xl border border-zinc-700 p-6">
          <div>
            <p className="text-gray-300">
              Verify your formatting with our AI expert. Send a document and we
              will do the rest.
            </p>
            <button
              onClick={handleSendDocs}
              className="mt-8 px-4 py-2 bg-blue-800 text-white rounded-lg font-bold cursor-pointer hover:bg-blue-600"
            >
              Send documents
            </button>
          </div>
        </div>

        <div className="flex items-center bg-[#1a1a2ecf] shadow-lg rounded-xl border border-zinc-700 p-6">
          <div>
            <p className="text-gray-300">
              Leverage our AI expert, see what formats others are using in their
              publications.
            </p>
            <button className="mt-8 px-4 py-2 bg-blue-800 text-white rounded-lg font-bold cursor-pointer hover:bg-blue-600">
              Join the waitlist
            </button>
          </div>
        </div>
      </div> */}

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left relative z-10">
        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">uploads</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Join 1000+ members and upload your research documents.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">
            validations
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Validate your in-text citation formats before publishing to research
            communities.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">scans</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Not sure what citation style was used in a document? Do a quick scan
            for free.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">styles</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Support for APA 7th & MLA 9th edition in-text citations. Keep an eye
            out for new releases.
          </p>
        </a>
      </div>
    </main>
  );
}
