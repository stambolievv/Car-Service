import * as api from '../api';
import { REPAIR_ENDPOINTS } from '../endpoints';
import { getUserData } from './userService';
import { memoization } from '../../utilities';

/**
 * @description Creates a new repair for a specific car in the database with the provided data.
 * @param {string} carId - The unique identifier of the car for which the repair is created.
 * @param {RepairData} data - The data of the new repair.
 * @returns {Promise<Repair>} A promise that resolves with the created repair.
 */
export async function createRepair(carId, data) {
  const { id: userId } = /**@type {UserStoredData}*/(getUserData());
  const ownerPointer = { 'owner': Object.freeze({ __type: 'Pointer', className: '_User', objectId: userId }) };
  const carPointer = { 'car': Object.freeze({ __type: 'Pointer', className: 'Car', objectId: carId }) };
  const body = Object.assign({}, data, ownerPointer, carPointer);

  const response = await api.POST(REPAIR_ENDPOINTS.CREATE_REPAIR, body);

  const cacheId = `/cars/${carId}/repairs`;
  const cachedData = /**@type {Array<Repair>}*/(await memoization.getCacheData(cacheId)) ?? [];

  const repair = { ...body, ...response };
  const updatedCache = [repair, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));

  return repair;
}

/**
 * @description Retrieves all repairs for a specific car from the database, with optional pagination.
 * @param {string} carId - The unique identifier of the car for which repairs are retrieved.
 * @param {number} [page] - The page number for pagination.
 * @returns {Promise<{results: Array<Repair>, count: number}>} A promise that resolves with an object containing the results and count.
 */
export async function getAllRepairs(carId, page) {
  const queryParams = JSON.stringify({ 'car': { __type: 'Pointer', className: 'Car', objectId: carId } });

  const cacheId = `/cars/${carId}/repairs`;
  const cachedData = /**@type {Array<Repair> | undefined | null}*/(await memoization.getCacheData(cacheId));

  let results;

  if (cachedData) results = cachedData;
  else {
    ({ results } = /**@type {{results: Array<Repair>}}*/(await api.GET(REPAIR_ENDPOINTS.ALL_REPAIRS(queryParams))));
    await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(results)));
  }

  if (!page) return { results, count: results.length };

  const pageSize = 10;
  const startIdx = (page - 1) * pageSize;
  const endIdx = page * pageSize;
  const paginatedResults = results.slice(startIdx, endIdx);

  return { results: paginatedResults, count: results.length };
}

/**
 * @description Retrieves a specific repair from the database by its unique identifier.
 * @param {string} carId - The unique identifier of the car for which repair is retrieved.
 * @param {string} repairId - The unique identifier of the repair.
 * @returns {Promise<Repair>} A promise that resolves with the retrieved repair.
 */
export async function getRepairById(carId, repairId) {
  const cacheId = `/cars/${carId}/repairs`;
  const cachedData = /**@type {Array<Repair> | null}*/(await memoization.getCacheData(cacheId));
  const cachedRepair = cachedData && cachedData.find((repair) => repair.objectId === repairId);

  if (cachedRepair) return cachedRepair;

  const repairObject = /**@type {Repair}*/(await api.GET(REPAIR_ENDPOINTS.REPAIR_BY_ID(repairId)));

  if (cachedData) {
    const updatedCache = [repairObject, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));
  }

  return repairObject;
}

/**
 * @description Modifies an existing repair in the database with the provided data.
 * @param {string} carId - The unique identifier of the car for which repair is modified.
 * @param {string} repairId - The unique identifier of the repair.
 * @param {RepairData} data - The updated data of the repair.
 * @returns {Promise<Repair>} A promise that resolves with the edited repair.
 */
export async function editRepair(carId, repairId, data) {
  const response = await api.PUT(REPAIR_ENDPOINTS.REPAIR_BY_ID(repairId), data);

  const cacheId = `/cars/${carId}/repairs`;
  const cachedData = /**@type {Array<Repair>}*/(await memoization.getCacheData(cacheId)) ?? [];
  const cachedRepair = /**@type {Repair}*/(cachedData.find((repair) => repair.objectId === repairId)) ?? {};

  const repairObject = { ...cachedRepair, ...data, ...response };
  const updatedCache = [repairObject, ...cachedData].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));

  return repairObject;
}

/**
 * @description Deletes a specific repair from the database by its unique identifier.
 * @param {string} carId - The unique identifier of the car for which repair is deleted.
 * @param {string} repairId - The unique identifier of the repair.
 * @returns {Promise<DeleteRequestResult>} A promise that resolves with the deletion response.
 */
export async function deleteRepair(carId, repairId) {
  const response = await api.DEL(REPAIR_ENDPOINTS.REPAIR_BY_ID(repairId));

  const cacheId = `/cars/${carId}/repairs`;
  const cachedData = /**@type {Array<Repair>}*/(await memoization.getCacheData(cacheId)) ?? [];

  const updatedCache = cachedData.filter((repair) => repair.objectId !== repairId);
  await memoization.updateCacheData(cacheId, JSON.parse(JSON.stringify(updatedCache)));

  return response;
}

/**
 * @description Deletes all repairs from the database associated with a specific car.
 * @param {string} carId - The unique identifier of the car for which all the repair are deleted.
 * @returns {Promise<Array<DeleteRequestResult>>} A promise that resolves with the deletion responses.
 */
export async function deleteAllRepairs(carId) {
  const { results } = await getAllRepairs(carId);
  const response = results.map(({ objectId }) => api.DEL(REPAIR_ENDPOINTS.REPAIR_BY_ID(objectId)));

  const cacheId = `/cars/${carId}/repairs`;
  await memoization.clearCacheData(cacheId);

  return Promise.all(response);
}