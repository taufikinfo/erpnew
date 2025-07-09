import React from 'react';

const ProfileSkeleton = () => (
  <div className="animate-pulse max-w-4xl mx-auto space-y-6 p-6">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="h-24 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full mb-4" />
    <div className="h-40 bg-gray-200 rounded w-full" />
  </div>
);

export default ProfileSkeleton;
