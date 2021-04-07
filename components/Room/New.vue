<template>
  <v-dialog v-model="open" width="500">
    <v-card>
      <v-card-title>new</v-card-title>
      <v-card-text>
        <v-form class="pa-4">
          <v-text-field v-model="nickname" label="nickname" required />

          <v-textarea v-model="message" label="message" />

          <div>
            <v-img
              v-for="(img, i) in previews"
              :key="i"
              :src="img.path"
              :aspect-ratio="img.aspect"
              width="30%"
            />
          </div>

          <v-file-input
            v-model="photos"
            label="images"
            required
            multiple
            counter
            show-size
            prepend-icon="mdi-camera"
            accept=".jpg,image/jpeg"
            @change="fileChange"
          ></v-file-input>

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
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  middleware: 'not_logined_user',

  data() {
    return {
      loading: false,
      open: false,
      nickname: '',
      message: null,
      photos: [],
      previews: [],
    }
  },

  mounted() {
    this.nickname = localStorage.getItem('nickname')
  },

  methods: {
    fileChange() {
      for (let i = 0; i < this.photos.length; i++) {
        if (!this.photos[i].type.match('image.*')) {
          this.reset()
          return false
        }
        const image = new Image()
        const reader = new FileReader()
        reader.onload = () => {
          image.src = reader.result
          image.onload = () => {
            const asp = image.naturalWidth / image.naturalHeight
            this.previews.push({ path: image.src, aspect: asp })
          }
        }
        reader.readAsDataURL(this.photos[i])
      }
    },

    async submit() {
      this.open = false
      this.loading = true
      this.$parent.error = null
      this.$parent.previews = this.previews
      const formData = new FormData()
      localStorage.setItem('nickname', this.nickname)
      formData.append('nickname', this.nickname)
      formData.append('message', this.message)
      if (this.photos.length !== 0) {
        for (let i = 0; i < this.photos.length; i++) {
          formData.append(`files[${i}][photo]`, this.photos[i])
          formData.append(`aspect[${i}]`, this.previews[i].aspect)
        }
      }

      await this.$store
        .dispatch('room/store', formData)
        .then(() => {
          this.loading = false
          this.$parent.getPhotos()
          this.formReset()
        })
        .catch((err) => {
          this.$parent.error = err
          console.error(err)
          this.$parent.previews = []
        })
    },

    formReset() {
      this.message = null
      this.photos = []
      this.previews = []
      this.$parent.previews = []
    },

    reset() {
      this.photos = []
      this.previews = []
      this.$parent.previews = []
    },
  },
}
</script>
