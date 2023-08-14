import {defineStore} from 'pinia'

export const showEntries = defineStore('entry', {
    state: () => ({
        entries: null,
        last_page: null,
        links: null,
        current_page: null,
        editId: null,
        success_message: null,
        error_message: null
    }),

    actions: {
        putEntry(data) {
            axios.post('/api/entry', {content: data.content, user_id: data.user_id})
            .then(res => {
                this.success_message = res.data.message
                this.getEntries()
                this.error_message = null
                setTimeout(() => {this.success_message = null}, 3000)
                
            })
            .catch(error => {
                if (error.response.status === 422) {
                    console.log(error.response.data.errors.content[0])
                    this.success_message = null
                    this.error_message = error.response.data.errors.content[0]
                }
            })
        },

        getEntries(data) {
            if (data && data.page >= 1 && data.page <= this.last_page) {
                axios.get(this.links[data.page].url)
                .then(res => {
                    this.entries = res.data.data
                    this.last_page = res.data.last_page
                    this.current_page = res.data.current_page
                    this.links = res.data.links
                })
            }
            else {
                axios.get('/api/entry')
                .then(res => {
                    this.entries = res.data.data
                    this.last_page = res.data.last_page
                    this.current_page = res.data.current_page
                    this.links = res.data.links
                })
            }

        },

        editEntry(data) {
            if (localStorage.getItem('access_token')) {
                axios.patch(`/api/entry/${data.id}`, {content: data.content, entry_id: data.id}, {headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}})
                .then(res => {
                    this.editId = null
                    this.getEntries()
                    this.error_message = null
                    this.success_message = res.data
                    setTimeout(() => {this.success_message = null}, 1500)
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        console.log(error.response.data.errors.content[0])
                        this.error_message = error.response.data.errors.content[0]
                    }
                })
            }
        },

        successEdit(data) {
            this.editId = data.id
        },

        deleteEntry(data) {
            if(localStorage.getItem('access_token')) {
                axios.delete(`/api/entry/${data.id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}})
                .then(res => {
                    this.success_message = res.data
                    this.getEntries()
                    setTimeout(() => {this.success_message = null}, 1500)
                })
            }
        },

        cancelEdit() {
            this.editId = null
        },
    }
})