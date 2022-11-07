import * as api from './api';
import { createPointer } from '../utils/db';
import { getUserData } from './userService';

// Pagination
const pageSize = 10;

/* A constant that is used to create the endpoints for the repair table in the database. */
const REPAIR_TABLE_DB = '/classes/Repair';

// DB requests
const endpoints = {
  CREATE_REPAIR: `${REPAIR_TABLE_DB}`,
  REPAIR_BY_ID: id => `${REPAIR_TABLE_DB}/${id}`,
  ALL_REPAIRS: (car, page) => `${REPAIR_TABLE_DB}?where=${car}&order=-createdAt${page ? `&skip=${(page - 1) * pageSize}&limit=${pageSize}` : ''}`,
  REPAIRS_COUNT: car => `${REPAIR_TABLE_DB}?where=${car}&count=1`,
};

export async function getAllRepairs(carId, page) {
  const body = encodeURIComponent(JSON.stringify(createPointer('car', 'Car', carId)));
  return api.GET(endpoints.ALL_REPAIRS(body, page));
}
export async function getRepairsCount(carId) {
  const body = encodeURIComponent(JSON.stringify(createPointer('car', 'Car', carId)));
  return api.GET(endpoints.REPAIRS_COUNT(body));
}
export async function getRepairById(repairId) {
  return api.GET(endpoints.REPAIR_BY_ID(repairId));
}
export async function createRepair(carId, data) {
  const { id: userId } = getUserData();
  const body = Object.assign({}, data, createPointer('owner', '_User', userId), createPointer('car', 'Car', carId));
  return api.POST(endpoints.CREATE_REPAIR, body);
}
export async function editRepair(repairId, data) {
  return api.PUT(endpoints.REPAIR_BY_ID(repairId), data);
}
export async function deleteRepair(repairId) {
  return api.DEL(endpoints.REPAIR_BY_ID(repairId));
}
export async function deleteAllRepairs(repairs) {
  return repairs.map(({ objectId }) => api.DEL(endpoints.REPAIR_BY_ID(objectId)));
}
export async function detailsRepair(repairId) {
  return api.GET(endpoints.REPAIR_BY_ID(repairId));
}