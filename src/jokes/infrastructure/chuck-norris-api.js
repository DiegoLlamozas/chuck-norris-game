import axios from "axios";

const chuckNorrisApi = import.meta.env.VITE_CHUCK_NORRIS_API_URL;
const randomJokeEndpoint = import.meta.env.VITE_RANDOM_JOKE_ENDPOINT_PATH;
const categoriesEndpoint = import.meta.env.VITE_CATEGORIES_ENDPOINT;

const http = axios.create({ baseURL: chuckNorrisApi });

/**
 * @class ChuckNorrisApi
 * @summary API client for Chuck Norris joke API operations.
 */

export class ChuckNorrisApi {

    /**
     * Fetches a random Chuck Norris joke.
     * @returns {Promise} A promise that resolves with the random joke response.
     */

    getRandomJoke(){
        return http.get(randomJokeEndpoint);
    }

    /**
     * Fetches all available joke categories.
     * @returns {Promise} A promise that resolves with the categories response.
     */

    getCategories(){
        return http.get(categoriesEndpoint);
    }

    /**
     * Fetches a random joke from a specific category.
     * @param {string} category - The category to fetch joke from.
     * @returns {Promise} A promise that resolves with the categorized joke response.
     */

    getRandomJokeByCategory(category){
        return http.get(`${randomJokeEndpoint}?category=${category}`);
    }
    
}