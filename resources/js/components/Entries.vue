<script setup>
    import {showEntries} from "../store/entry.js"
    import {useLogin} from "../store/login.js"
    import { mapStores} from 'pinia'
    const store = showEntries()
    const user = useLogin()
    store.getEntries()
</script>
<template>
    <div class="position-absolute top-50 start-50 translate-middle">
    <template v-if="entryStore.entries">
        <table class="table">
            <tbody>
                <template v-for="entri in entryStore.entries">
                    <tr>
                        <td>{{ entri.content }}</td>
                        <template v-if="loginStore.user && (entri.user_id == loginStore.user.id || loginStore.user.role == 0)">
                            <td><input @click.prevent="store.deleteEntry({id: entri.id})" class="btn btn-danger col-3" value="Delete">
                            <input @click.prevent="store.editEntry({id: entri.id})" class="btn btn-primary col-3" value="Edit"></td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </template>
    <div v-if="loginStore.user">
        <input type="text" v-model="content" placeholder="Enter the entry">
        <input type="button" @click.prevent="store.putEntry({content: this.content, user_id: loginStore.user.id})" class="btn btn-primary" value="Send">
    </div>
    <div v-else>
        <input type="text" v-model="content" placeholder="Enter the entry">
        <input type="button" @click.prevent="store.putEntry({content: this.content, user_id: null})" class="btn btn-primary" value="Send">
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: null,
            }
        },

        computed: {
            ...mapStores(showEntries, useLogin),
        },    
    }   
</script>