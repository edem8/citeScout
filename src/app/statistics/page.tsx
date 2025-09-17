"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Viewer from "@/components/issues";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import Loader from "@/components/loader";

const Statistics: FC = () => {
  const [style, setStyle] = useState<string>("");
  const [totalCitations, setTotalCitations] = useState<number>(0);
  const [validCitations, setValidCitations] = useState<number>(0);
  const [invalidCitations, setInvalidCitations] = useState<number>(0);
  const [invalidList, setInvalidList] = useState<string[]>([]);
  const [correctList, setCorrectList] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState<true | false>(true);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    } else if (!loading && user) {
      setShowLoader(false);
      const result = localStorage.getItem("uploadResult");
      if (result) {
        const {
          style,
          totalCitations,
          validCitations,
          invalidCitations,
          invalid,
          correct,
        } = JSON.parse(result);
        setStyle(style);
        setTotalCitations(totalCitations);
        setValidCitations(validCitations);
        setInvalidCitations(invalidCitations);
        setInvalidList(invalid || []);
        setCorrectList(correct || []);
      }
    }
  }, [loading, user, router]);

  const handleScanNewDocument = () => {
    router.push("/upload");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-md sm:max-w-lg mb-8">
        <div className="text-zinc-500 text-2xl tracking-wide font-medium pb-2 border-b border-gray-600 mb-8 text-center">
          Insights
        </div>
        <div className="shadow-lg rounded-none border-none border-[#2c2c3a] p-6">
          {totalCitations === 0 ? (
            <div className="text-center">
              <p className="text-zinc-400 mb-4">No related citations.</p>
              <button
                onClick={handleScanNewDocument}
                className="px-6 sm:px-12 py-3 max-w-xs text-sm mx-auto bg-blue-800 text-white rounded-sm hover:bg-blue-800/80"
              >
                Scan new document
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-zinc-300 text-sm tracking-wide">
                  Citation style
                </span>
                <span className="text-zinc-400">{style}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300 text-sm tracking-wide">
                  Total citations
                </span>
                <span className="text-zinc-400">{totalCitations}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300 text-sm tracking-wide">
                  Valid citations
                </span>
                <span className="text-zinc-400">{validCitations}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300 text-sm tracking-wide">
                  Invalid citations
                </span>
                <span className="text-zinc-400">{invalidCitations}</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-[#19192cdd] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-[#1a1a2e] after:via-[#0141ff64] after:blur-2xl after:content-[''] before:dark:opacity-10 after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <div className="w-full max-w-md sm:max-w-lg text-center mt-4">
        {totalCitations === 0 ? null : invalidCitations > 0 ? (
          <Viewer invalidList={invalidList} correctedList={correctList} />
        ) : (
          <div className="mb-4">
            <p className="text-lg font-medium mt-2 text-zinc-400">
              Hooray! No issues.
            </p>
            <div className="flex flex-col space-y-4 sm:space-y-5 mt-4">
              <button
                onClick={handleScanNewDocument}
                className="px-6 sm:px-12 py-3 text-sm max-w-xs mx-auto bg-blue-800 text-white rounded-xs hover:bg-blue-800/80"
              >
                Scan new documents
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Home link at the bottom */}
      <div className="absolute bottom-8">
        <button
          onClick={handleGoHome}
          className="text-gray-500 text-sm hover:underline"
        >
          back to sights
        </button>
      </div>
    </main>
  );
};

export default Statistics;
