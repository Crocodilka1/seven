import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/', component: () => import('./components/Main.vue'),
            name: 'main'
        },
        {
            path: '/registration', component: () => import('./components/Registration.vue'),
            name: 'registration'
        },
        {
            path: '/login', component: () => import('./components/Login.vue'),
            name: 'login'
        },
        {
            path: '/entries', component: () => import('./components/Entries.vue'),
            name: 'entries'
        },

    ]
})
