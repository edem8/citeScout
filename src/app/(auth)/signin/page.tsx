"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
} from "@/services/firebase";

const SignIn: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Registration successful");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      toast.error(`${error.code}`);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        toast.success("Sigin successful");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.code);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Sign In
        </h2>

        <button
          className="w-full px-4 py-2 flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-700"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>

        <div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="myname@gmail.com"
              className="w-full px-3 py-3 bg-[#020815] border border-gray-600 rounded-lg text-gray-200"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-3 bg-[#020815] border border-gray-600 rounded-lg text-gray-100 pr-10"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-sm text-indigo-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          onClick={handleEmailSignIn}
        >
          Sign In
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
