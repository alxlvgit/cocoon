"use client";

export default function SignoutButton({ signOut }: { signOut: () => void }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 text-sm sm:py-2 sm:px-6 h-fit rounded-lg w-fit"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
