import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const jokeTestsEndpointPath = import.meta.env.VITE_TESTS_ENDPOINT_PATH;

/**
 * @class JokesApi
 * @extends BaseApi
 * @summary API class for Jokes bounded context operations, handling joke tests.
 */

export class JokesApi extends BaseApi {
    #jokeTestsEndpoint;

    /**
     * @constructor
     */

    constructor() {
        super();
        this.#jokeTestsEndpoint = new BaseEndpoint(this, jokeTestsEndpointPath);
    }

    /**
     * Fetches all joke tests.
     * @returns {Promise} A promise that resolves with the tests response.
     */

    getTests(){
        return this.#jokeTestsEndpoint.getAll();
    }

    /**
     * Fetches a joke test by ID.
     * @param {string} id - The test ID.
     * @returns {Promise} A promise that resolves with the test response.
     */

    getTestById(id) {
        return this.#jokeTestsEndpoint.getById(id);
    }

    /**
     * Creates a new joke test.
     * @param {Object} resource - The test resource to create.
     * @returns {Promise} A promise that resolves with the creation response.
     */

    createTest(resource){
        return this.#jokeTestsEndpoint.create(resource);
    }

    /**
     * Deletes a joke test by ID.
     * @param {string} id - The test ID to delete.
     * @returns {Promise} A promise that resolves with the deletion response.
     */

    deleteTest(id){
        return this.#jokeTestsEndpoint.delete(id);
    }
}