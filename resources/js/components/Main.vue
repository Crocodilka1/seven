<script setup>
    import {useLogin} from "../store/login.js"
    import { mapStores } from 'pinia'
    import { router } from "../router.js"
    const store = useLogin()
    store.checkUser()
</script>

<template>
    <div>
        <ul class="nav nav-tabs" v-if=!loginStore.user>
            <li class="nav-item">
                <router-link :to="{ name: 'login'}" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'registration'}" class="nav-link">Registration</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'entries'}" class="nav-link">Entries</router-link>
            </li>
        </ul>
        <ul class="nav nav-tabs" v-else>
            <li class="nav-item">
                <a class="nav-link" aria-disabled="true">{{ loginStore.user.name }}</a>
            </li>
            <li class="nav-item">
                <input type="button" @click.prevent="store.logout" class="btn btn-danger" value="Log Out">
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'entries'}" class="nav-link">Entries</router-link>
            </li>
        </ul>
    </div>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        ...mapStores(useLogin),
    },

    mounted() {
        router.push({name: 'entries'})
    },
}
</script>
