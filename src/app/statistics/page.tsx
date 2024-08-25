"use client";

export default function Statistics() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 ">
        <div> statistics</div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1A1A2E] shadow-lg rounded-xl border border-gray-300 dark:border-neutral-700 p-6">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-bold">
                  Citation style
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  APA 7th edition
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-bold">
                  Total citations
                </span>
                <span className="text-gray-900 dark:text-gray-100">24</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-bold">
                  Valid citations
                </span>
                <span className="text-gray-900 dark:text-gray-100">3</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-bold">
                  Invalid citations
                </span>
                <span className="text-gray-900 dark:text-gray-100">19</span>
              </li>
            </ul>
          </div>
        </div>

    
    </main>
  );
}
