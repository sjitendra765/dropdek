import axios from "axios";
import config from "../../config.js";

const { serviceUrlBase, accessKey } = config.services.unsplash;

export const UnsplashService = {
  /**
   * Search Unsplash and return a promise with the results.
   *
   * @param query search query.
   * @returns {*}
   */
  search: (query, page = 1, perPage = 18) => axios({
    method: "GET",
    url: `${serviceUrlBase}/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&page=${page}`,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Content-Type": "application/json",
    },
  }),

};
