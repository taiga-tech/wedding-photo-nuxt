export const state = () => ({
  authUser: null,
})

export const getters = {
  check: (state) => !!state.authUser,
  user: (state) => (state.authUser ? state.authUser : null),
}

export const mutations = {
  setUser(state, data) {
    state.authUser = data
  },
}

export const actions = {
  async login({ commit }, data) {
    await this.$axios
      .post('/api/login', data)
      .then((response) => {
        commit('setUser', response.data)
      })
      .catch((err) => {
        console.error(err)
        throw new Error('ログインに失敗しました もう一度お試しください')
      })
  },

  async logout({ commit }) {
    await this.$axios.post('/api/logout')
    commit('setUser', null)
  },
}
