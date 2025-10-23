import TryAgainButton from "@/components/offline/try-again";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are currently offline",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center h-[78vh] justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <svg
          className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Offline</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4">You're Offline</h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        It looks like you've lost your internet connection. Some features may
        not be available until you're back online.
      </p>

      <div className="space-y-4">
        <TryAgainButton />
        <div className="text-sm text-gray-500 dark:text-gray-500">
          <Link
            href="/"
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
