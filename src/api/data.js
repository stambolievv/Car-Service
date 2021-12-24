import * as api from './api.js';

// authentication
const login = api.login;
const register = api.register;
const logout = api.logout;

// user authorizations
const userKey = 'currentUserData';
const getUserData = () => JSON.parse(sessionStorage.getItem(userKey));
const setUserData = (data) => sessionStorage.setItem(userKey, data);
const removeUserData = () => sessionStorage.removeItem(userKey);

// Pagination
const pageSize = 9;

// DB requests
const endpoints = {
    MY_REPAIRS: (page) => `/classes/Repair?order=-createdAt&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    REPAIRS_COUNT: (query) => `/classes/Repair?count=1${query ? `&where=${createQueryParser(query)}` : ''}`,
    REPAIR_BY_ID: (id) => `/classes/Repair/${id}`,
    CREATE_REPAIR: '/classes/Repair',
    EDIT_REPAIR: (id) => `/classes/Repair/${id}`,
    DELETE_REPAIR: (id) => `/classes/Repair/${id}`,
    DETAILS_REPAIR: (id) => `/classes/Repair/${id}`,
    SEARCH_REPAIRS: (page, query) => `/classes/Repair?where=${createQueryParser(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
};

function createQueryParser(query) {
    return encodeURIComponent(JSON.stringify(query));
}
function createQuery(query, name) {
    return { [name]: { $regex: query } };
}

async function getMyRepairs(page, query, name) {
    if (query) { return api.get(endpoints.SEARCH_REPAIRS(page, createQuery(query, name))); }
    return api.get(endpoints.MY_REPAIRS(page));
}
async function getRepairsCount(query, name) {
    if (query) { return api.get(endpoints.REPAIRS_COUNT(createQuery(query, name))); }
    return api.get(endpoints.REPAIRS_COUNT());
}
async function getRepairById(repairId) {
    return api.get(endpoints.REPAIR_BY_ID(repairId));
}
async function createRepair(data) {
    const userId = getUserData().id;
    const body = Object.assign({}, data, {
        owner: {
            __type: 'Pointer',
            className: '_User',
            objectId: userId
        }
    });
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
    login,
    register,
    logout,
    getUserData,
    setUserData,
    removeUserData,
    getMyRepairs,
    getRepairsCount,
    getRepairById,
    createRepair,
    editRepair,
    deleteRepair,
    detailsRepair,
};