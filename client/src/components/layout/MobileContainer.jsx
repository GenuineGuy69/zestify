import React from 'react';
import { cn } from '../../lib/utils';
import BottomNav from './BottomNav';

const MobileContainer = ({ children, showNav = true, className }) => {
    return (
        <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex justify-center">
            <div className={cn("w-full max-w-[448px] bg-background-light dark:bg-background-dark relative shadow-2xl min-h-screen flex flex-col", className)}>
                <main className="flex-1 pb-28">
                    {children}
                </main>
                {showNav && <BottomNav />}
            </div>
        </div>
    );
};

export default MobileContainer;
