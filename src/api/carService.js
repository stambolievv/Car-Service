import * as api from './api';
import { createPointer, createQuery } from '../utils/db';
import { getUserData } from './userService';

// Pagination
const pageSize = 10;

/* A constant that is used to create the endpoints for the car table in the database. */
const CAR_TABLE_DB = '/classes/Car';

// DB requests
const endpoints = {
  CREATE_CAR: `${CAR_TABLE_DB}`,
  CAR_BY_ID: (id) => `${CAR_TABLE_DB}/${id}`,
  ALL_CARS: (page) => `${CAR_TABLE_DB}?&order=-createdAt${page ? `&skip=${(page - 1) * pageSize}&limit=${pageSize}` : ''}`,
  CARS_COUNT: (query) => `${CAR_TABLE_DB}?count=1${query ? `&where=${query}` : ''}`,
  SEARCH_CARS: (page, query) => `${CAR_TABLE_DB}?where=${query}&skip=${(page - 1) * pageSize}&limit=${pageSize}`
};

export async function getAllCars(page, query, search) {
  if (query) return api.GET(endpoints.SEARCH_CARS(page, createQuery(query, search)));
  return api.GET(endpoints.ALL_CARS(page));
}
export async function getCarsCount(query, search) {
  if (query) return api.GET(endpoints.CARS_COUNT(createQuery(query, search)));
  return api.GET(endpoints.CARS_COUNT());
}
export async function getCarById(carId) {
  return api.GET(endpoints.CAR_BY_ID(carId));
}
export async function createCar(data) {
  const { id: userId } = getUserData();
  const body = Object.assign({}, data, createPointer('owner', '_User', userId));
  return api.POST(endpoints.CREATE_CAR, body);
}
export async function editCar(carId, data) {
  return api.PUT(endpoints.CAR_BY_ID(carId), data);
}
export async function deleteCar(carId) {
  return api.DEL(endpoints.CAR_BY_ID(carId));
}