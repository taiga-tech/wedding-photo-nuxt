export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    await app.$axios
      .$get('/api/current_user')
      .then((response) => {
        commit('auth/setUser', response)
      })
      .catch((err) => {
        console.log(err)
        commit('auth/setUser', null)
      })
  },
}
