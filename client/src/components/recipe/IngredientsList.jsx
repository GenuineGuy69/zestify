import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock ingredients since they weren't in the main mock object originally
const MOCK_INGREDIENTS = [
    { name: 'Whole Grain Bread', qty: '2 Slices' },
    { name: 'Ripe Avocado', qty: '1 Whole' },
    { name: 'Large Eggs', qty: '2 count' },
    { name: 'Red Pepper Flakes', qty: 'Pinch' },
    { name: 'Lemon Juice', qty: '1 tsp' },
];

const IngredientsList = () => {
    const [checked, setChecked] = useState([]);

    const toggle = (index) => {
        if (checked.includes(index)) {
            setChecked(checked.filter(i => i !== index));
        } else {
            setChecked([...checked, index]);
        }
    };

    return (
        <div className="space-y-3">
            {MOCK_INGREDIENTS.map((ing, i) => {
                const isChecked = checked.includes(i);
                return (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggle(i)}
                        className={cn(
                            "w-full flex items-center justify-between p-4 rounded-3xl transition-all",
                            isChecked
                                ? "bg-primary/5 border border-primary/20"
                                : "bg-white dark:bg-card-dark border border-transparent shadow-sm"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                isChecked ? "bg-primary border-primary" : "border-gray-300 dark:border-gray-600"
                            )}>
                                {isChecked && <Check className="w-3 h-3 text-black" strokeWidth={4} />}
                            </div>
                            <span className={cn(
                                "font-medium transition-colors",
                                isChecked ? "text-gray-400 line-through" : "text-text-primary-light dark:text-text-primary-dark"
                            )}>
                                {ing.name}
                            </span>
                        </div>
                        <span className={cn(
                            "text-sm font-semibold",
                            isChecked ? "text-gray-400" : "text-primary"
                        )}>
                            {ing.qty}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default IngredientsList;
