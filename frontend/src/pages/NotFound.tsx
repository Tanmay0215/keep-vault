export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Home
        </a>
      </div>
    </div>
  );
};