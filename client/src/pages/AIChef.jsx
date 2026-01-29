import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ChefHat, ArrowRight } from 'lucide-react';
import MobileContainer from '../components/layout/MobileContainer';
import { Button } from '../components/ui/Button';
import RecipeCard from '../components/recipe/RecipeCard';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const AIChef = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setGeneratedRecipe(null);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    cuisine: 'Any', // Could be dynamic
                    dietary_tags: [] // Could be from user prefs
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Generation failed');

            // Ensure Image URL is valid (Mock for now if AI doesn't return one or return placeholder)
            if (!data.image_url) {
                // Use a generic placeholder if AI didn't provide one
                data.image_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000';
            }

            setGeneratedRecipe(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MobileContainer>
            <div className="p-6 h-full flex flex-col overflow-y-auto hidden-scrollbar pb-24">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                        AI Chef
                    </h1>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        What are you craving today?
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A high-protein breakfast with avocados and eggs..."
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors h-32 resize-none mb-4"
                    />

                    <Button
                        onClick={handleGenerate}
                        className="w-full relative overflow-hidden"
                        size="lg"
                        disabled={isLoading || !prompt.trim()}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Designing Recipe...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <ChefHat className="w-5 h-5" />
                                <span>Generate Recipe</span>
                            </div>
                        )}
                    </Button>

                    {error && (
                        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
                    )}
                </div>

                {generatedRecipe && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Here's your recipe!</h2>
                            <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-full">
                                AI Generated
                            </span>
                        </div>
                        <RecipeCard
                            recipe={generatedRecipe}
                            onClick={() => {
                                // For now, we can just show it here or navigate if saved.
                                // Since it's dynamic, navigation might be tricky unless saved to state/db.
                                // Let's just create a simple "View Details" simulation or alert
                                alert('In a full app, this would save to DB and navigate to details!');
                            }}
                        />
                    </motion.div>
                )}

                {!generatedRecipe && !isLoading && (
                    <div className="text-center text-gray-400 mt-10">
                        <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Describe ingredients or a meal idea<br />and let AI do the magic.</p>
                    </div>
                )}
            </div>
        </MobileContainer>
    );
};

export default AIChef;
