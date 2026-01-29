import React from 'react';

const RecipeSkeleton = () => {
    return (
        <div className="rounded-4xl overflow-hidden bg-white dark:bg-card-dark shadow-sm h-full flex flex-col animate-pulse">
            <div className="h-56 bg-gray-200 dark:bg-gray-700 w-full relative">
                <div className="absolute top-4 right-4 w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="flex items-center gap-4 mt-auto pt-4">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    );
};

export default RecipeSkeleton;
