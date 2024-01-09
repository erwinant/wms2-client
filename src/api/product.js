import { api } from 'boot/axios';
export default class ProductApi {
    /**
     * get product api
     * @param {*} payload
     * @returns
     */
    static async getProducts(payload) {
        return api.get(`/products`, payload);
    }

    /**
     * count product
     * @param {*} payload
     * @returns
     */
    static async countProducts(payload) {
        return api.get(`/products/count`, payload);
    }

    /**
     * get brands list
     * @param {*} payload
     * @returns
     */
    static async getBrands(payload) {
        return api.get(`/brands`, payload);
    }

    /**
     * get brand count
     * @param {*} payload
     * @returns
     */
    static async countBrands(payload) {
        return api.get(`/brands/count`, payload);
    }
    /**
     * create brand
     * @param {*} payload
     * @returns
     */
    static async createBrand(payload) {
        return api.post('/brands', payload);
    }
    /**
     * update brand
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async updateBrand(id, payload) {
        return api.put(`/brands/${id}`, payload);
    }

    /**
     * get categories
     * @param {*} payload
     * @returns
     */
    static async getCategories(payload) {
        return api.get(`/product-categories`, payload);
    }
    /**
     * get count categories
     * @param {*} payload
     * @returns
     */
    static async countCategories(payload) {
        return api.get(`/product-categories/count`, payload);
    }
    /**
     * create category
     * @param {*} payload
     * @returns
     */
    static async createCategory(payload) {
        return api.post('/product-categories', payload);
    }
    /**
     * update category
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async updateCategory(id, payload) {
        return api.put(`/product-categories/${id}`, payload);
    }

    /**
     * get variant list
     * @param {*} payload
     * @returns
     */
    static async getVariants(payload) {
        return api.get(`/variants`, payload);
    }

    /**
     * get variant count
     * @param {*} payload
     * @returns
     */
    static async countVariants(payload) {
        return api.get(`/variants/count`, payload);
    }
    /**
     * create variant list
     * @param {*} payload
     * @returns
     */
    static async createVariant(payload) {
        return api.post('/variants', payload);
    }
    /**
     * update variant list
     * @param {string} id
     * @param {*} payload
     * @returns
     */
    static async updateVariant(id, payload) {
        return api.put(`/variants/${id}`, payload);
    }
}
