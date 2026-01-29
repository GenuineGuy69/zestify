import React from 'react';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../store/onboarding';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ArrowRight, Check, Dumbbell, Heart, Tangent } from 'lucide-react';

const GOALS = [
    { id: 'weight-loss', label: 'Lose Weight', icon: Tangent, desc: 'shed pounds sustainably' },
    { id: 'muscle-gain', label: 'Gain Muscle', icon: Dumbbell, desc: 'build strength & mass' },
    { id: 'health', label: 'Eat Healthy', icon: Heart, desc: 'improve overall well-being' },
];

const GoalsStep = ({ onNext, onBack }) => {
    const { preferences, setGoal } = useOnboardingStore();

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">What's your goal?</h2>
                <p className="text-text-secondary-light mb-8">We'll personalize your recommendations.</p>

                <div className="flex flex-col gap-4">
                    {GOALS.map((goal) => {
                        const isSelected = preferences.goals.includes(goal.id);
                        return (
                            <motion.button
                                key={goal.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setGoal(goal.id)}
                                className={cn(
                                    "relative p-6 rounded-4xl border-2 text-left transition-all flex items-center gap-4",
                                    isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center",
                                    isSelected ? "bg-primary text-black" : "bg-gray-100 dark:bg-gray-800"
                                )}>
                                    <goal.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{goal.label}</h3>
                                    <p className="text-sm text-gray-500">{goal.desc}</p>
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-black" strokeWidth={3} />
                                    </div>
                                )}
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={onBack} className="flex-1">Back</Button>
                <Button onClick={onNext} className="flex-1" disabled={preferences.goals.length === 0}>Continue</Button>
            </div>
        </div>
    );
};

export default GoalsStep;
