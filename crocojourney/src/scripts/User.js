import API from './API.js';
class User {
    static currentUser = User.fromLocalStorage();
    admin = false;
    static fromLocalStorage() {
        const localData = localStorage.getItem('user');
        if(localData=="undefined"){
            return new User();
        } 
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
        if (User.currentUser === undefined || User.currentUser.accessToken === undefined) {
            return false;
        } else {
            return true;
        }
    }
    static async logout() {
        const JSONbody = JSON.stringify({
            refresh_token: User.currentUser.refreshToken
        });
        const res = await API.requestLogged(API.METHOD.POST, "/auth/logout", JSONbody);
        if(res.message ==="ok"){
            User.currentUser = undefined;
            localStorage.removeItem('user');
        }else{
            throw Error(res)
        }
    }
}

window.User = User;
export default User;