import React from 'react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const WelcomeStep = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full flex-1 flex items-center justify-center"
            >
                <div className="w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                    <img src="/logo.png" alt="Zestify Logo" className="w-32 h-32 object-contain" />
                </div>
            </motion.div>

            <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-extrabold text-primary">Zestify</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                    Your personalized path to healthy eating.
                    <br />
                    Let's get to know your taste!
                </p>
            </div>

            <Button onClick={onNext} className="w-full" size="lg">
                Get Started
            </Button>
        </div>
    );
};

export default WelcomeStep;
