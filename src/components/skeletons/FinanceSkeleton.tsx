import React from 'react';

const FinanceSkeleton = () => (
  <div className="animate-pulse p-6 space-y-6">
    {/* Header */}
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    {/* Financial Overview Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded" />
      ))}
    </div>
    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="h-80 bg-gray-200 rounded" />
      <div className="h-80 bg-gray-200 rounded" />
    </div>
    {/* Tabs Skeleton */}
    <div className="mt-8">
      <div className="h-10 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-64 bg-gray-200 rounded w-full mb-4" />
      <div className="h-64 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

export default FinanceSkeleton;
