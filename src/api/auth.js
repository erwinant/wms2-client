import { api } from 'boot/axios';
export default class AuthApi {
    /**
     * login
     * @param {*} payload
     * @returns
     */
    static async signIn(payload) {
        return api.post(`/auth/login`, payload);
    }

    static async whoAmI() {
        return api.get(`/auth/profile`);
    }
}
