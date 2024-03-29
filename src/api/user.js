import { api } from 'boot/axios';
export default class UserApi {
    /**
     * get brands list
     * @param {*} payload
     * @returns
     */
    static async get(payload) {
        return api.get(`/users`, payload);
    }
    static async getById(id) {
        return api.get(`/users/${id}`);
    }

    /**
     * get brand count
     * @param {*} payload
     * @returns
     */
    static async count(payload) {
        return api.get(`/users/count`, payload);
    }
    /**
     * create brand
     * @param {*} payload
     * @returns
     */
    static async create(payload) {
        return api.post('/users', payload);
    }
    /**
     * update brand
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async update(id, payload) {
        return api.patch(`/users/${id}`, payload);
    }

    static async changePassword(id, payload) {
        return api.post(`/users/${id}`, payload);
    }
}
