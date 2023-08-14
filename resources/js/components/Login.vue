<script setup>
import {useLogin} from "../store/login.js"
import { mapStores } from 'pinia'
const store = useLogin()
</script>
<template>
    <div class="position-absolute top-50 start-50 translate-middle col-3">
        <template v-if="!loginStore.success">
            <div class = "alert alert-danger" v-if="loginStore.message">{{ loginStore.message }}</div>
            <div class="mb-3">
                <label class="form-label">Введите E-MAIL</label>
                <input v-model="email" type="text" class="form-control" placeholder="Email">
                <div style="color: red;" v-if="loginStore.error_email"> *{{ loginStore.error_email }}</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Введите пароль</label>
                <input v-model="password" type="password" class="form-control" placeholder="Password">
                <div style="color: red;" v-if="loginStore.error_password"> *{{ loginStore.error_password }}</div>
            </div>
            <input @click.prevent="store.login({email: this.email, password: this.password})" class="btn btn-primary" value="Submit">
        </template>
        <template v-else>
            <div class = "alert alert-success">{{ loginStore.message }}</div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null
        }
    },

    computed: {
        ...mapStores(useLogin)
    }
}
</script>
