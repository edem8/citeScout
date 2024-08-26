import React, { useState } from "react";

interface ViewerProps {
  invalidList: string[];
  correctedList: string[];
}

const Viewer: React.FC<ViewerProps> = ({
  invalidList,
  correctedList,
}) => {
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);

  const totalIssues = invalidList.length;

  const handlePreviousIssue = () => {
    if (currentIssueIndex > 0) {
      setCurrentIssueIndex(currentIssueIndex - 1);
    }
  };

  const handleNextIssue = () => {
    if (currentIssueIndex < totalIssues - 1) {
      setCurrentIssueIndex(currentIssueIndex + 1);
    }
  };

  return (
    <div className="flex  items-center justify-center">
      <div className="bg-white dark:bg-[#1a1a2e31] shadow-lg rounded-xl border border-gray-300 dark:border-neutral-800 p-6 w-[400px] space-y-6">
        {/* Issue Tracker */}
        <div className="text-center text-gray-700 dark:text-zinc-400 text-lg font-semibold">
          Issue {currentIssueIndex + 1} of {totalIssues}
        </div>

        {/* Strike-through and Corrected Texts */}
        <div className="space-y-4">
          <div className="text-red-400 line-through font-bold text-lg">
            {invalidList[currentIssueIndex]}
          </div>
          <div className="text-green-500 text-xl font-bold">
            {correctedList[currentIssueIndex]}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousIssue}
            disabled={currentIssueIndex === 0}
            className={`px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 ${
              currentIssueIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            View Previous Issue
          </button>
          <button
            onClick={handleNextIssue}
            disabled={currentIssueIndex === totalIssues - 1}
            className={`px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 ${
              currentIssueIndex === totalIssues - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            View Next Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
