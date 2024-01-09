import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { WMS_API_URL } from 'src/config/app.js';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
    baseURL: WMS_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (!config.headers.Authorization) {
            const token = authStore.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        //Dispatch any action on success
        return response.data;
    },
    (error) => {
        const originalRequest = error.config;
        // if (error.response.status === 401 && !originalRequest._retry) {
        //   // if the error is 401 and has sent already been retried
        //   originalRequest._retry = true; // now it can be retried for expiration token
        //   return api.post("auth/login", null).then(() => {
        //     return api(originalRequest); // retry the request that errored out
        //   });
        // }

        if (error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.logout();
        }

        // Do something with response error
        return Promise.reject(error);
    },
);

export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api
    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { api, axios };
