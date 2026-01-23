// services/ApiService.js
import axios from 'axios';
import { toast } from 'react-toastify';

const ApiService = {
    api: null,

    // Create an Axios instance with default settings
    createApiInstance() {
        const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).auth_token
        : null;
        const apiUrl = process.env.REACT_APP_API_URL; // Default to 'en' if not set

        this.api = axios.create({
            baseURL: apiUrl, // Replace with your API base URL
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        // Set up a response interceptor to handle errors globally, if needed
        this.api.interceptors.response.use(
            response => response,
            error => {
                const { status, data } = error.response;
                if (status === 401) {
                    toast.error('Unauthorized');
                    // window.location.href = '/login';
                }
                else if (status === 500) {
                    // Internal Server Error
                    toast.error('An internal server error occurred.');
                } else if (status === 422) {
                    // Unprocessable Entity
                    toast.error(data.message);
                } else{
                    toast.error(data.message);
                }
                return Promise.reject(error);
            }
        );
    },

    /**
     * Generic request method for making API calls.
     * @param {object} config - Axios request configuration.
     * @returns {Promise} - Axios response promise.
     */
    request(config) {
        this.createApiInstance(); // Ensure the instance is created with current token and language
        return this.api.request(config);
    },

    /**
     * GET request.
     * @param {string} url - The endpoint URL.
     * @param {object} [params] - Optional query parameters.
     * @returns {Promise} - Axios response promise.
     */
    get(url, params = {}) {
        return this.request({ method: 'GET', url, params });
    },

    /**
     * POST request.
     * @param {string} url - The endpoint URL.
     * @param {object} data - The request payload.
     * @returns {Promise} - Axios response promise.
     */
    post(url, data) {
        return this.request({ method: 'POST', url, data });
    },

    /**
     * PUT request.
     * @param {string} url - The endpoint URL.
     * @param {object} data - The request payload.
     * @returns {Promise} - Axios response promise.
     */
    put(url, data) {
        return this.request({ method: 'PUT', url, data });
    },

    /**
     * DELETE request.
     * @param {string} url - The endpoint URL.
     * @returns {Promise} - Axios response promise.
     */
    delete(url) {
        return this.request({ method: 'DELETE', url });
    },
};

export default ApiService;
