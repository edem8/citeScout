"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleSendDocs = () => {
    if (user) {
      router.push("/upload");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-24 text-white">
      <header className="w-full max-w-5xl flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer">
            CITESCOUT
          </h1>
        </div>
        <div className="flex-shrink-0">
          {!user && (
            <a
              href="/signin"
              className="bg-[#151B27] text-white border border-[#151B27] rounded-lg px-6 py-3 font-bold cursor-pointer hover:bg-[#181f30d0] hover:text-white"
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-600 hover:bg-[#1A1A2E] hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">uploads</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-75">
            Join 1000+ members and upload your research documents.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-600 hover:bg-[#1A1A2E] hover:text-white"
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-600 hover:bg-[#1A1A2E] hover:text-white"
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-600 hover:bg-[#1A1A2E] hover:text-white"
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
