"use client";

import { useState, FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "@/services/firebase";
import { auth } from "@/services/firebase";

const ForgotPassword: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("check your mail");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Password Reset
        </h2>
        <p className="text-center text-sm text-gray-400">
          Enter the email you used in signing up. We will send you instructions
          to help reset your password.
        </p>

        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Email</label>
          <input
            type="email"
            placeholder="myname@gmail.com"
            className="w-full px-3 py-3 bg-[#020815] border border-gray-600 rounded-lg text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          onClick={handlePasswordReset}
        >
          Reset Password
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Remember password?{" "}
          <a href="/signin" className="text-indigo-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
