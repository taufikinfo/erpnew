import React from 'react';

const SettingsSkeleton = () => (
  <div className="animate-pulse p-6 space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="h-10 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full" />
  </div>
);

export default SettingsSkeleton;
