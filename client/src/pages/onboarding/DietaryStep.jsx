import React from 'react';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../store/onboarding';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

const DIETS = [
    { id: 'vegan', label: 'Vegan', emoji: '🌱' },
    { id: 'keto', label: 'Keto', emoji: '🥩' },
    { id: 'gluten-free', label: 'Gluten Free', emoji: '🌾' },
    { id: 'vegetarian', label: 'Vegetarian', emoji: '🥕' },
    { id: 'paleo', label: 'Paleo', emoji: '🍖' },
    { id: 'pescatarian', label: 'Pescatarian', emoji: '🐟' },
];

const DietaryStep = ({ onNext, onBack }) => {
    const { preferences, toggleDietary } = useOnboardingStore();

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Dietary Preferences</h2>
                <p className="text-text-secondary-light mb-8">Select all that apply to you.</p>

                <div className="grid grid-cols-2 gap-4">
                    {DIETS.map((diet) => {
                        const isSelected = preferences.dietary.includes(diet.id);
                        return (
                            <motion.button
                                key={diet.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleDietary(diet.id)}
                                className={cn(
                                    "relative p-4 rounded-3xl border-2 text-left transition-all h-32 flex flex-col justify-between",
                                    isSelected
                                        ? "border-primary bg-primary/5 shadow-lg"
                                        : "border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark"
                                )}
                            >
                                <div className="text-3xl">{diet.emoji}</div>
                                <span className={cn("font-bold", isSelected ? "text-primary" : "text-gray-600 dark:text-gray-300")}>
                                    {diet.label}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-4 right-4 bg-primary text-black rounded-full p-1">
                                        <Check className="w-3 h-3" strokeWidth={4} />
                                    </div>
                                )}
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={onBack} className="flex-1">Back</Button>
                <Button onClick={onNext} className="flex-1">Continue</Button>
            </div>
        </div>
    );
};

export default DietaryStep;
