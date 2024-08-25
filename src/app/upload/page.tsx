"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const [style, setStyle] = useState("APA 7th edition");
  const [file, setFile] = useState<File | null>(null);

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Prepare form data to send
    const formData = new FormData();
    formData.append("style", style);
    formData.append("file", file);

    const uploadPromise = fetch(
      process.env.NEXT_PUBLIC_APP_AI_MICROSERVICE || "",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // Handle successful upload (e.g., redirect or display result)
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        throw new Error(error.message || "Upload failed");
      });

    toast.promise(uploadPromise, {
      loading: "Submitting...",
      success: (data) => `${data.filename} submitted`,
      error: (error) => `Error: ${error.message || error}`,
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 ">
      <div className="max-w-md w-full">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <h1 className="text-2xl font-bold mb-10">Upload Document</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="style"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Citation Style
            </label>
            <select
              id="style"
              value={style}
              onChange={handleStyleChange}
              className="mt-2 px-2 block w-full bg-gray-800 text-white border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-12"
            >
              <option value="APA 7th edition">APA 7th edition</option>
              <option value="MLA edition">MLA edition</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Doc
            </label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-700 dark:file:text-gray-300 dark:file:border-gray-600 dark:file:hover:bg-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-800 text-white rounded-lg font-bold cursor-pointer hover:bg-blue-600 mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
