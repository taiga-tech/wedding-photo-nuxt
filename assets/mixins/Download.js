export default {
  methods: {
    download(e, index, obj) {
      if (e === 0) {
        console.log(obj.photos)
      } else if (e === 1) {
        console.log(obj.photos[index].path)
      }

      // await this.$axios
      //   .get('/api/posts/download', {
      //     params: { path: ['/api', 'logined_user'] },
      //     responseType: 'arraybuffer',
      //   })
      //   .then((response) => {
      //     // const blob = new Blob([response.data], { type: 'image/jpeg' })
      //     // const url = (window.URL || window.webkitURL).createObjectURL(blob)
      //     // link作成してダウンロードがいいぽい
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    },
  },
}
