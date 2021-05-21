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

    // async downloadLink(path) {
    //   await this.$axios
    //     .post(
    //       '/api/posts/download?path=' + path
    //       // , {
    //       //   params: { path: ['/api', 'logined_user'] },
    //       //   responseType: 'arraybuffer',
    //       // }
    //     )
    //     .then((response) => {
    //       const blob = new Blob(
    //         [response.data]
    //         //  { type: 'image/jpeg' }
    //       )
    //       const url = (window.URL || window.webkitURL).createObjectURL(blob)
    //       // link作成してダウンロードがいいぽい
    //       const link = document.createElement('a')
    //       link.href = window.URL.createObjectURL(url)
    //       link.download = 'sample.jpg'
    //       link.click()
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //       this.$rollbar.error(err)
    //     })
    // },

    download(e, index, obj) {
      if (e === 0) {
        console.log(obj.photos[index].path)
        // this.downloadLink(obj.photos[index].path)
        alert(
          'ごめんなさい間に合いませんでした笑\n画像が欲しい場合はご連絡ください'
        )
      } else if (e === 1) {
        console.log(obj.photos)
        alert(
          'ごめんなさい間に合いませんでした笑\n画像が欲しい場合はご連絡ください'
        )
      } else if (e === 2) {
        // console.log(e, obj)
        this.onRequest(obj)
      }
    },
  },
}
