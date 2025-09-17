"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import {
  signInWithPopup,
  auth,
  provider,
  createUserWithEmailAndPassword,
} from "../../../services/firebase";

const SignIn: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToNewsletter, setAgreeToNewsletter] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Registration successful");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error: any) {
      toast.error(`${error.code}`);
    }
  };

  const handleSignupWithEmailAndPassword = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-[#1a1a2e] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-[#1a1a2e] after:via-[#0141ff6c] after:blur-2xl after:content-[''] before:dark:opacity-10 after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <div className="w-full max-w-sm p-8 space-y-3 border border-gray-600 rounded-lg shadow-lg">
        <div className="flex flex-col text-sm lg:text-lg text-center items-center mb-2">
          <span className="text-2xl font-medium">Welcome!</span>
          <span className="text-gray-600 text-base">
            Sign up to get started for free
          </span>
        </div>

        <button
          className="w-full px-4 py-2 flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-700"
          onClick={handleGoogleSignIn}
          disabled={!agreeToTerms}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>

        <div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="myname@gmail.com"
              className="w-full px-3 py-3 bg-[#020815] border border-gray-600 rounded-lg text-gray-200"
              value={email}
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
              value={password}
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
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 text-blue-600 bg-[#020815] border-gray-600 rounded focus:ring-blue-500"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-400 cursor-pointer"
            >
              I agree to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              className="w-4 h-4 text-blue-600 bg-[#020815] border-gray-600 rounded focus:ring-blue-500"
              checked={agreeToNewsletter}
              onChange={() => setAgreeToNewsletter(!agreeToNewsletter)}
            />
            <label
              htmlFor="newsletter"
              className="ml-2 text-sm text-gray-400 cursor-pointer"
            >
              I agree to receive newsletters and updates.
            </label>
          </div>
        </div>

        <button
          className="w-full px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-800/80 mt-6"
          onClick={handleSignupWithEmailAndPassword}
          disabled={!agreeToTerms}
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
