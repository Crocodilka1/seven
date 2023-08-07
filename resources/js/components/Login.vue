<script setup>
import {useLogin} from "../store/login.js"
import { mapStores } from 'pinia'
const store = useLogin()
</script>
<template>
    <div class="position-absolute top-50 start-50 translate-middle col-3">
            <div class = "alert alert-danger" v-if="!loginStore.success">{{ loginStore.message }}</div>
            <div class="mb-3">
                <label class="form-label">Введите E-MAIL</label>
                <input v-model="email" type="text" class="form-control" placeholder="Email">
            </div>
            <div class="mb-3">
                <label class="form-label">Введите пароль</label>
                <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <input @click.prevent="store.login({email: this.email, password: this.password})" class="btn btn-primary" value="Submit">
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
