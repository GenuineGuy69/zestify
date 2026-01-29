import React from 'react';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../store/onboarding';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Ban } from 'lucide-react';

const COMMON_ALLERGENS = [
    'Nuts', 'Dairy', 'Eggs', 'Soy', 'Shellfish', 'Wheat'
];

const AllergiesStep = ({ onNext, onBack }) => {
    const { preferences } = useOnboardingStore();
    const [selected, setSelected] = React.useState([]);

    const toggle = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Any Allergies?</h2>
                <p className="text-text-secondary-light mb-8">We'll filter these out completely.</p>

                <div className="flex flex-wrap gap-3">
                    {COMMON_ALLERGENS.map((item) => {
                        const isSelected = selected.includes(item);
                        return (
                            <motion.button
                                key={item}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggle(item)}
                                className={cn(
                                    "px-6 py-3 rounded-full border-2 font-medium transition-all flex items-center gap-2",
                                    isSelected
                                        ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20"
                                        : "border-gray-200 dark:border-gray-800"
                                )}
                            >
                                {isSelected && <Ban className="w-4 h-4" />}
                                {item}
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={onBack} className="flex-1">Back</Button>
                <Button onClick={onNext} className="flex-1">
                    {selected.length === 0 ? "No Allergies" : "Finish"}
                </Button>
            </div>
        </div>
    );
};

export default AllergiesStep;
