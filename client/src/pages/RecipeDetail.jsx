import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_RECIPES } from '../data/mockRecipes';
import MobileContainer from '../components/layout/MobileContainer';
import NutritionRings from '../components/recipe/NutritionRings';
import IngredientsList from '../components/recipe/IngredientsList';
import InstructionsList from '../components/recipe/InstructionsList';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Heart, Clock, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ingredients');

    // Find recipe or default to first if not found (for testing)
    const recipe = MOCK_RECIPES.find(r => r.id === id) || MOCK_RECIPES[0];

    return (
        <MobileContainer showNav={false} className="bg-background-light dark:bg-background-dark">
            {/* Hero Header */}
            <div className="relative h-80 w-full">
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-light dark:to-background-dark" />

                {/* Navigation */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Heart className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-6 -mt-10 relative z-10 space-y-6 pb-24">

                {/* Title Block */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider backdrop-blur-sm">
                        <Clock className="w-3 h-3" />
                        {recipe.total_time} MINS
                        <span>•</span>
                        <Leaf className="w-3 h-3" />
                        {recipe.difficulty}
                    </div>
                    <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
                        {recipe.title}
                    </h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                        {recipe.description}
                    </p>
                </div>

                {/* Nutrition Rings */}
                <NutritionRings nutrition={recipe.nutrition} />

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                    {['ingredients', 'instructions'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all capitalize ${activeTab === tab
                                    ? 'bg-primary text-black shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'ingredients' ? <IngredientsList /> : <InstructionsList />}
                </motion.div>
            </div>

            {/* Sticky CTA */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[448px] p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pointer-events-none">
                <Button className="w-full pointer-events-auto shadow-2xl skew-y-0" size="lg">
                    <span className="mr-2">♨️</span> Start Cooking
                </Button>
            </div>
        </MobileContainer>
    );
};

export default RecipeDetail;
