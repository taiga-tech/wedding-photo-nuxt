export const state = () => ({
  posts: null,
  post: null,
})

export const getters = {
  index: (state) => (state.posts ? state.posts : null),
  post: (state) => (state.post ? state.post : null),
}

export const mutations = {
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
        this.$rollbar.error(err)
        throw new Error('画像取得に失敗しました ページを再読み込みしてください')
      })
  },

  async store({ commit }, data) {
    await this.$axios
      .post('/api/posts', data)
      .then((response) => {
        commit('setPost', response.data)
      })
      .catch((err) => {
        console.error(err)
        this.$rollbar.error(err)
        throw new Error(
          '送信に失敗しました ページを再読み込みしてもう一度お試しください'
        )
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
        this.$rollbar.error(err)
        throw new Error(err)
      })
  },
}
