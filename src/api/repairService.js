import * as api from './api.js';
import { getUserData } from './userService.js';

// Pagination
const pageSize = 15;

// DB requests
const endpoints = {
    ALL_REPAIRS: (car, page) => `/classes/Repair?where=${car}&order=-createdAt&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    REPAIRS_COUNT: '/classes/Repair?count=1',
    REPAIR_BY_ID: (id) => `/classes/Repair/${id}`,
    CREATE_REPAIR: '/classes/Repair',
    EDIT_REPAIR: (id) => `/classes/Repair/${id}`,
    DELETE_REPAIR: (id) => `/classes/Repair/${id}`,
    DETAILS_REPAIR: (id) => `/classes/Repair/${id}`,
};

function createPointer(field, className, id) {
    return {
        [field]: {
            '__type': 'Pointer',
            'className': className,
            'objectId': id
        }
    };
}

async function getAllRepairs(carId, page) {
    const body = encodeURIComponent(JSON.stringify(createPointer('car', 'Car', carId)));
    return api.get(endpoints.ALL_REPAIRS(body, page));
}
async function getRepairsCount() {
    return api.get(endpoints.REPAIRS_COUNT);
}
async function getRepairById(repairId) {
    return api.get(endpoints.REPAIR_BY_ID(repairId));
}
async function createRepair(carId, data) {
    const userId = getUserData().id;
    const body = Object.assign({},
        data,
        createPointer('owner', '_User', userId),
        createPointer('car', 'Car', carId)
    );
    return api.post(endpoints.CREATE_REPAIR, body);
}
async function editRepair(repairId, data) {
    return api.put(endpoints.EDIT_REPAIR(repairId), data);
}
async function deleteRepair(repairId) {
    return api.del(endpoints.DELETE_REPAIR(repairId));
}
async function detailsRepair(repairId) {
    return api.get(endpoints.DETAILS_REPAIR(repairId));
}

export {
    getAllRepairs,
    getRepairsCount,
    getRepairById,
    createRepair,
    editRepair,
    deleteRepair,
    detailsRepair,
};