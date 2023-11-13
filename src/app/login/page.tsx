import React from "react";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-blue-100 shadow-md rounded px-12 pt-8 py-14 pb-8   flex flex-col mb-32">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-gray-600 text-center mb-8">Welcome back to Cocoon</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Enter Email or Username
          </label>
          <input
            className="shadow appearance-none rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email or Username"
          />
        </div>

       

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Enter Password
          </label>
          <input
            className="shadow appearance-none  rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center ml-16">
          <button
            className="border-2 border-black hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login
          </button>
        </div>
        <div className="ml-6 mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/signUp" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
