export default {
  data() {
    return {
      status: false,
      error: null,
      message: null,
    }
  },

  methods: {
    async onRequest(data) {
      // console.log(
      //   data.user.id,
      //   data.user.name,
      //   data.user.role,
      //   data.id,
      //   data.nickname,
      //   data.message,
      //   data.photos.length,
      //   data.created_at,
      //   data
      // )
      const contacts = new URLSearchParams()
      contacts.append('form-name', 'request')
      contacts.append('userId', data.user.id)
      contacts.append('userName', data.user.name)
      contacts.append('userRole', data.user.role)
      contacts.append('id', data.id)
      contacts.append('nickname', data.nickname)
      contacts.append('message', data.message)
      contacts.append('photos', data.photos.length)
      contacts.append('created_at', data.created_at)
      contacts.append('data', JSON.stringify(data))
      await this.$axios
        // .$post('/', contacts)
        // .$post('localhost', contacts) // error handling
        .$post(window.location.origin, contacts)
        .catch((err) => {
          console.error(err)
          this.$rollbar.error(err)
          this.error = {
            status: false,
            message: `削除依頼に失敗しました`,
          }
        })
    },

    download(e, index, obj) {
      if (e === 0) {
        console.log(obj.photos)
      } else if (e === 1) {
        console.log(obj.photos[index].path)
      } else if (e === 2) {
        // console.log(e, obj)
        this.onRequest(obj)
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
