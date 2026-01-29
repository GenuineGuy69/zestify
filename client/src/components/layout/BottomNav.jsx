import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Plus, Heart, User, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: UtensilsCrossed, label: 'Recipes', path: '/recipes' },
        { icon: Plus, label: 'Add', path: '/add', isCenter: true },
        { icon: Heart, label: 'Favorites', path: '/favorites' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(448px-48px)]">
            <div className="glass shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-4xl h-20 flex items-center justify-between px-2 relative dark:glass-dark dark:border-white/5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300',
                                item.isCenter ? '-translate-y-8' : ''
                            )
                        }
                    >
                        {({ isActive }) => {
                            if (item.isCenter) {
                                return (
                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(19,236,19,0.4)]"
                                    >
                                        <Sparkles className="text-black w-8 h-8" />
                                    </motion.div>
                                );
                            }
                            return (
                                <>
                                    <item.icon
                                        className={cn(
                                            'w-6 h-6 transition-colors duration-300',
                                            isActive
                                                ? 'text-primary fill-primary/20'
                                                : 'text-gray-400 dark:text-gray-500'
                                        )}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-dot"
                                            className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                                        />
                                    )}
                                </>
                            );
                        }}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
