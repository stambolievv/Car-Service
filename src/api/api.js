import { getUserData, setUserData, removeUserData } from './data.js';

const location = {
    protocol: 'https:',
    hostname: 'parseapi.back4app.com',
};

const endpoints = {
    LOGIN: '/login',
    REGISTER: '/users',
    LOGOUT: '/logout'
};

async function request(path, options) {
    try {
        const response = await fetch(`${location.protocol}//${location.hostname}${path}`, options);

        if (response.ok != true) {
            if (response.status == 403) { removeUserData(); }
            const error = await response.json();
            throw new Error(error.error);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }

    } catch (error) {
        throw error;
    }
}

function createOption(method, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '0oqWvkMylRfPgcnXNXtOUe8SWSqDZPiHktiLW9Np',
            'X-Parse-REST-API-Key': '4YzVVeTWOVJyamwDNrNaafCLGzwC5qWnt7dw9aot'
        }
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();
    if (user != null) {
        options.headers['X-Parse-Session-Token'] = user.token;
    }

    return options;
}

// CRUD
async function get(path) {
    return request(path, createOption('GET'));
}
async function post(path, data) {
    return request(path, createOption('POST', data));

}
async function put(path, data) {
    return request(path, createOption('PUT', data));

}
async function del(path) {
    return request(path, createOption('DELETE'));
}

// authentication
async function login(data) {
    const result = await post(endpoints.LOGIN, data);

    const userData = JSON.stringify({
        username: data.username,
        id: result.objectId,
        token: result.sessionToken
    });

    setUserData(userData);

    return result;
}
async function register(data) {
    const result = await post(endpoints.REGISTER, data);

    const userData = JSON.stringify({
        username: data.username,
        id: result.objectId,
        token: result.sessionToken
    });

    setUserData(userData);

    return result;
}
async function logout() {
    await post(endpoints.LOGOUT, {});
    removeUserData();
}

export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout,
};