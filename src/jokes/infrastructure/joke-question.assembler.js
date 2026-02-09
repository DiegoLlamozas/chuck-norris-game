import {JokeQuestion} from "../domain/model/joke-question.entity.js";
import {JokeAssembler} from "./joke.assembler.js";

/**
 * @class JokeQuestionAssembler
 * @summary Assembler for converting joke question API responses to entities.
 */

export class JokeQuestionAssembler{

    /**
     * Converts an API response to an array of JokeQuestion entities.
     * @static
     * @param {Object} response - The API response object.
     * @returns {JokeQuestion[]} Array of JokeQuestion entities.
     */

    static toEntitiesFromResponse(response){
        if(response.data.status !== "ok"){
            console.error(`${response.data.status}, ${response.data.code}, ${response.data.message}`);
            return [];
        }

        const jokeQuestionsResponse = response.data ?? response;
        return jokeQuestionsResponse['joke-questions'].map(question => this.toEntityFromResource(question))
    }

    /**
     * Converts a joke question resource to a JokeQuestion entity.
     * @static
     * @param {Object} resource - The joke question resource from the API.
     * @returns {JokeQuestion} The JokeQuestion entity.
     */

    static toEntityFromResource(resource){
        let jokeQuestion = new JokeQuestion(resource);

        jokeQuestion.joke = JokeAssembler.toEntityFromResource(resource.joke);

        return jokeQuestion;

    }

    /**
     * Converts child resources to JokeQuestion entities.
     * @static
     * @param {Array<Object>} childResource - Array of child resources.
     * @returns {JokeQuestion[]} Array of JokeQuestion entities.
     */

    static toChildEntitiesFromResource(childResource){
        console.log(childResource);

        return childResource.map(question => this.toEntityFromResource(question))
    }
}