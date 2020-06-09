export const strict = false

export const state = () => ({
    snackMessage: ''
})

export const getters = {
    snackMessage: state => state.snackMessage
}

export const mutations = {
    setSnackMessage(state, snackMessage) {
        state.snackMessage = snackMessage
    }
}

export const actions = {
    setSnackMessage({commit}, payload) {
        commit('setSnackMessage', payload)
    }
}
