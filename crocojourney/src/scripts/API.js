import User from './User.js';
class API {
    static API_URL =
        import.meta.env.DEV ? 'http://localhost:8000' : 'https://crocojourney-api.antoninrousseau.fr';

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

    /**
     * @typedef {string} CONTENT_TYPE
     */

    /**
     * @enum {CONTENT_TYPE}
     */
    static CONTENT_TYPE = {
        JSON: 'application/json',
        URL_ENCODED: 'application/x-www-form-urlencoded',
        FORM_DATA: 'multipart/form-data'
    };

    static get AuthorizationHeader() {
        return 'x-crocojourney-authorization';
    }

    /**
     *
     * @param {METHOD} method
     * @param {String} url route de l'API
     * @param {*} body corps de la requête
     * @param {*} headers headers à rajouter à la requête
     * @param {CONTENT_TYPE} type du body 
     */
    static request(method, url, body, headers, contentType = this.CONTENT_TYPE.JSON) {
        return new Promise(async (resolve, reject) => {
            const headerConstructor = new Headers();
            headerConstructor.append("Sec-Fetch-Mode", "cors");
            headerConstructor.append("Sec-Fetch-Site", "same-origin");
            headerConstructor.append("Sec-Fetch-Dest", "empty");
            headerConstructor.append("Referer", window.location.origin);
            headerConstructor.append("Content-Type", contentType);
            if (contentType == this.CONTENT_TYPE.FORM_DATA ) {
                headerConstructor.delete("Content-Type")
            }
            headerConstructor.append("Accept", "application/json");
            for (const key in headers) {
                headerConstructor.append(key, headers[key]);
            }
            const response = await fetch(`${API.API_URL}${url}`, {
                method: method,
                headers: headerConstructor,
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
     * @param {*} body body of the request maybe json or form data etc..
     * @param {CONTENT_TYPE} contentType type du body , utilisé dans le header de la requete
     * @returns
     */
    static requestLogged(method, url, body, contentType) {
        return new Promise(async (resolve, reject) => {
            try {
                // on fait la requete avec le token en header
                const res = await API.request(method, url, body, {
                    [API.AuthorizationHeader]: `Bearer ${User.currentUser.accessToken}`,
                }, contentType);
                resolve(res);
            } catch (err) {
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

    static async login(username, password) {
        try {
            const body = `username=${username}&password=${password}`;
            const res = await API.request(API.METHOD.POST, "/auth/login", body, undefined, API.CONTENT_TYPE.URL_ENCODED);
            User.currentUser = new User();
            User.currentUser.accessToken = res.access_token;
            User.currentUser.refreshToken = res.refresh_token;
            await User.currentUser.fetchInfo();
            User.saveToLocalStorage();
        } catch (error) {
            const json = await error.json();
            throw new Error(json.detail);
        }
    }


    static reset(email) {
        const JSONbody = JSON.stringify({
            mail: email,
        });
        return new Promise((resolve, reject) => {
            fetch(`${API.API_URL}/auth/reset`, {
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
                    body: JSONbody,
                })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then(async (data) => {
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

    static register(firstName, lastName, sex, email, phone, hasVehicle, profilePic, password, passwordConfirm) {
        return new Promise((resolve, reject) => {
            fetch(`${API.API_URL}/users/`, {
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
                    body: `firstname=${firstName}&lastname=${lastName}&mail=${email}&password=${password}&confirmPassword=${passwordConfirm}&phonenumber=${phone}&car=${hasVehicle}&sex=${sex}&mailNotification=true`,
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

    static createJourney(title,departure, group, arrival, typeRadioPublique, precisionsRDV, contraintes, places, prix, date) {
        return new Promise((resolve, reject) => {
            fetch(`${API.API_URL}/trips/`, {
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
                    body: `title=${title}&size=${places}&constraints=${contraintes}&precisions=${precisionsRDV}&price=${prix}&private=${typeRadioPublique}&steps=${password}&departure=${departure}&group=${group}&arrival=${arrival}&date=${date}`,
                })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then(async (data) => {
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