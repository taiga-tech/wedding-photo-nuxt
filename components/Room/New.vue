<template>
  <v-dialog v-model="open" width="500">
    <v-card>
      <v-card-title>new</v-card-title>
      <v-card-text>
        <v-form class="pa-4">
          <v-text-field v-model="nickname" label="nickname" required />

          <v-textarea v-model="message" label="message" />

          <v-file-input
            required
            multiple
            counter
            show-size
            hide-input
            truncate-length="15"
            accept=".jpg,image/jpeg"
            @change="fileChange"
          ></v-file-input>

          <v-img
            v-for="(img, i) in previews"
            :key="i"
            :src="img"
            width="30%"
          ></v-img>

          <v-btn @click="submit">送信</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="check"
        fab
        fixed
        bottom
        right
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
export default {
  middleware: 'not_logined_user',

  data() {
    return {
      open: false,
      nickname: '',
      message: '',
      photos: [],
      previews: [],
    }
  },

  computed: {
    check() {
      return this.$store.getters['auth/check']
    },
    user() {
      return this.$store.getters['auth/user']
    },
  },

  mounted() {
    this.nickname = localStorage.getItem('nickname')
  },

  methods: {
    async submit() {
      this.$parent.previews = this.previews
      this.open = false
      const formData = new FormData()
      formData.append('nickname', this.nickname)
      localStorage.setItem('nickname', this.nickname)
      formData.append('message', this.message)
      if (this.photos.length !== 0) {
        for (let i = 0; i < this.photos.length; i++) {
          formData.append(`files[${i}][photo]`, this.photos[i])
        }
      }

      this.formReset()

      await this.$axios
        .post('/api/posts', formData)
        .then((response) => {
          this.post = response.data
        })
        .catch((err) => {
          console.log(err)
          this.$parent.error = err
          this.$parent.previews = []
          this.formReset()
        })
    },

    fileChange(event) {
      const fileList = event
      if (fileList.length + this.photos.length > 6) {
        this.reset()
        alert(`画像は最大6枚までです`)
        return false
      }
      for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].type.match('image.*')) {
          this.reset()
          return false
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previews.push(e.target.result)
        }
        reader.readAsDataURL(fileList[i])
      }
      if (fileList.length !== 0) {
        this.previews = []
        this.photos = Array.from(fileList)
      }
    },

    formReset() {
      this.message = null
      this.previews = []
      this.photos = []
    },

    reset() {
      this.previews = []
      this.$parent.previews = []
      this.photos = []
      this.$el.querySelector('input[type="file"]').value = null
    },
  },
}
</script>
