"use client";

import type { Metadata } from "next";
import Link from "next/link";
import TryAgainButton from "@/components/offline/try-again";
import { useLocale } from "@/context/locale-provider";

export default function OfflinePage() {
  const { t } = useLocale();
  
  return (
    <div className="flex h-[78vh] min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <svg
          className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Offline</title>
          <path
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>

      <h1 className="mb-4 font-bold text-4xl">{t.offline.title}</h1>

      <p className="mb-8 max-w-md text-gray-600 text-lg dark:text-gray-400">
        {t.offline.description}
      </p>

      <div className="space-y-4">
        <TryAgainButton />
        <div className="text-gray-500 text-sm dark:text-gray-500">
          <Link
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
            href="/"
          >
            {t.offline.returnToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
