export const state = () => ({
  authUser: null,
})

export const mutations = {
  setUser(state, data) {
    state.authUser = data
  },
}

export const actions = {
  async login({ commit }, data) {
    const response = await this.$axios
      .$post('/api/login', data)
      .catch((err) => {
        console.log(err)
        throw new Error(err)
      })

    commit('setUser', response)
  },
  async logout({ commit }) {
    await this.$axios.post('/api/logout')
    commit('setUser', null)
  },
}

export const getters = {
  check: (state) => !!state.authUser,
  user: (state) => (state.authUser ? state.authUser : null),
}
