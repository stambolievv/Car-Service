import { getUserData, removeUserData } from '@db';
import { updateNavigation } from '@utilities';

/**
 * @description Performs a network request to a given path with specified options.
 * @param {string} path - The path to send the request to.
 * @param {RequestOptions} options - The options for the request.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
async function request(path, options) {
  const url = new URL(path, 'https://parseapi.back4app.com');
  const response = await fetch(url, options);

  if (response.ok !== true) {
    if (response.status >= 400 && response.status < 500) {
      await removeUserData();
      updateNavigation();
    }

    const { message, error } = await response.json();
    throw new Error(`${message || error} Status: ${response.status}`, { cause: response });
  }

  return response.json();
}

/**
 * @description Creates an options object for use in a network request with a specified method and data.
 * @param {Uppercase<string>} method - The HTTP method for the request (e.g. GET, POST, PUT, DELETE).
 * @param {Record<PropertyKey, unknown>} [data] - The data to send in the request body. Optional and can be undefined.
 * @returns {RequestOptions} An object containing the request options with the specified method, headers, and body (if data provided).
 */
function createOption(method, data) {
  const headers = new Headers({
    'X-Parse-Application-Id': import.meta.env.VITE_APPLICATION_ID,
    'X-Parse-REST-API-Key': import.meta.env.VITE_REST_API_KEY,
  });

  const user = getUserData();
  if (user) headers.append('X-Parse-Session-Token', user.token);

  if (data) headers.append('Content-Type', 'application/json');

  return { method, headers, ...(data ? { body: JSON.stringify(data) } : {}) };
}

/**
 * @description Sends a GET request to the specified path with default options.
 * @param {string} path - The path to send the GET request to.
 * @returns {Promise<unknown>} A promise that resolves to the response body or rejects with an error.
 */
export const GET = (path) => request(path, createOption('GET'));

/**
 * @description Sends a POST request to the specified path with the provided data and default headers.
 * @param {string} path - The path to send the POST request to.
 * @param {Record<PropertyKey, unknown>} data - The data to send in the request body.
 * @returns {Promise<PostRequestResult>} A promise that resolves to the response body or rejects with an error.
 */
export const POST = (path, data) => request(path, createOption('POST', data));

/**
 * @description Sends a PUT request to the specified path with the provided data and default headers.
 * @param {string} path - The path to send the PUT request to.
 * @param {Record<PropertyKey, unknown>} data - The data to send in the request body.
 * @returns {Promise<PutRequestResult>} A promise that resolves to the response body or rejects with an error.
 */
export const PUT = (path, data) => request(path, createOption('PUT', data));

/**
 * @description Sends a DELETE request to the specified path with default options.
 * @param {string} path - The path to send the DELETE request to.
 * @returns {Promise<DeleteRequestResult>} A promise that resolves to the response body or rejects with an error.
 */
export const DEL = (path) => request(path, createOption('DELETE'));