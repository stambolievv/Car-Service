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
    myRepairs: '/classes/Repair',
    repairById: (id) => `/classes/Repair/${id}`,
    createRepair: '/classes/Repair',
    editRepair: (id) => `/classes/Repair/${id}`,
    deleteRepair: (id) => `/classes/Repair/${id}`,
    detailsRepair: (id) => `/classes/Repair/${id}`,
    // searchRepairs: (query) => `/data/albums?where=${encodeURIComponent(`name LIKE "${query}"`)}`,
};

async function getMyRepairs() {
    return api.get(endpoints.myRepairs);
}
async function getRepairById(repairId) {
    return api.get(endpoints.repairById(repairId));
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
    return api.post(endpoints.createRepair, body);
}
async function editRepair(repairId, data) {
    return api.put(endpoints.editRepair(repairId), data);
}
async function deleteRepair(repairId) {
    return api.del(endpoints.deleteRepair(repairId));
}
async function detailsRepair(repairId) {
    return api.get(endpoints.detailsRepair(repairId));
}
// async function searchAlbums(query) {
//     return api.get(endpoints.searchAlbums(query));
// }

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
    // searchAlbums,
};