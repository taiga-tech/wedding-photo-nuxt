export default {
  computed: {
    check() {
      return this.$store.getters['auth/check']
    },
    user() {
      return this.$store.getters['auth/user']
    },
  },
}
