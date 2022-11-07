import * as api from './api';

/* An object with the endpoints for the login, register and logout functions. */
const endpoints = {
  LOGIN: '/login',
  REGISTER: '/users',
  LOGOUT: '/logout'
};

/**
 * @description It sends a POST request to the login endpoint with the provided data, and if the request is successful, it saves the user's data in the local storage.
 * @param {object} data - The data that we want to send to the server.
 * @returns {Promise} The result from the server.
 */
export async function login(data) {
  const result = await api.POST(endpoints.LOGIN, data);
  const userData = JSON.stringify({
    username: data.username,
    id: result.objectId,
    token: result.sessionToken
  });

  setUserData(userData);
  return result;
}

/**
 * @description It sends a POST request to the registering endpoint with the provided data, and if the request is successful, it saves the user's data in the local storage.
 * @param {object} data - The data that we want to send to the server.
 * @returns {Promise} The result from the server.
 */
export async function register(data) {
  const result = await api.POST(endpoints.REGISTER, data);
  const userData = JSON.stringify({
    username: data.username,
    id: result.objectId,
    token: result.sessionToken
  });

  setUserData(userData);
  return result;
}

/**
 * @description It makes a POST request to the logout endpoint, and then removes the user data from the local storage.
 */
export async function logout() {
  await api.POST(endpoints.LOGOUT, {});
  removeUserData();
}

// user authorizations
const userKey = 'car_service_current_user_data';

/**
 * @description It returns the user data from session storage.
 * @returns {object} The user data from the session storage.
 */
export function getUserData() {
  return JSON.parse(sessionStorage.getItem(userKey));
}

/**
 * @description It takes a `data` value, and sets it in the sessionStorage.
 * @param {string} data - The data to be stored in the session storage.
 */
export function setUserData(data) {
  sessionStorage.setItem(userKey, data);
}

/**
 * @description It removes the user data from the session storage.
 */
export function removeUserData() {
  sessionStorage.removeItem(userKey);
}