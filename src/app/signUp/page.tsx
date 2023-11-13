import React from "react";
import Link from "next/link"; 

const SignUpPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-blue-100 shadow-md rounded px-12 pt-8 py-14 pb-8 mb-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <p className="text-gray-600 text-center mb-8">Welcome to Cocoon</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
            Enter your name
          </label>
          <input
            className="shadow appearance-none rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Enter Email
          </label>
          <input
            className="shadow appearance-none rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter Email Address"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="username"
          >
            Enter an Username
          </label>
          <input
            className="shadow appearance-none rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Create a Username"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Enter a Strong Password
          </label>
          <input
            className="shadow appearance-none  rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password-confirm"
          >
            Re-enter Password
          </label>
          <input
            className="shadow appearance-none border placeholder-black rounded-3xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="password-confirm"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <div className="flex items-center ml-16">
          <button
            className="border-2 border-black hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </div>
        <div className="ml-6 mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
