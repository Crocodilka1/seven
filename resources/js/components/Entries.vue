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
    <template v-if="entryStore.success_message">
        <div class = "alert alert-success">{{ entryStore.success_message }}</div>
    </template>
    <template v-if="entryStore.entries">
        <table class="table">
            <tbody>
                <template v-for="entri in entryStore.entries">
                    <tr>
                        <template v-if="entri.id == entryStore.editId">
                            <input type="text" class="form-control" v-model="editContent">
                        </template>
                        <template v-else>
                            <td>{{ entri.content }}</td>
                        </template>
                        <template v-if="loginStore.user && (entri.user_id == loginStore.user.id || loginStore.user.role == 0)">
                            <template v-if="entri.id == entryStore.editId">
                                <td><input @click.prevent="store.editEntry({id: entri.id, content: this.editContent})" class="btn btn-success col-5" value="Ok">
                                <input @click.prevent="store.cancelEdit()" class="btn btn-danger col-5" value="Cancel"></td>
                            </template>
                            <template v-else>
                                <td><input @click.prevent="store.deleteEntry({id: entri.id})" class="btn btn-danger col-5" value="Delete">
                                <input @click.prevent="store.successEdit({id: entri.id})" class="btn btn-primary col-5" value="Edit"></td>
                            </template>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </template>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a type="button" class="page-link" @click="store.getEntries({page: entryStore.current_page - 1})">Previous</a></li>
                <template v-for="id in entryStore.last_page">
                    <li class="page-item"><a type="button" class="page-link" @click="store.getEntries({page: id})">{{ id }}</a></li>
                </template>
                <li class="page-item"><a type="button" class="page-link" @click="store.getEntries({page: entryStore.current_page + 1})">Next</a></li>
            </ul>
        </nav>
    <div v-if="loginStore.user">
        <input type="text" v-model="content" placeholder="Enter the entry">
        <input type="button" @click.prevent="store.putEntry({content: this.content, user_id: loginStore.user.id})" class="btn btn-primary" value="Send">
    </div>
    <div v-else>
        <input type="text" v-model="content" placeholder="Enter the entry">
        <input type="button" @click.prevent="store.putEntry({content: this.content, user_id: null})" class="btn btn-primary" value="Send">
    </div>
    </div>
    <div v-if="entryStore.error_message" class="alert alert-danger">{{ entryStore.error_message }}</div>
</template>
<script>
    export default {
        data() {
            return {
                content: null,
                editContent: null,
            }
        },

        computed: {
            ...mapStores(showEntries, useLogin),
        },    
    }   
</script>