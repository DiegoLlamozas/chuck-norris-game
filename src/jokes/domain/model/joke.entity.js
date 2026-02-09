/**
 * @class Joke
 * @summary Represents a Chuck Norris joke entity from the API.
 */

export class Joke {

    /**
     * @param {Object} params - The joke parameters.
     * @param {Array<string>} params.categories - Categories the joke belongs to.
     * @param {string} params.created_at - Creation timestamp string.
     * @param {string} params.iconUrl - URL to the joke icon.
     * @param {string} params.id - Unique joke identifier.
     * @param {string} params.updated_at - Last update timestamp string.
     * @param {string} params.url - URL to the joke on the API.
     * @param {string} params.value - The joke text/content.
     */

    constructor({
        categories = [""],
        created_at = "",
        iconUrl = "https://api.chucknorris.io/img/avatar/chuck-norris.png",
        id = "",
        updated_at = "",
        url = "",
        value = ""
                }) {
        this.categories = categories;
        this.created_at = new Date(created_at);
        this.iconUrl = iconUrl;
        this.id = id;
        this.updated_at = new Date(updated_at);
        this.url = url;
        this.value = value;
    }

    /**
     * Gets the formatted creation date string.
     * @returns {string} Formatted date string.
     */

    getFormattedCreatedAt() {
        return this.created_at.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Gets the formatted update date string.
     * @returns {string} Formatted date string.
     */

    getFormattedUpdatedAt() {
        return this.updated_at.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    
}