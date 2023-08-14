<script setup>
import {useLogin} from "../store/login.js"
import { mapStores } from 'pinia'
const store = useLogin()
</script>
<template>
    <div class="position-absolute top-50 start-50 translate-middle col-3">
            <div v-if="loginStore.message" class="alert alert-success">{{ loginStore.message }}</div>
            <div class="mb-3">
                <label class="form-label">E-MAIL</label>
                <input v-model="email" type="email" class="form-control" placeholder="Email">
                <div style="color: red;" v-if="loginStore.error_email"> *{{ loginStore.error_email }}</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Имя пользователя</label>
                <input v-model="name" type="text" class="form-control" placeholder="Username">
                <div style="color: red;" v-if="loginStore.error_name"> *{{ loginStore.error_name }}</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Пароль</label>
                <input v-model="password" type="password" class="form-control" placeholder="Password">
                <div style="color: red;" v-if="loginStore.error_password"> *{{ loginStore.error_password }}</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Подтвердите пароль</label>
                <input v-model="password_confirmation" type="password" class="form-control" placeholder="Password Confirmed">
            </div>
            <input @click.prevent="store.register({email: this.email, password: this.password, name: this.name, password_confirmation: this.password_confirmation})" class="btn btn-primary" value="Submit">
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            name: null,
            password: null,
            password_confirmation: null
        }
    },

    computed: {
        ...mapStores(useLogin)
    }
}
</script>

