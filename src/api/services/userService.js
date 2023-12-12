import * as api from '../api';
import { USER_ENDPOINTS } from '../endpoints';
import { memoization, updateNavigation } from '../../utilities';

const USER_STORAGE_KEY = 'car-service-current-user-data';

/**
 * @description Performs a user login operation with the provided user credentials. Upon successful authentication, the user's information is stored in the session storage and the navigation bar is updated.
 * @param {UserLoginCredentials} data - User credentials.
 * @returns {Promise<UserAuthData>} The result from the server.
 */
export async function login(data) {
  const result = /**@type {UserAuthData}*/(await api.POST(USER_ENDPOINTS.LOGIN, data));

  await setUserData({ username: data.username, id: result.objectId, token: result.sessionToken });
  updateNavigation();

  return result;
}

/**
 * @description Performs a user registration operation with the provided user credentials. Upon successful authentication, the user's information is stored in the session storage and the navigation bar is updated.
 * @param {UserLoginCredentials} data - User credentials.
 * @returns {Promise<UserAuthData>} The result from the server.
 */
export async function register(data) {
  const result = /**@type {UserAuthData}*/(await api.POST(USER_ENDPOINTS.REGISTER, data));

  await setUserData({ username: data.username, id: result.objectId, token: result.sessionToken });
  updateNavigation();

  return result;
}

/**
 * @description Performs a user logout operation. It removes the user data stored in the session storage and updates the navigation accordingly.
 * @returns {Promise<{}>} The result from the server.
 */
export async function logout() {
  const result = await api.POST(USER_ENDPOINTS.LOGOUT, {});

  await removeUserData();
  updateNavigation();

  return result;
}

/**
 * @description Checks whether user data exists in the session storage.
 * @returns {boolean} Returns true if user data is present, otherwise false.
 */
export function hasUserData() {
  return !!sessionStorage.getItem(USER_STORAGE_KEY);
}

/**
 * @description Retrieves user data from the session storage.
 * @returns {UserStoredData | null} Returns the parsed user data if it exists, otherwise returns null.
 */
export function getUserData() {
  return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY) ?? 'null');
}

/**
 * @description Sets user data in the session storage.
 * @param {UserStoredData} data - The data to be stored in the session storage.
 */
export async function setUserData(data) {
  await memoization.deleteCache().catch(console.error);
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
}

/**
 * @description Removes user data from the session storage.
 */
export async function removeUserData() {
  await memoization.deleteCache().catch(console.error);
  sessionStorage.removeItem(USER_STORAGE_KEY);
}