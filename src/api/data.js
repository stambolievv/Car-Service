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


// DB requests
const endpoints = {
    MY_REPAIRS: '/classes/Repair?order=-createdAt',
    REPAIR_BY_ID: (id) => `/classes/Repair/${id}`,
    CREATE_REPAIR: '/classes/Repair',
    EDIT_REPAIR: (id) => `/classes/Repair/${id}`,
    DELETE_REPAIR: (id) => `/classes/Repair/${id}`,
    DETAILS_REPAIR: (id) => `/classes/Repair/${id}`,
    SEARCH_REPAIRS: (query) => `/classes/Repair?where=${createQuery(query)}`,
};

function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}

async function getMyRepairs(page, query, name) {
    if (query) {
        query = { [name]: { $text: { $search: { $term: query } } } };
        // query = { [name]: query };
        return api.get(endpoints.SEARCH_REPAIRS(query));
    }
    return api.get(endpoints.MY_REPAIRS);
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
    getRepairById,
    createRepair,
    editRepair,
    deleteRepair,
    detailsRepair,
};