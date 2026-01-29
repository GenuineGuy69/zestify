import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const CircularProgress = ({ value, max, label, subLabel, color, size = 'md' }) => {
    const radius = size === 'lg' ? 36 : 24;
    const stroke = size === 'lg' ? 6 : 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;

    const sizeClasses = {
        lg: 'w-24 h-24 text-sm',
        md: 'w-16 h-16 text-xs',
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={cn("relative flex items-center justify-center font-bold", sizeClasses[size])}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="rotate-[-90deg]"
                >
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="text-gray-100 dark:text-gray-800"
                    />
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        stroke={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeLinecap: 'round' }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-text-primary-light dark:text-text-primary-dark">{value}</span>
                    {size === 'lg' && <span className="text-[10px] font-normal text-gray-400">Kcal</span>}
                </div>
            </div>
            <div className="flex flex-col items-center">
                {size !== 'lg' && <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{value}g</span>}
                <span className="text-gray-400 text-xs">{label}</span>
            </div>
        </div>
    );
};

const NutritionRings = ({ nutrition }) => {
    return (
        <div className="flex items-center justify-between px-4 py-6 bg-white dark:bg-card-dark rounded-4xl shadow-sm">
            <CircularProgress
                value={nutrition.calories}
                max={800}
                label="Calories"
                color="#13ec13" // Primary
                size="lg"
            />
            <div className="w-px h-12 bg-gray-100 dark:bg-gray-800" />
            <CircularProgress
                value={nutrition.protein}
                max={50}
                label="Protein"
                color="#13ec13"
            />
            <CircularProgress
                value={nutrition.carbs}
                max={100}
                label="Carbs"
                color="#13ec13"
            />
            <CircularProgress
                value={nutrition.fats}
                max={50}
                label="Fats"
                color="#13ec13"
            />
        </div>
    );
};

export default NutritionRings;
