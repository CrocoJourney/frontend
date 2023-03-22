import {
    createApp
} from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Register from './views/Register.vue'
import Recovery from './views/Recovery.vue'
import Profile from './views/Profile.vue'
import CreateJourney from './views/CreateJourney.vue'
import CreateGroup from './views/CreateGroup.vue'
import History from './views/History.vue'
import API from './scripts/API'
import Resetpassword from './views/Resetpassword.vue'
import SearchTrips from './views/SearchTrips.vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import "bootstrap-icons/font/bootstrap-icons.json";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/recovery',
            component: Recovery
        }, {
            path: '/reset',
            component: Resetpassword
        },
        {
            path: '/createjourney',
            component: CreateJourney
        },
        {
            path: '/creategroup',
            component: CreateGroup
        },
        {
            path: '/history',
            component: History
        },
        {
            name: 'searchTrips',
            path: '/searchTrips',
            component: SearchTrips
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
})

createApp(App).use(router).mount('#app')