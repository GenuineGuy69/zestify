import React from 'react';
import { Card } from '../ui/Card';
import { Heart, Flame, Clock, Leaf, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const RecipeCard = ({ recipe, onClick }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const DifficultyIcon = {
        easy: Leaf,
        medium: BarChart2,
        hard: Flame,
    }[recipe.difficulty.toLowerCase()] || Leaf;

    const difficultyColor = {
        easy: 'text-status-success',
        medium: 'text-status-warning',
        hard: 'text-status-error',
    }[recipe.difficulty.toLowerCase()] || 'text-status-success';

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
        >
            <Card
                className="cursor-pointer group h-full flex flex-col"
                onClick={onClick}
            >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFavorite(!isFavorite);
                            }}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white hover:bg-white/30 transition-colors"
                        >
                            <Heart
                                className={cn("w-5 h-5", isFavorite ? "fill-red-500 text-red-500" : "text-white")}
                            />
                        </motion.button>

                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-xs font-bold text-gray-900">{recipe.calories} kcal</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark line-clamp-2 leading-tight">
                        {recipe.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark mt-auto">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.total_time} min</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <div className="flex items-center gap-1.5">
                            <DifficultyIcon className={cn("w-4 h-4", difficultyColor)} />
                            <span className="capitalize">{recipe.difficulty}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default RecipeCard;
