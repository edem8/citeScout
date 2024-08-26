"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Statistics: FC = () => {
  const [style, setStyle] = useState<string>("");
  const [totalCitations, setTotalCitations] = useState<number>(0);
  const [validCitations, setValidCitations] = useState<number>(0);
  const [invalidCitations, setInvalidCitations] = useState<number>(0);
  const [invalidList, setInvalidList] = useState<string[]>([]);
  const [corrected, setCorrected] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const result = localStorage.getItem("uploadResult");
    if (result) {
      const {
        style,
        totalCitations,
        validCitations,
        invalidCitations,
        invalid,
        corrected,
      } = JSON.parse(result);
      setStyle(style);
      setTotalCitations(totalCitations);
      setValidCitations(validCitations);
      setInvalidCitations(invalidCitations);
      setInvalidList(invalid || []); // Use default empty array if undefined
      setCorrected(corrected || []); // Use default empty array if undefined
    }
  }, []);

  const handleViewIssues = () => {
    router.push("/view-issues"); // Replace with the actual route to view issues
  };

  const handleScanNewDocument = () => {
    router.push("/upload"); // Replace with the actual route to upload a new document
  };

  return (
    <main className="relative flex min-h-screen flex-col items-start justify-center px-10">
      <div className="text-zinc-700 dark:text-zinc-600 text-2xl font-bold mb-8 ml-40">
        Statistics
      </div>
      <div className="w-[400px] ml-40">
        <div className="bg-white dark:bg-[#1a1a2e31] shadow-lg rounded-xl border border-gray-300 dark:border-neutral-800 p-6">
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-bold">
                Citation style
              </span>
              <span className="text-gray-900 dark:text-zinc-400">{style}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-bold">
                Total citations
              </span>
              <span className="text-gray-900 dark:text-zinc-400">
                {totalCitations}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-bold">
                Valid citations
              </span>
              <span className="text-gray-900 dark:text-zinc-400">
                {validCitations}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-bold">
                Invalid citations
              </span>
              <span className="text-gray-900 dark:text-zinc-400">
                {invalidCitations}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ml-40 mt-8 flex space-x-4">
        {invalidCitations > 0 ? (
          <button
            onClick={handleViewIssues}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
          >
            view all issues
          </button>
        ) : (
          <button
            onClick={handleScanNewDocument}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-800"
          >
            scan new documents
          </button>
        )}
      </div>
    </main>
  );
};

export default Statistics;
