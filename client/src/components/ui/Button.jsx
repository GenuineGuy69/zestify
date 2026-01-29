import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const variants = {
        primary: 'bg-primary text-black font-bold shadow-[0_4px_16px_rgba(19,236,19,0.4)] hover:shadow-[0_6px_20px_rgba(19,236,19,0.6)]',
        secondary: 'bg-white dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark',
        ghost: 'bg-transparent text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/5',
        icon: 'p-0 flex items-center justify-center rounded-full aspect-square',
    };

    const sizes = {
        default: 'h-12 px-6 rounded-xl',
        sm: 'h-9 px-4 rounded-lg text-sm',
        lg: 'h-14 px-8 rounded-2xl text-lg',
        icon: 'h-12 w-12',
    };

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
});

Button.displayName = 'Button';
export { Button };
