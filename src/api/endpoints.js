import { makeQueryParam } from '../utilities';

/**
 * @description Represents the endpoints related to users database.
 * @namespace
 */
export const USER_ENDPOINTS = {
  /**
   * @description Endpoint to perform a user login operation.
   * @type {string}
   */
  LOGIN: '/login',

  /**
   * @description Endpoint to perform a user registration operation.
   * @type {string}
   */
  REGISTER: '/users',

  /**
   * @description Endpoint to perform a user logout operation.
   * @type {string}
   */
  LOGOUT: '/logout',
};

/**
 * @description Represents the endpoints related to cars database.
 * @namespace
 */
export const CAR_ENDPOINTS = {
  /**
   * @description Endpoint to create a car.
   * @type {string}
   */
  CREATE_CAR: '/classes/Car',

  /**
   * @description Endpoint to retrieve all cars with optional query parameters.
   * @param {string} query - The query parameter for filtering cars.
   * @returns {string} The formatted endpoint URL.
   */
  ALL_CARS: (query = '') => `/classes/Car?${makeQueryParam({ order: '-createdAt', where: query })}`,

  /**
   * @description Endpoint to retrieve a car by its ID.
   * @param {string} id - The ID of the car.
   * @returns {string} The formatted endpoint URL.
   */
  CAR_BY_ID: (id) => `/classes/Car/${id}`,
};

/**
 * @description Represents the endpoints related to repairs database.
 * @namespace
 */
export const REPAIR_ENDPOINTS = {
  /**
   * @description Endpoint to create a repair.
   * @type {string}
   */
  CREATE_REPAIR: '/classes/Repair',

  /**
   * @description Endpoint to retrieve all repairs for a specific car with optional query parameters.
   * @param {string} car - The car parameter for filtering repairs.
   * @returns {string} The formatted endpoint URL.
   */
  ALL_REPAIRS: (car) => `/classes/Repair?${makeQueryParam({ order: '-createdAt', where: car })}`,

  /**
   * @description Endpoint to retrieve a repair by its ID.
   * @param {string} id - The ID of the repair.
   * @returns {string} The formatted endpoint URL.
   */
  REPAIR_BY_ID: (id) => `/classes/Repair/${id}`,
};