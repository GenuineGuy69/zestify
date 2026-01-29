import React from 'react';
import { cn } from '../../lib/utils';

// Mock instructions
const MOCK_STEPS = [
    "Toast the bread slices until golden brown.",
    "While bread is toasting, mash the avocado with lemon juice and a pinch of salt.",
    "Poach or fry the eggs to your preference (runny yolk recommended).",
    "Spread mashed avocado evenly on toasted bread.",
    "Top with eggs, sprinkle with red pepper flakes and black pepper. Serve immediately."
];

const InstructionsList = () => {
    return (
        <div className="space-y-6 relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800" />

            {MOCK_STEPS.map((step, i) => (
                <div key={i} className="relative flex gap-6">
                    <div className="flex-none w-10 h-10 rounded-full bg-white dark:bg-card-dark border-2 border-primary flex items-center justify-center z-10 shadow-sm text-primary font-bold">
                        {i + 1}
                    </div>
                    <div className="flex-1 py-1">
                        <p className="text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                            {step}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InstructionsList;
