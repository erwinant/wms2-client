import { defineStore } from 'pinia';
import AuthApi from 'src/api/auth.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null,
    }),

    persist: true,

    getters: {
        isLoggedIn: (state) => !!state.token,
        isSuperadmin(state) {
            return state.user?.roles?.includes('superadmin');
        },
    },

    actions: {
        /**
         * logout reset app store
         */
        async login(payload) {
            try {
                const { data } = await AuthApi.signIn(payload);
                this.setToken(data.access_token);
                this.setUser({ ...data, ...{ access_token: undefined } });
                return true;
            } catch (err) {
                throw 'Unauthorize Account';
            }
        },
        logout() {
            this.$reset();
            this.router.go();
        },

        /**
         * set user state
         * @param {object} payload
         */
        setUser(payload) {
            this.user = payload;
        },
        /**
         * set token state
         * @param {string} payload
         */
        setToken(payload) {
            this.token = payload;
        },
    },
});
