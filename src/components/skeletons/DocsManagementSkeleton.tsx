import React from 'react';

const DocsManagementSkeleton = () => (  
  <div className="flex animate-pulse p-6 space-x-8">
    {/* Sidebar Skeleton */}
    <div className="w-1/5 space-y-4">
      
    </div>
    {/* Main Content Skeleton */}
    <div className="flex-1 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  </div>
);

export default DocsManagementSkeleton;
