import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import TopBar from '../components/layout/TopBar';
import FilterChips from '../components/home/FilterChips';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeSkeleton from '../components/ui/RecipeSkeleton';
import { MOCK_RECIPES } from '../data/mockRecipes';
import { cn } from '../lib/utils';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const navigate = useNavigate();

    const filteredRecipes = activeFilter === 'All'
        ? MOCK_RECIPES
        : MOCK_RECIPES.filter(r =>
            r.dietary_tags.map(t => t.toLowerCase()).includes(activeFilter.toLowerCase()) ||
            r.meal_type.toLowerCase() === activeFilter.toLowerCase()
        );

    return (
        <MobileContainer>
            <TopBar />

            <div className="flex flex-col gap-6 w-full">
                {/* Filter Section */}
                <div className="w-full">
                    <FilterChips
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />
                </div>

                {/* Recommended Header - Only show on All */}
                {activeFilter === 'All' && (
                    <div className="px-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            Recommended for You
                        </h2>
                        <button className="text-primary text-sm font-semibold hover:underline">
                            See All
                        </button>
                    </div>
                )}

                {/* Recipe Grid */}
                <div className="px-6 grid grid-cols-1 gap-6 pb-6">
                    {/* Simulating loading state for demonstration */}
                    {false ? (
                        [1, 2, 3].map((i) => <RecipeSkeleton key={i} />)
                    ) : filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onClick={() => navigate(`/recipes/${recipe.id}`)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>No recipes found for "{activeFilter}"</p>
                            <button
                                onClick={() => setActiveFilter('All')}
                                className="text-primary font-bold mt-2"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MobileContainer>
    );
};

export default Home;
