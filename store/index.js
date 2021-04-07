export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    app.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    await app.$axios
      .get('/api/current_user')
      .then((response) => {
        commit('auth/setUser', response.data)
      })
      .catch((err) => {
        console.error(err)
        commit('auth/setUser', null)
      })
  },
}
