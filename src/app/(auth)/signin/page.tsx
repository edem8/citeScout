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
          router.replace("/");
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
    <div className="flex items-center justify-center  min-h-screen">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-[#1a1a2e] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-[#1a1a2e] after:via-[#0141ff6c] after:blur-2xl after:content-[''] before:dark:opacity-10 after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <div className="w-full max-w-sm p-8 space-y-3 rounded-lg shadow-lg border border-gray-600">
        <div className="flex flex-col text-sm lg:text-lg text-center items-center mb-2">
          <span className="text-2xl font-medium">Welcome Back!</span>
          <span className="text-gray-600 text-base">
            Sign into your account to get started
          </span>
        </div>
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

          <div className="text-right mb-1">
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          className="w-full px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-800/80"
          onClick={handleEmailSignIn}
        >
          Sign In
        </button>
        <p className="mt-2 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
