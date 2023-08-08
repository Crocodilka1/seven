import {defineStore} from 'pinia'

export const showEntries = defineStore('entry', {
    state: () => ({
        entries: null,
        last_page: null,
        links: null,
        current_page: null
    }),

    actions: {
        putEntry(data) {
            axios.post('/api/entry', {content: data.content, user_id: data.user_id})
            .then(res => {
                this.getEntries()
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
            axios.patch(`/api/entry/${data.id}`, {content: data.content})
            .then(res => {
                this.getEntries()
            })
        },

        deleteEntry(data) {
            axios.delete(`/api/entry/${data.id}`)
            .then(res => {
                this.getEntries()
            })
        }
    }
})