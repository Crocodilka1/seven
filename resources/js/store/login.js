import {defineStore} from 'pinia'
import {router} from '../router.js'

export const useLogin = defineStore('login', {
    state: () => ({
        user: null,
        error_email: null,
        error_name: null,
        error_password: null,
        success: true,
        message: null
    }),

    getters: {
        userEmail(state) {
            return state.user
        }
    },

    actions: {
        login(data) {
                axios.post('/api/login', {email: data.email, password: data.password})
                .then(res => {
                    this.success = res.data.success
                    this.message = res.data.message
                    if (this.success) {
                        this.user = res.data.user
                        localStorage.setItem('access_token', res.data.token)
                        router.push({name: 'entries'})
                    }
                })
        },

        logout() {
            axios.post('/api/logout')
            .then(res => {
                if (res.data) this.user = null
                router.push({name: 'main'})
            })
        },

        register(data) {
            axios.post('/api/register', {email: data.email, name: data.name, password: data.password, password_confirmation: data.password_confirmation})
            .then(res => {
                if(res.data){
                if (res.data.email) this.error_email = res.data.email[0]
                if (res.data.name) this.error_name = res.data.name[0]
                if (res.data.password) this.error_password = res.data.password[0]
                }
                else router.push({name: 'login'})
            })
        }
    }
})