import API from './API.js';
class User {
    static currentUser = User.fromLocalStorage();
    admin = false;
    static fromLocalStorage() {
        const localData = localStorage.getItem('user');
        return localData ? User.fromJSON(localData) : new User();
    }
    static saveToLocalStorage(user = User.currentUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    fetchInfo() {
        return new Promise((resolve, reject) => {
            API.requestLogged(API.METHOD.GET, '/users/me', null)
                .then((data) => {
                    this.id = data.id;
                    this.mail = data.mail;
                    this.firstname = data.firstname;
                    this.lastname = data.lastname;
                    this.phonenumber = data.phonenumber;
                    this.car = data.car;
                    this.sex = data.sex;
                    this.admin = data.admin;
                    this.mailNotification = data.mailNotification;
                    this.photoPath = data.photoPath;
                    resolve(this);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    static fromJSON(json) {
        const user = new User();
        Object.assign(user, JSON.parse(json));
        return user;
    }
    static isLoggedIn() {
        return User.currentUser !== undefined && User.currentUser.accessToken !== undefined;
    }
}

window.User = User;
export default User;
