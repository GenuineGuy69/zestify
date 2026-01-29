import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const FILTERS = [
    'All',
    'Vegan',
    'Keto',
    'Gluten-Free',
    'High Protein',
    'Paleo',
    'Indian',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks'
];

const FilterChips = ({ activeFilter = 'All', onFilterChange }) => {
    const scrollRef = useRef(null);

    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto pb-4 pt-2 px-6 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                        <motion.button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all snap-start whitespace-nowrap",
                                isActive
                                    ? "bg-primary text-black shadow-[0_4px_12px_rgba(19,236,19,0.4)]"
                                    : "bg-white dark:bg-card-dark text-text-secondary-light dark:text-gray-400 border border-border-light dark:border-border-dark"
                            )}
                        >
                            {filter}
                        </motion.button>
                    );
                })}
            </div>
            {/* Fade overlay on the right */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent pointer-events-none" />
        </div>
    );
};

export default FilterChips;
