<template>
  <v-dialog v-model="open" width="500">
    <v-card>
      <v-form v-model="valid" class="pa-4">
        <v-text-field
          v-model="nickname"
          label="nickname"
          required
          :rules="rules.nickname"
        />

        <v-file-input
          v-model="photos"
          :rules="rules.photos"
          label="Photos"
          :counter="6"
          required
          multiple
          show-size
          prepend-icon="mdi-camera"
          accept=".jpg,image/jpeg"
          dense
          @change="fileChange"
          @click:clear="reset"
        ></v-file-input>

        <v-text-field v-model="message" label="message"> </v-text-field>

        <room-preview
          v-if="previews.length !== 0"
          :previews="previews"
          :photos="photos"
        />

        <v-btn :disabled="!valid" block @click="submit">送信</v-btn>
      </v-form>
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
import ValidateRules from '~/assets/mixins/ValidateRules.js'

export default {
  mixins: [AuthComputed, ValidateRules],

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
      ? localStorage.getItem('nickname')
      : null
  },

  methods: {
    fileChange() {
      // とりあえずpreview === photosを実現、改善余地あり
      if (this.photos.length === 0) {
        this.reset()
      }
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
      if (this.photos.length !== 0) {
        this.previews = []
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
