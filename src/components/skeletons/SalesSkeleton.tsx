import React from 'react';

const SalesSkeleton = () => (
  <div className="animate-pulse p-6 space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded" />
      ))}
    </div>
    <div className="h-10 bg-gray-200 rounded w-1/2 mt-8 mb-4" />
    <div className="h-64 bg-gray-200 rounded w-full mb-4" />
    <div className="h-64 bg-gray-200 rounded w-full" />
  </div>
);

export default SalesSkeleton;
