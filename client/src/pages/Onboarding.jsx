import React from 'react';
import MobileContainer from '../components/layout/MobileContainer';
import WelcomeStep from './onboarding/WelcomeStep';
import DietaryStep from './onboarding/DietaryStep';
import GoalsStep from './onboarding/GoalsStep';
import AllergiesStep from './onboarding/AllergiesStep';
import { useOnboardingStore } from '../store/onboarding';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const { step, setStep } = useOnboardingStore();
    const navigate = useNavigate();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const finish = () => navigate('/register');

    const getStepComponent = () => {
        switch (step) {
            case 0: return <WelcomeStep onNext={nextStep} />;
            case 1: return <DietaryStep onNext={nextStep} onBack={prevStep} />;
            case 2: return <GoalsStep onNext={nextStep} onBack={prevStep} />;
            case 3: return <AllergiesStep onNext={finish} onBack={prevStep} />;
            default: return null;
        }
    };

    return (
        <MobileContainer showNav={false} className="bg-white dark:bg-background-dark">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                >
                    {getStepComponent()}
                </motion.div>
            </AnimatePresence>
        </MobileContainer>
    );
};

export default Onboarding;
