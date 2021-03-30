export const state = () => ({
  posts: null,
  post: null,
})

export const mutations = {
  // setError(state, data) {},
  setPosts(state, data) {
    state.posts = data
  },

  setPost(state, data) {
    state.post = data
  },
}

export const actions = {
  async index({ commit }, id) {
    await this.$axios
      .get(`/api/room/${id}`)
      .then((response) => {
        commit('setPosts', response.data.reverse())
      })
      .catch((err) => {
        console.error(err)
        commit('setError', err)
      })
  },

  async show({ commit }, { roomId, id }) {
    await this.$axios
      .get(`/api/room/${roomId}/photos/${id}`)
      .then((response) => {
        commit('setPost', response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
}

export const getters = {
  index: (state) => (state.posts ? state.posts : null),
  show: (state) => (state.post ? state.post : null),
}
