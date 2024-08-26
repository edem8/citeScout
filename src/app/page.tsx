"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSendDocs = () => {
    router.push("/upload");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-24">
      <header className="w-full max-w-5xl flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer">
            CITESCOUT
          </h1>
        </div>
        <div className="flex-shrink-0">
          <a
            href="/signin"
            className="bg-[#151B27] text-white border border-[#0b0e14] rounded-lg px-6 py-3 font-bold cursor-pointer hover:bg-white dark:bg-white-800 dark:text-[#151B27]-800 dark:border-white-300 dark:hover:bg-gray-700"
          >
            Sign in
          </a>
        </div>
      </header>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-4xl mx-auto mb-8">
        <div className="flex items-center bg-white dark:bg-[#1A1A2E] shadow-lg rounded-xl border border-gray-300 dark:border-neutral-700 p-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
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

        <div className="flex items-center bg-white dark:bg-[#1A1A2E] shadow-lg rounded-xl border border-gray-300 dark:border-neutral-700 p-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
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
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">uploads</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Join 1000+ members and upload your research documents.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">
            validations
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Validate your in-text citation formats before publishing to research
            communities.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">scans</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Not sure what format was used in a document? Do a quick scan for
            free.
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-2 text-xl md:text-2xl font-semibold">styles</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Currently have support for APA & MLA in-text citations. Keep an eye
            out for new releases.
          </p>
        </a>
      </div>
    </main>
  );
}
