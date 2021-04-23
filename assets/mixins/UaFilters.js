export default {
  computed: {
    awsCdnUrl() {
      return process.env.AWS_CDN_URL
    },
  },

  methods: {
    conversion(endpoint, path) {
      if (endpoint === '' || path.slice(0, 4) === 'data') {
        return path
      }
      if (this.$ua.isFromSmartphone()) {
        return endpoint + path + '?p=t'
      }
      if (this.$ua.browser() === 'Safari') {
        return endpoint + path
      } else {
        return endpoint + path + '?p=t'
      }
    },
  },
}
