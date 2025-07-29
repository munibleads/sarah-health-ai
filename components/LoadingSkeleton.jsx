export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="text-center space-y-3">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mx-auto w-1/2"></div>
      </div>
      
      {/* Status indicators */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md flex-1"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md flex-1"></div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="space-y-4">
        <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        </div>
      </div>
      
      {/* Action button skeleton */}
      <div className="flex justify-center pt-4">
        <div className="h-14 w-48 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 rounded-full"></div>
      </div>
      
      {/* Loading text */}
      <div className="text-center">
        <p className="text-sm text-gray-500 animate-bounce">
          Initializing Voice AI...
        </p>
      </div>
    </div>
  );
}; 