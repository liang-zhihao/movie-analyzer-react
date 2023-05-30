import request from '../utils/request'
import { apiPrefix } from '../utils/config';
const API_ENDPOINTS = {

    search: 'GET /movies/search',
    data: 'GET /movies/data/:imdbID',


    get: 'GET /people/:id',


    register: 'POST /user/register',
    login: 'POST /user/login',
    refresh: 'POST /user/refresh',
    logout: 'POST /user/logout',


    createUser: 'POST /user',
    removeUser: 'DELETE /user/:id',
    removeUserList: 'POST /users/delete',


};
const generateUrl = (template, params, method) => {
    let url;
    if (method === 'POST' || method === 'PUT') {
        return apiPrefix + template
    }
    try {
        if (template.includes(':')) {
            url = apiPrefix + template
            for (const key in params) {
                url = url.replace(`:${key}`, params[key]);
            }
        } else {
            url = new URL(apiPrefix + template);
            for (const key in params) {
                url.searchParams.set(key, params[key]);
            }
        }
    } catch (e) {

        console.log(e)
        console.error(`Error generating URL with template "${template}" and params ${JSON.stringify(params)}: ${e.message}`);
        return apiPrefix;
    }

    return url.toString();
};

const gen = params => {
    let url = apiPrefix + params
    let method = 'GET'

    const paramsArray = params.split(' ')
    if (paramsArray.length === 2) {
        method = paramsArray[0];
        url = paramsArray[1];
    }
 
    return function (data) {
        const finalUrl = generateUrl(url, data, method);
        return request(
            finalUrl,
            method,
            data,
        )
    }
}

const APIFunction = {}
for (const key in API_ENDPOINTS) {
    APIFunction[key] = gen(API_ENDPOINTS[key])
}


export default APIFunction;