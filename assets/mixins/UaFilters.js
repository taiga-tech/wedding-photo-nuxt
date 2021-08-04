export default {
  computed: {
    awsCdnUrl() {
      return process.env.AWS_CDN_URL
    },
  },

  methods: {
    conversion(endpoint, path) {
      const url = endpoint + path

      if (endpoint === '' || path.slice(0, 4) === 'data') {
        return path
      }

      if (
        this.$ua.browser() === 'Safari' &&
        parseFloat(this.$ua.browserVersion()) < 14.1
      ) {
        return url
      }

      return url + '?p=t'
    },
  },
}
