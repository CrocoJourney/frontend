import User from './User.js';
class API {
    static API_URL = import.meta.env.DEV ? 'http://localhost:8000' : 'https://crocojourney-api.antoninrousseau.fr';

    /**
     * @typedef {string} METHOD
     */

    /**
     * @enum {METHOD}
     */
    static METHOD = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
    };
    static get AuthorizationHeader() {
        return 'x-crocojourney-authorization';
    }
    /**
     *
     * @param {METHOD} method
     * @param {*} url
     * @param {*} data
     * @param {*} headers
     */
    static request(method, url, body, headers) {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${API.API_URL}${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Dest': 'empty',
                    Referer: window.location.origin,
                    ...headers,
                },
                mode: 'cors',
                body: body,
            });
            switch (response.status) {
                case 200:
                    response.json().then((data) => {
                        resolve(data);
                    });
                    break;
                default:
                    reject(response);
                    break;
            }
        });
    }
    /**
     *
     * @param {METHOD} method
     * @param {string} url /users ...
     * @param {*} data body of the request maybe json or form data etc..
     * @returns
     */
    static requestLogged(method, url, body) {
        return new Promise(async (resolve, reject) => {
            try {
                // on fait la requete avec le token en header
                const res = await API.request(method, url, body, {
                    [API.AuthorizationHeader]: `Bearer ${User.currentUser.accessToken}`,
                });
                resolve(res);
            } catch (err) {
                console.log('requestLogged error');
                // si on a une erreur 401 on refresh les tokens
                switch (err.status) {
                    case 401:
                        try {
                            await API.refreshTokens();
                        } catch (err) {
                            reject(err);
                        }
                        // on refait la requete avec le nouveau token
                        const res2 = await API.request(method, url, body, {
                            [API.AuthorizationHeader]: User.currentUser.accessToken,
                        });
                        switch (res2.status) {
                            case 200:
                                resolve(res2);
                            default:
                                reject(res2);
                        }
                        break;
                    default:
                        reject(err);
                        break;
                }
            }
        });
    }
    static refreshTokens() {
        return new Promise((resolve, reject) => {
            fetch(`${API.API_URL}/auth/refresh`, {
                method: API.METHOD.POST,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Dest': 'empty',
                    Referer: window.location.origin,
                },
                mode: 'cors',
                // add refresh_token to body in json
                body: JSON.stringify({
                    refresh_token: `${User.currentUser.refreshToken}`,
                }),
            })
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            response.json().then((data) => {
                                User.currentUser.accessToken = data.access_token;
                                User.currentUser.refreshToken = data.refresh_token;
                                User.saveToLocalStorage();
                                resolve(data);
                            });
                            break;
                        case 401:
                            window.location.href = '/login';
                            break;
                        default:
                            reject(response);
                            break;
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    static login(username, password) {
        return new Promise((resolve, reject) => {
            fetch(`${API.API_URL}/auth/login`, {
                method: API.METHOD.POST,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Dest': 'empty',
                    Referer: window.location.origin,
                },
                mode: 'cors',
                body: `username=${username}&password=${password}`,
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then(async (data) => {
                            User.currentUser = new User();
                            User.currentUser.accessToken = data.access_token;
                            User.currentUser.refreshToken = data.refresh_token;
                            await User.currentUser.fetchInfo();
                            User.saveToLocalStorage();
                            resolve(data);
                        });
                    } else {
                        reject(response);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
window.API = API;
export default API;
