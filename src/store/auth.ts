import { defineStore } from "pinia";

interface User {
    id: number,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
    }),
    actions: {
        setAuth(token: string, user: User) {
            this.token = token;
            this.user = user;
            localStorage.setItem('auth_token', token);
        },
        clearAuth() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('auth_token');
        }
    },
    persist: true,
})
