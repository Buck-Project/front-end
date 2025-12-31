<<<<<<< HEAD
// src/stores/useProfileStore.ts
=======
// src/stores/userStore/userStore.ts
>>>>>>> c6af0c5fd7bc08cb87078f213a2f3b071e5b4cbb

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "../../types/userTypes";

const useUserStore = create<UserState>()(
	persist(
<<<<<<< HEAD
		(set) => ({
			username: null,

			setUsername: (username: string) =>
				set((prev) => ({ ...prev, username })),
=======
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			profileCompleted: false, // فعلاً false، بعداً از API میاد

			setToken: (token: string) =>
				set({ token, isAuthenticated: !!token }),

			setUser: (user) =>
				set({ user }),

			setAuth: (token: string, user) =>
				set({ token, user, isAuthenticated: true }),

			setProfileCompleted: (completed: boolean) =>
				set({ profileCompleted: completed }),

			clearAuth: () =>
				set({ 
					token: null, 
					user: null, 
					isAuthenticated: false,
					profileCompleted: false 
				}),

			// Helper getters
			getUserId: () => get().user?.id || null,
			getRole: () => get().user?.role || null,
			isBrand: () => get().user?.role === 'brand',
>>>>>>> c6af0c5fd7bc08cb87078f213a2f3b071e5b4cbb
		}),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useUserStore;
