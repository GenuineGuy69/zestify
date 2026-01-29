import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
    step: 0,
    preferences: {
        dietary: [],
        goals: [],
        allergies: [],
        calories: 2000,
    },
    setStep: (step) => set({ step }),
    toggleDietary: (tag) => set((state) => {
        const dietary = state.preferences.dietary.includes(tag)
            ? state.preferences.dietary.filter((t) => t !== tag)
            : [...state.preferences.dietary, tag];
        return { preferences: { ...state.preferences, dietary } };
    }),
    setGoal: (goal) => set((state) => ({ preferences: { ...state.preferences, goals: [goal] } })),
    // Add more actions as needed
}));
