import {defineStore} from 'pinia'

export const showEntries = defineStore('entry', {
    state: () => ({
        entries: null
    }),

    actions: {
        putEntry(data) {
            axios.post('/api/entry', {content: data.content, user_id: data.user_id})
            .then(res => {
                console.log(res.data)
                this.getEntries()
            })
        },

        getEntries() {
            axios.get('/api/entry')
            .then(res => {
                this.entries = res.data
            })
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
                console.log('Deleted')
                this.getEntries()
            })
        }
    }
})