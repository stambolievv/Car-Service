import * as api from './api.js';
import { getUserData } from './userService.js';

// Pagination
const pageSize = 10;

// DB requests
const endpoints = {
    ALL_CARS: (page) => `/classes/Car?&order=-createdAt${page ? `&skip=${(page - 1) * pageSize}&limit=${pageSize}` : ''}`,
    CARS_COUNT: (query) => `/classes/Car?count=1${query ? `&where=${query}` : ''}`,
    CAR_BY_ID: (id) => `/classes/Car/${id}`,
    CREATE_CAR: '/classes/Car',
    EDIT_CAR: (id) => `/classes/Car/${id}`,
    DELETE_CAR: (id) => `/classes/Car/${id}`,
    SEARCH_CARS: (page, query) => `/classes/Car?where=${query}&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
};

function createQuery(query, search = '') {
    return encodeURIComponent(
        JSON.stringify({
            [search]: {
                $regex: `(i?)${query}`
            }
        })
    );
}
function createPointer(field, className, id) {
    return {
        [field]: {
            '__type': 'Pointer',
            'className': className,
            'objectId': id
        }
    };
}

async function getAllCars(page, query, search) {
    if (query) { return api.get(endpoints.SEARCH_CARS(page, createQuery(query, search))); }
    return api.get(endpoints.ALL_CARS(page));
}
async function getCarsCount(query, search) {
    if (query) { return api.get(endpoints.CARS_COUNT(createQuery(query, search))); }
    return api.get(endpoints.CARS_COUNT());
}
async function getCarById(carId) {
    return api.get(endpoints.CAR_BY_ID(carId));
}
async function createCar(data) {
    const userId = getUserData().id;
    const body = Object.assign({}, data, createPointer('owner', '_User', userId));
    return api.post(endpoints.CREATE_CAR, body);
}
async function editCar(carId, data) {
    return api.put(endpoints.EDIT_CAR(carId), data);
}
async function deleteCar(carId) {
    return api.del(endpoints.DELETE_CAR(carId));
}

export {
    getAllCars,
    getCarsCount,
    getCarById,
    createCar,
    editCar,
    deleteCar
};