import React from 'react';

const FaqManagementSkeleton = () => (
  <div className="animate-pulse p-6 space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="h-10 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded" />
      ))}
    </div>
  </div>
);

export default FaqManagementSkeleton;
