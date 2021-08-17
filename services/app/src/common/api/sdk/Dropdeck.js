import axios from "axios";
import { apiHost } from "../../../App";
import { ROUTE_START } from "../../../Routes";

// 401 interceptor
axios.interceptors.response.use((response) => response, (error) => {
  if (error?.response?.status === 401) {
    window.location = ROUTE_START;
  }
  return Promise.reject(error);
});

/**
 * Client for communicating with Dropdeck API.
 *
 */
export default class Dropdeck {

  static client = (prefix) => ({
    /**
     * Internal for making Dropdeck API requests.
     *
     * @param method
     * @param resource
     * @param data
     * @returns {AxiosPromise<any>}
     */
    get: async (resource, params) => axios({
      method: 'get',
      url: `${apiHost()}${prefix}/${resource}`,
      params,
      withCredentials: true
    }),

    /**
     * Internal for making Dropdeck API requests.
     *
     * @param method
     * @param resource
     * @param data
     * @returns {AxiosPromise<any>}
     */
    delete: async (resource) => axios({
      method: 'delete',
      url: `${apiHost()}${prefix}/${resource}`,
      withCredentials: true
    }),

    /**
     * Internal for making Dropdeck API requests.
     *
     * @param method
     * @param resource
     * @param data
     * @returns {AxiosPromise<any>}
     */
    post: async (resource, data) => axios({
      method: 'post',
      url: `${apiHost()}${prefix}/${resource}`,
      data,
      withCredentials: true
    }),

    /**
     * Internal for making Dropdeck API requests.
     *
     * @param method
     * @param resource
     * @param data
     * @returns {AxiosPromise<any>}
     */
    put: async (resource, data) => axios({
      method: 'put',
      url: `${apiHost()}${prefix}/${resource}`,
      data,
      withCredentials: true
    }),
  });

  static api = this.client('');

  static services = this.client('/services');

  /**
   * Call a service.
   *
   * @param name
   * @param param
   * @returns {AxiosPromise<any>}
   */
  static service = async (service, param) => axios({
    method: "get",
    url: `${apiHost()}/services/${service}/${param}`,
    withCredentials: true
  });

  /**
   * Methods for handling deck objects.
   *
   * @type {Dropdeck.Decks}
   */
  static Decks = class Decks {

    /**
     * Get all decks for a user.
     *
     * @returns {AxiosPromise<any>}
     */
    static all = async () => Dropdeck.api.get(
      `decks`,
      undefined,
    );

    /**
     * Get anonymous decks for this user/browser.
     *
     * @returns {Promise<AxiosPromise<*>>}
     */
    static anonymous = async () => Dropdeck.api.get(
      `decks/anonymous`,
    );

    /**
     * Get all decks owned by a user.
     *
     * @returns {AxiosPromise<any>}
     */
    static ownedByUser = async (page) => Dropdeck.api.get(
      `decks?page=${page}`,
      { f: 'owner' },
    );

    /**
     * Get all decks shared with a user.
     *
     * @returns {AxiosPromise<any>}
     */
    static sharedWithUser = async () => Dropdeck.api.get(
      `decks`,
      { f: 'shared' },
    );

    /**
     * Get a deck by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static byId = async (id) => Dropdeck.api.get(
      `decks/${id}`,
      undefined
    );

    /**
     * Play a deck by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static play = async (id) => Dropdeck.api.get(
      `play/${id}`,
      undefined
    );

    /**
     * Create a new deck.
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static create = async (data) => Dropdeck.api.post(
      `decks`,
      data
    );

    /**
     * Update existing deck.
     *
     * @param id
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static update = async (id, data) => Dropdeck.api.put(
      `decks/${id}`,
      data
    );

    /**
     * Delete a deck by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static delete = async (id) => Dropdeck.api.delete(
      `decks/${id}`,
    );
  };

  static Files = class Files {

    /**
     * Get all files for a user.
     *
     * @returns {AxiosPromise<any>}
     */
    static all = async () => Dropdeck.api.get(
      "files",
      undefined,
    );

    /**
     * Get a file by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static byId = async (id) => Dropdeck.api.get(
      `files/${id}`,
      undefined
    );

    /**
     * Create a new file.
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static create = async (data) => Dropdeck.api.post(
      `files`,
      data
    );

    /**
     * Update existing files.
     *
     * @param id
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static update = async (id, data) => Dropdeck.api.put(
      `files/${id}`,
      data
    );

    /**
     * Delete a file by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static delete = async (id) => Dropdeck.api.delete(
      `files/${id}`,
    );
  };

  /**
   * Methods for handling people.
   *
   * @type {Dropdeck.Human}
   */
  static People = class People {

    /**
     * Get a human by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static me = async () => Dropdeck.api.get(
      "people/me",
      undefined
    );

    static updateMe = async (data) => Dropdeck.api.put(
      `people/me`,
      data
    );

    /**
     * Get all people
     *
     * @returns {AxiosPromise<any>}
     */
    static all = async () => Dropdeck.api.get(
      "people",
      undefined,
    );

    /**
     * Get a human by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static byId = async (id) => Dropdeck.api.get(
      `people/${id}`,
      undefined
    );

    /**
     * Create a new human.
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static create = async (data) => Dropdeck.api.post(
      `people`,
      data
    );

    /**
     * Update an existing human.
     *
     * @param id
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static update = async (id, data) => Dropdeck.api.put(
      `people/${id}`,
      data
    );

    /**
     * Delete a human by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static delete = async (id) => Dropdeck.api.delete(
      `people/${id}`,
      undefined
    );
  }

  /**
   * Methods for handling companies.
   *
   * @type {Dropdeck.Companies}
   */
  static Companies = class Companies {

    /**
     * Get a company by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static byId = async (id) => Dropdeck.api.get(
      `companies/${id}`,
      undefined
    );

    /**
     * Create a new company.
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static create = async (data) => Dropdeck.api.post(
      `companies`,
      data
    );

    /**
     * Update an company human.
     *
     * @param id
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static update = async (id, data) => Dropdeck.api.put(
      `companies/${id}`,
      data
    );

    /**
     * Delete a company by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static delete = async (id) => Dropdeck.api.delete(
      `companies/${id}`,
      undefined
    );
  }

  /**
   * Methods for branding.
   *
   * @type {Dropdeck.Branding}
   */
  static Branding = class Branding {

    /**
     * Get branding by ID.
     *
     * @param id
     * @returns {AxiosPromise<any>}
     */
    static byId = async (id) => Dropdeck.api.get(
      `branding/${id}`,
      undefined
    );

    /**
     * Update branding.
     *
     * @param id
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static update = async (id, data) => Dropdeck.api.put(
      `branding/${id}`,
      data
    );
  }
}
