export const LoadingSkeleton = () => (
  <div className="flex flex-col items-center space-y-8 animate-pulse">
    <div className="h-8 bg-gray-300 rounded-lg w-48"></div>
    <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
    <div className="h-4 bg-gray-300 rounded w-64"></div>
  </div>
); 