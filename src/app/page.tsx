"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import Loader from "@/components/loader";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const handleSendDocs = () => {
    if (user) {
      router.push("/upload");
    }
    else{
      router.push("/signin")
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:px-24 text-white">
<header className="w-full  flex flex-col lg:flex-row justify-between items-center font-semibold  mb-8">
  {/* Left: Logo */}
  <div className="flex items-center text-center lg:text-left mb-4 lg:mb-0">
     <img src="/images/cite.png" alt="CITESCOUT Logo" className="h-10 w-10 object-contain" />
    <h1 className="text-2xl md:text-base  cursor-pointer">
      sights
    </h1>
  </div>

  {/* Middle: Navigation Tabs */}
  <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-sm mb-4 lg:mb-0">
    <a href="/" className="text-gray-700 hover:text-black transition">Home</a>
    <a href="/how-it-works" className="text-gray-700 hover:text-black transition">How it works</a>
    <a href="/about" className="text-gray-700 hover:text-black transition">About</a>
    <a href="/faqs" className="text-gray-700 hover:text-black transition">FAQs</a>
    <a href="/contact" className="text-gray-700 hover:text-black transition">Contact</a>
    <a href="/waitlist" className="text-gray-700 hover:text-black transition">Waitlist</a>
  </nav>

  {/* Right: Sign In Button */}
  <div className="flex-shrink-0">
    {!user && (
      <a
        href="/signin"
        className=" text-white md:text-sm  cursor-pointer"
      >
        Sign in
      </a>
    )}
  </div>
</header>


      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-[#131322] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-[#1A1A2E] after:via-[#0141ff5f] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#1A1A2E] before:dark:opacity-10 after:dark:from-[#121212] after:dark:via-[#0141FF] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-4xl mx-auto mb-8">
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

        <div className="flex items-center bg-[#1a1a2ecf] shadow-lg rounded-xl border border-zinc-700  p-6">
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
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors "
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">uploads</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Join 1000+ members and upload your research documents.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors "
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors "
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors "
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
