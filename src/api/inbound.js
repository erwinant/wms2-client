import { api } from 'boot/axios';
export default class InboundApi {
    /**
     * get warehouse list
     * @param {object} payload
     * @returns
     */
    static async getInbounds(payload) {
        return api.get(`/inbound`, payload);
    }

    /**
     * get warehouse count
     * @param {object} payload
     * @returns
     */
    static async countInbounds(payload) {
        return api.get(`/inbound/count`, payload);
    }
    /**
     * create warehouse
     * @param {*} payload
     * @returns
     */
    static async createInboundDocument(payload) {
        return api.post(`inbound`, payload);
    }
    /**
     * update warehouse
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async updateInboundDocument(id, payload) {
        return api.patch(`inbound/${id}`, payload);
    }
}
