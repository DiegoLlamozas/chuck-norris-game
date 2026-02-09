import {JokeTest} from "../domain/model/joke-test.entity.js";
import {JokeQuestionAssembler} from "./joke-question.assembler.js";


/**
 * @class JokeTestAssembler
 * @summary Assembler for converting joke test API responses to entities.
 */
export class JokeTestAssembler{

    /**
     * Converts an API response to an array of JokeTest entities.
     * @static
     * @param {Object} response - The API response object.
     * @returns {JokeTest[]} Array of JokeTest entities.
     */

    static toEntitiesFromResponse(response){
        if(response.data.status !== "ok"){
            console.error(`${response.data.status}, ${response.data.code}, ${response.data.message}`);
            return [];
        }

        const jokeTestResponse = response.data;
        return jokeTestResponse['joke-tests'].map((test) => this.toEntityFromResource(test));
    }

    /**
     * Converts a joke test resource to a JokeTest entity.
     * @static
     * @param {Object} resource - The joke test resource from the API.
     * @returns {JokeTest} The JokeTest entity.
     */

    static toEntityFromResource(resource){
        console.log(resource.data);
        console.log(resource.data.jokeQuestions);

        let jokeTest = new JokeTest(resource.data);

        jokeTest.jokeQuestions = [...JokeQuestionAssembler.toChildEntitiesFromResource(resource.data.jokeQuestions)];

        return jokeTest;
    }
}