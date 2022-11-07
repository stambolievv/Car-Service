import { getUserData, removeUserData } from './userService';

/* Defining the location of the server. */
const location = {
  protocol: 'https:',
  hostname: 'parseapi.back4app.com'
};

/**
 * @description It makes a request to the server, and if the response is not ok, it throws an error.
 * @param {string} path - The path to the API endpoint.
 * @param {object} options - An object with options for a fetch request.
 * @returns {object} The response from the server.
 */
async function request(path, options) {
  try {
    const response = await fetch(`${location.protocol}//${location.hostname}${path}`, options);

    if (response.ok !== true) {
      if (response.status == 403) removeUserData();
      const error = await response.json();
      throw new Error(error.error);
    }

    try {
      return await response.json();
    } catch (err) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * @description It creates an object that contains the options for a fetch request.
 * @param {string} method - The HTTP method to use.
 * @param {object} data - The data to be sent to the server.
 * @returns {object} An object with all the necessary options for the specific HTTP method.
 */
function createOption(method, data) {
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': '0oqWvkMylRfPgcnXNXtOUe8SWSqDZPiHktiLW9Np',
      'X-Parse-REST-API-Key': '4YzVVeTWOVJyamwDNrNaafCLGzwC5qWnt7dw9aot'
    }
  };

  if (typeof data !== 'undefined') {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const user = getUserData();
  if (user !== null) options.headers['X-Parse-Session-Token'] = user.token;

  return options;
}

// CRUD
export const GET = async (path) => request(path, createOption('GET'));
export const POST = async (path, data) => request(path, createOption('POST', data));
export const PUT = async (path, data) => request(path, createOption('PUT', data));
export const DEL = async (path) => request(path, createOption('DELETE'));