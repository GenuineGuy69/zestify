import React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'bg-card-light dark:bg-card-dark rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden transition-all hover:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.08)]',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';
export { Card };
