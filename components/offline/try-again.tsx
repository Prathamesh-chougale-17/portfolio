"use client";

const TryAgainButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="px-6 py-3 cursor-pointer bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
    >
      Try Again
    </button>
  );
};

export default TryAgainButton;
