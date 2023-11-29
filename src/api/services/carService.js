import * as api from '../api';
import { CAR_ENDPOINTS } from '../endpoints';
import { getUserData } from './userService';
import { memoization } from '../../utilities';
import config from '../../config';

/**
 * @description Creates a new car in the database with the provided data.
 * @param {CarData} data - The data of the new car.
 * @returns {Promise<Car>} A promise that resolves with the created car.
 */
export async function createCar(data) {
  const { id: userId } = /**@type {UserStoredData}*/(getUserData());
  const ownerPointer = { 'owner': Object.freeze({ __type: 'Pointer', className: '_User', objectId: userId }) };
  const body = Object.assign({}, data, ownerPointer);

  const response = await api.POST(CAR_ENDPOINTS.CREATE_CAR, body);

  const cacheId = '/cars';
  const cachedData = /**@type {Array<Car>}*/(await memoization.getCacheData(cacheId)) ?? [];

  const carData = { ...body, ...response };
  const updatedCache = [carData, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));

  return carData;
}

/**
 * @description Retrieves all cars from the database, with optional pagination and search parameters.
 * @param {number} [page] - The page number for pagination.
 * @param {string} [searchCategory] - The category for searching cars.
 * @param {string} [searchQuery] - The query string for searching cars.
 * @returns {Promise<{results: Array<Car>, count: number}>} A promise that resolves with an object containing the results and count.
 */
export async function getAllCars(page, searchCategory, searchQuery) {
  const queryParams = searchCategory && searchQuery ? JSON.stringify({ [searchCategory]: { $regex: `(?i)${searchQuery}` } }) : null;

  const cacheId = '/cars';
  const cachedData = /**@type {Array<Car> | undefined | null}*/(await memoization.getCacheData(cacheId));

  let results;

  if (!queryParams) {
    results = cachedData ?? /**@type {{results: Array<Car>}}*/(await api.GET(CAR_ENDPOINTS.ALL_CARS())).results;
    if (!cachedData) await memoization.updateCacheData(cacheId, results);
  } else {
    ({ results } = /**@type {{results: Array<Car>}}*/(await api.GET(CAR_ENDPOINTS.ALL_CARS(queryParams))));
  }

  if (!page) return { results, count: results.length };

  const startIdx = (page - 1) * config.itemsPerPage;
  const endIdx = page * config.itemsPerPage;
  const paginatedResults = results.slice(startIdx, endIdx);

  return { results: paginatedResults, count: results.length };
}

/**
 * @description Retrieves a specific car from the database by its unique identifier.
 * @param {string} carId - The unique identifier of the car.
 * @returns {Promise<Car>} A promise that resolves with the retrieved car.
 */
export async function getCarById(carId) {
  const cacheId = '/cars';
  const cachedData = /**@type {Array<Car> | null}*/(await memoization.getCacheData(cacheId));
  const cachedCar = cachedData && cachedData.find((car) => car.objectId === carId);

  if (cachedCar) return cachedCar;

  const carObject = /**@type {Car}*/(await api.GET(CAR_ENDPOINTS.CAR_BY_ID(carId)));

  if (cachedData) {
    const updatedCache = [carObject, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));
  }

  return carObject;
}

/**
 * @description Modifies an existing car in the database with the provided data.
 * @param {string} carId - The unique identifier of the car.
 * @param {CarData} data - The updated data of the car.
 * @returns {Promise<Car>} A promise that resolves with the edited car.
 */
export async function editCar(carId, data) {
  const response = await api.PUT(CAR_ENDPOINTS.CAR_BY_ID(carId), data);

  const cacheId = '/cars';
  const cachedData = /**@type {Array<Car>}*/(await memoization.getCacheData(cacheId)) ?? [];
  const cachedCarIndex = cachedData.findIndex((car) => car.objectId === carId);
  const cachedCar = /**@type {Car}*/(cachedCarIndex !== -1 ? cachedData.splice(cachedCarIndex, 1)[0] : {});

  const carObject = { ...cachedCar, ...data, ...response };
  const updatedCache = [carObject, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));

  return carObject;
}

/**
 * @description Deletes a specific car from the database by its unique identifier.
 * @param {string} carId - The unique identifier of the car.
 * @returns {Promise<DeleteRequestResult>} A promise that resolves with the deletion response.
 */
export async function deleteCar(carId) {
  const response = await api.DEL(CAR_ENDPOINTS.CAR_BY_ID(carId));

  const cacheId = '/cars';
  const cachedData = /**@type {Array<Car>}*/(await memoization.getCacheData(cacheId)) ?? [];

  const updatedCache = cachedData.filter((car) => car.objectId !== carId);
  await (updatedCache.length > 0
    ? memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)))
    : memoization.clearCacheData(cacheId));

  return response;
}