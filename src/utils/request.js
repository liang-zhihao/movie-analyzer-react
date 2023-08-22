import axios from "axios";

import userStore from "../stores/userStore";


let headers = {'content-type': 'application/json'}
let INSTANCE = axios.create({

    timeout: 10000,
    headers,
});
// "refreshToken": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMi5jb20iLCJleHAiOjE2ODI1ODg4NDMsImlhdCI6MTY4MjUwMjQ0M30.of8euE0STH9XxZr8nRn5nd_rg4IckCIGKkQ2i7-FA0M",
//     "token_type": "Refresh",
//     "expires_in": 86400
// }
//  refresh
INSTANCE.interceptors.request.use(
    async (config) => {
        const bearerToken = userStore.bearerToken
        const refreshToken = userStore.refreshToken
        // is url contains Logout and login
        // if (config.url.includes('logout') || config.url.includes('login')) {
        //     alert('logout')
        //     return config;
        // }
        if (bearerToken) {
            const expirationTime = userStore.bearerTokenExpiresIn;
            // Check if the access token is expired or about to expire
            if (expirationTime) {
                try {
                    // Refresh the access token
                    await userStore.refresh();
                    const newToken = userStore.bearerToken
                    config.headers.Authorization = `Bearer ${newToken}`;
                } catch (error) {
                    console.error('Error refreshing access token:', error);
                }
            }

            // Set the Authorization header with the access token

        }
        return config;
    },
    (error) => {
        // console.error('Error with outgoing request:', error);
        return Promise.reject(error);
    }
);

// INSTANCE.interceptors.request.use(
//     config => {
//         //token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFuZyIsImV4cCI6MTU4NzIyNDM0NSwiaWF0IjoxNTg3MjE3MTQ1fQ.GvHmecWhnJSQp5pq9ccGLOok1DmYle55u3k7ZcJSvyJJAfb9BZushjvKa6vEdwLQvcmIBpKu0QrINUZIkvD_rQ"
//         let token = getToken()
//         token && (config.headers.Authorization = token);
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
// INSTANCE.interceptors.response.use(
//     response => {
//         if (response['data']['code'] === 200) 
//             return Promise.resolve(response)
//         } else {
//             return Promise.reject(response)
//         }
//     }
// )
const DEBUG = true

function request(url, method, params) {
    return new Promise((resolve, reject) => {
        let data = {}

        if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
            data = params
        }
        // if (DEBUG) {
        //     console.log('Sending data', data)
        // }

        INSTANCE({url, method, data}).then((res) => {
            // if (DEBUG) {
            //     console.log(res)
            // }
            resolve(res['data'])
        }).catch((err) => {

            reject(err)
        }).finally(() => {

        })


    })
}

// function get(url, params) {
//     return request(url, params, 'get')
// }

// function put(url, params) {
//     return request(url, params, 'put')
// }

// function delete_(url, params) {
//     return request(url, params, 'delete')
// }

// function post(url, params) {
//     return request(url, params, 'post')
// }

export default request

