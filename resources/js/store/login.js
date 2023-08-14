import {defineStore} from 'pinia'
import {router} from '../router.js'

export const useLogin = defineStore('login', {
    state: () => ({
        user: null,
        error_email: null,
        error_name: null,
        error_password: null,
        success: false,
        message: null
    }),

    getters: {
        userEmail(state) {
            return state.user
        }
    },

    actions: {
        login(data) {
                axios.post('/api/auth/login', {email: data.email, password: data.password})
                .then(res => {
                    this.success = res.data.success
                    this.message = res.data.message
                    if (this.success) {
                            this.user = res.data.user
                            localStorage.setItem('userData', JSON.stringify(this.user))
                            localStorage.setItem('access_token', res.data.access_token)
                            setTimeout(() => {router.push({name: 'entries'})}, 1500)
                        }
                })
        },

        logout() {
            localStorage.removeItem('userData')
            localStorage.removeItem('access_token')
            this.user = null
            this.message = null
            this.success = false
        },

        register(data) {
            axios.post('/api/auth/register', {email: data.email, name: data.name, password: data.password, password_confirmation: data.password_confirmation})
            .then(res => {
                this.error_email = null
                this.error_name = null
                this.error_password = null
                this.message = res.data.success_message
                setTimeout(() => {this.message = null 
                    router.push({name: 'login'})}, 1500)
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.error_email = error.response.data.errors['email'] ? error.response.data.errors['email'][0] : null
                    this.error_name = error.response.data.errors['name'] ? error.response.data.errors['name'][0] : null
                    this.error_password = error.response.data.errors['password'] ? error.response.data.errors['password'][0] : null
                }
            })
        },

        checkUser()
        {
            this.user = JSON.parse(localStorage.getItem('userData'))
        }
    }
})