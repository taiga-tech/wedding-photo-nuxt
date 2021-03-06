<template>
  <v-dialog v-model="open" width="500">
    <v-card color="#12151d">
      <v-toolbar dense flat>
        <v-btn v-if="nickname" icon small @click="cogNickname = !cogNickname">
          <v-icon small>{{ mdiCog }}</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          icon
          color="primary"
          :loading="loading"
          @click="submit"
        >
          <v-icon>{{ mdiSend }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" class="pa-4">
        <v-text-field
          v-if="!nickname || cogNickname"
          v-model="nickname"
          label="ニックネーム"
          placeholder="名前を入力してください"
          :autofocus="!nickname"
          required
          :rules="rules.nickname"
        />

        <room-preview
          v-if="previews.length !== 0"
          :previews="previews"
          :photos="photos"
        />

        <v-file-input
          v-model="photos"
          :rules="rules.photos"
          accept=".jpg,image/jpeg,png,image/png"
          :counter="6"
          multiple
          label="Photo (最大6枚)"
          :prepend-icon="mdiImageMultiple"
          show-size
          dense
          @change="fileChange"
          @click:clear="reset"
        />

        <v-text-field
          v-model="message"
          :rules="rules.msg"
          :counter="30"
          label="メッセージ"
          placeholder="メッセージを入力してください"
        />
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
        aria-label="new-form"
        v-bind="attrs"
        @click="local"
        v-on="on"
      >
        <v-icon>{{ mdiImageMultiple }}</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import { mdiSend, mdiCog, mdiImageMultiple } from '@mdi/js'
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import ValidateRules from '~/assets/mixins/ValidateRules.js'

export default {
  components: { RoomPreview: () => import('~/components/Room/Preview') },
  mixins: [AuthComputed, ValidateRules],

  middleware: 'not_logined_user',

  data() {
    return {
      loading: false,
      open: false,
      nickname: '',
      message: '',
      photos: [],
      previews: [],
      cogNickname: false,
      mdiSend,
      mdiCog,
      mdiImageMultiple,
    }
  },

  mounted() {
    this.local()
  },

  methods: {
    local() {
      this.nickname = localStorage.getItem('nickname')
        ? localStorage.getItem('nickname')
        : null
    },

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
          this.loading = false
          this.$parent.error = err
          console.error(err)
          this.$parent.previews = []
        })
    },

    formReset() {
      this.message = ''
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
