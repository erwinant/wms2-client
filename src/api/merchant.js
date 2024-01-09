import { api } from 'boot/axios';
export default class MerchantApi {
    /**
     * get brands list
     * @param {*} payload
     * @returns
     */
    static async get(payload) {
        return api.get(`/merchant`, payload);
    }
    static async getById(id) {
        return api.get(`/merchant/${id}`);
    }
    static async refreshTokenTikTok(appKey) {
        return api.get(`/merchant/tiktok/refresh_token?app_key=${appKey}`);
    }
    /**
     * get brand count
     * @param {*} payload
     * @returns
     */
    static async count(payload) {
        return api.get(`/merchant/count`, payload);
    }
    /**
     * create brand
     * @param {*} payload
     * @returns
     */
    static async create(payload) {
        return api.post('/merchant', payload);
    }
    /**
     * update brand
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async update(id, payload) {
        return api.patch(`/merchant/${id}`, payload);
    }

    static async changePassword(id, payload) {
        return api.post(`/merchant/${id}`, payload);
    }
}
