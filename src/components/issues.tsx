import React, { useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

interface ViewerProps {
  invalidList: string[];
  correctedList: string[];
}

const Viewer: React.FC<ViewerProps> = ({ invalidList, correctedList }) => {
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
    <div className="flex items-center justify-center">
      <div className="shadow-lg rounded-xl border-none border-[#2c2c2c] p-6 w-[400px] space-y-6">
        <div className="flex items-center justify-center text-gray-400 text-lg font-medium">
          <FaCircleArrowLeft
            onClick={handlePreviousIssue}
            className={`w-6 h-6 cursor-pointer ${
              currentIssueIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <div className="mx-4 text-sm">
            {currentIssueIndex + 1} / {totalIssues}
          </div>
          <FaCircleArrowRight
            onClick={handleNextIssue}
            className={`w-6 h-6 cursor-pointer ${
              currentIssueIndex === totalIssues - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <div className="text-red-400 line-through font-semibold text-base">
            {invalidList[currentIssueIndex]}
          </div>
          <div className="text-green-400 text-lg font-semibold">
            {correctedList[currentIssueIndex]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
