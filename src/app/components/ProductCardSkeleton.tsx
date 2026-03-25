import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-200 aspect-square"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
