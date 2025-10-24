"use client";

const TryAgainButton = () => (
  <button
    className="cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
    onClick={() => window.location.reload()}
    type="button"
  >
    Try Again
  </button>
);

export default TryAgainButton;
