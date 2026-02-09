import axios from "axios";

const platformApi = import.meta.env.VITE_JOKES_PLATFORM_API_URL;

/**
 * @class BaseApi
 * @summary Base API class in the Shared bounded context, providing common HTTP client setup with authentication.
 */
export class BaseApi {
    #http;

    /**
     * @constructor
     */
    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    /**
     * Gets the HTTP client instance.
     * @returns {Object} The Axios HTTP client.
     */
    get http() {
        return this.#http;
    }
}