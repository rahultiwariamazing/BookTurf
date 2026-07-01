/**
 * Lightweight user session store for authentication and profile data.
 *
 * This store currently uses local mock behavior and can be swapped with
 * API-backed actions without changing consumer components.
 */
import { create } from 'zustand';
import { User } from '../types/schema';

interface UserState {
    user: User | null;
    login: (phone: string) => void;
    updateProfile: (data: Partial<User>) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    // Creates a local user session from a verified phone number.
    login: (phone) => set({
        user: {
            id: 'u-current',
            phone,
            email: null,
            name: null,
            photoUrl: null,
            city: null,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updatedBy: null,
            isDeleted: false
        }
    }),
    // Applies partial profile updates while preserving existing fields.
    updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
    })),
    logout: () => set({ user: null })
}));
