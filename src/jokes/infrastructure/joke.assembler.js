import {Joke} from "../domain/model/joke.entity.js";

/**
 * @class JokeAssembler
 * @summary Assembler for converting joke API responses to entities in the Jokes bounded context.
 */

export class JokeAssembler{

    /**
     * Converts an API response to an array of Joke entities.
     * @static
     * @param {Object} response - The API response object.
     * @returns {Joke[]} Array of Joke entities.
     */

    static toEntitiesFromResponse(response){
        if (response.data.status !== "ok"){
            console.error(`${response.data.status}, ${response.data.code}, ${response.data.message}`);
            return [];
        }

        const jokesResponse = response.data ?? response;
        return jokesResponse['jokes'].map(joke => this.toEntityFromResource(joke));
    }

    /**
     * Converts a joke resource to a Joke entity.
     * @static
     * @param {Object} resource - The joke resource from the API.
     * @returns {Joke} The Joke entity.
     */

    static toEntityFromResource(resource){
        return new Joke(resource);
    }

}