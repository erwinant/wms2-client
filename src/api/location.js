import { api } from 'boot/axios';
export default class LocationApi {
    /**
     * get warehouse list
     * @param {object} payload
     * @returns
     */
    static async getWarehouse(payload) {
        return api.get(`/warehouses`, payload);
    }

    /**
     * get warehouse count
     * @param {object} payload
     * @returns
     */
    static async countWarehouse(payload) {
        return api.get(`/warehouses/count`, payload);
    }
    /**
     * create warehouse
     * @param {*} payload
     * @returns
     */
    static async createWarehouse(payload) {
        return api.post(`warehouses`, payload);
    }
    /**
     * update warehouse
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async updateWarehouse(id, payload) {
        return api.patch(`warehouses/${id}`, payload);
    }
}
