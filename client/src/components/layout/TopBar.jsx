import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

const TopBar = ({ showSearch = true }) => {
    return (
        <header className="sticky top-0 z-40 w-full px-6 pt-6 pb-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                        Good Morning,
                    </p>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
                            Alex! 👋
                        </h1>
                    </div>
                </div>
                <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary p-0.5">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                        alt="Profile"
                        className="w-full h-full rounded-full bg-gray-200"
                    />
                </button>
            </div>

            {showSearch && (
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search recipes, ingredients..."
                        className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white dark:bg-card-dark border border-transparent focus:border-primary focus:ring-0 text-text-primary-light dark:text-text-primary-dark shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all placeholder:text-gray-400"
                    />
                    <button className="absolute inset-y-0 right-2 w-10 h-10 my-auto flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>
            )}
        </header>
    );
};

export default TopBar;
