"use client";

import Loader from "@/components/loader";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

interface UploadResult {
  filename: string;
  style: string;
  citations: string[];
  Total: number;
  valid: string[];
  validCount: number;
  invalid: string[];
  invalidCount: number;
  corrected: string[];
}

const UploadPage: React.FC = () => {
  const [style, setStyle] = useState<string>("APA 7th edition");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStyle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("style", style);
    formData.append("file", file);

    const uploadPromise = fetch(process.env.NEXT_PUBLIC_AI_MICROSERVICE || "", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result: UploadResult) => {
        console.log(result);

        localStorage.setItem(
          "uploadResult",
          JSON.stringify({
            style: result.style,
            totalCitations: result.Total,
            validCitations: result.validCount,
            invalidCitations: result.invalidCount,
            invalid: result.invalid,
            correct: result.corrected,
          })
        );

        router.push("/statistics");
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

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ">
      <div className="w-full max-w-md px-4 py-6 shadow-md rounded-lg ">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-white">
          Upload Document
        </h1>
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-[#1a1a2e] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-[#1a1a2e] after:via-[#0141ff6c] after:blur-2xl after:content-[''] before:dark:opacity-10 after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
          <div>
            <label
              htmlFor="style"
              className="block text-sm font-medium text-gray-300"
            >
              Citation Style
            </label>
            <select
              id="style"
              value={style}
              onChange={handleStyleChange}
              className="mt-2 px-3 block w-full bg-gray-800 text-white border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-12"
            >
              <option value="APA 7th edition">APA 7th edition</option>
              <option value="MLA 9th edition">MLA 9th edition</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-300"
            >
              Select Doc
            </label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-600 file:rounded-md file:text-sm file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
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
};

export default UploadPage;
