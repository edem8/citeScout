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
  const [viewIssues, setViewIssues] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<true | false>(true);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!loading && !user) {
        router.push("/");
      }
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, [loading, user, router]);

  useEffect(() => {
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
  }, []);

  const handleViewIssues = () => {
    setViewIssues(true);
  };

  const handleScanNewDocument = () => {
    router.push("/upload");
  };

  if (loading || showLoader) {
    return <Loader />;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-md sm:max-w-lg mb-8">
        <div className="text-zinc-500 text-2xl font-bold mb-8 text-center">
          Statistics
        </div>
        <div className="shadow-lg rounded-xl border border-[#2c2c3a] p-6">
          {totalCitations === 0 ? (
            <div className="text-center">
              <p className="text-zinc-400 mb-4">
                Sorry:) No related citations in this document.
              </p>
              <button
                onClick={handleScanNewDocument}
                className="px-6 sm:px-12 py-2 max-w-xs mx-auto bg-blue-800 text-white rounded-lg hover:bg-blue-700"
              >
                Scan new documents
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-zinc-200 font-bold">Citation style</span>
                <span className="text-zinc-400">{style}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-200 font-bold">Total citations</span>
                <span className="text-zinc-400">{totalCitations}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-200 font-bold">Valid citations</span>
                <span className="text-zinc-400">{validCitations}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-200 font-bold">
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
        {totalCitations === 0 ? null : !viewIssues ? (
          <>
            <div className="mb-4">
              <img
                src="/images/cloud-data.png"
                alt="Cloud Data"
                width={200}
                height={200}
                className="mx-auto"
              />
              <p className="text-lg font-medium mt-2 text-zinc-400">
                {invalidCitations > 0
                  ? "Citation issues detected in the document."
                  : "Hooray 🎉, no issues with your document."}
              </p>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-5">
              {invalidCitations > 0 ? (
                <button
                  onClick={handleViewIssues}
                  className="px-6 sm:px-12 py-2 max-w-xs mx-auto bg-blue-800 text-white rounded-lg hover:bg-blue-700"
                >
                  View citation issues
                </button>
              ) : (
                <button
                  onClick={handleScanNewDocument}
                  className="px-6 sm:px-12 py-2 max-w-xs mx-auto bg-blue-800 text-white rounded-lg hover:bg-blue-700"
                >
                  Scan new documents
                </button>
              )}
            </div>
          </>
        ) : (
          <Viewer invalidList={invalidList} correctedList={correctList} />
        )}
      </div>
    </main>
  );
};

export default Statistics;
