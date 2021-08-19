<template>
  <v-dialog v-model="open" width="500">
    <v-card color="#12151d">
      <v-toolbar dense flat>
        <v-spacer />
        <v-btn :disabled="!valid" icon color="primary" @click="submit">
          <v-icon>{{ mdiSend }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" class="pa-4 pt-0">
        <v-text-field
          v-model="data.nickname"
          label="ニックネーム"
          placeholder="名前を入力してください"
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
          v-model="data.message"
          label="メッセージ"
          placeholder="メッセージを入力してください"
        />
      </v-form>
      <v-card-text>
        ※追加した写真、メッセージは画面をリロードすると削除されます。<br />
        ※データの送信、保存は行わないため、安心してご使用ください。
      </v-card-text>
    </v-card>

    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        fixed
        bottom
        right
        color="primary"
        aria-label="new-form"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ mdiImageMultiple }}</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import { mdiSend, mdiImageMultiple } from '@mdi/js'
import ValidateRules from '~/assets/mixins/ValidateRules.js'

export default {
  components: { RoomPreview: () => import('~/components/Room/Preview') },
  mixins: [ValidateRules],

  data() {
    return {
      loading: false,
      open: false,
      photos: [],
      previews: [],
      data: {
        id: 0,
        nickname: 'demo-user',
        message: '',
        created_at: '',
        user_id: 1,
        user: {
          id: 1,
          name: 'Demo_User',
          login_id: 'login_id',
          login_id_verified_at: null,
          created_at: '2021-04-04T14:45:30.000000Z',
          updated_at: '2021-04-04T14:45:30.000000Z',
        },
        photos: [],
      },
      date: '',
      mdiSend,
      mdiImageMultiple,
    }
  },

  methods: {
    fileChange() {
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
            this.previews.push({
              path: image.src,
              aspect: asp,
              created_at: '2021-04-05T09:14:43.000000Z',
            })
          }
        }
        reader.readAsDataURL(this.photos[i])
      }
      if (this.photos.length !== 0) {
        this.previews = []
      }
    },

    submit() {
      this.open = false
      this.$parent.error = null
      this.getDate()
      this.data.id =
        this.$parent.posts.length + this.$parent.sessionPosts.length + 1
      this.data.created_at = this.date
      this.data.photos = this.previews
      try {
        this.$parent.sessionPosts.unshift(this.data)
        this.formReset()
      } catch (err) {
        console.error(err)
        this.$parent.error = err
      }
    },

    formReset() {
      this.data = {
        nickname: 'demo-user',
        message: '',
        created_at: '',
        user_id: 1,
        user: {
          id: 1,
          name: 'Demo_User',
          login_id: 'login_id',
          login_id_verified_at: null,
          created_at: '2021-04-04T14:45:30.000000Z',
          updated_at: '2021-04-04T14:45:30.000000Z',
        },
        photos: [],
      }
      this.photos = []
      this.previews = []
      this.$parent.previews = []
    },

    reset() {
      this.photos = []
      this.previews = []
      this.$parent.previews = []
    },

    getDate() {
      const newDate = new Date().toLocaleString()
      this.date = newDate
    },
  },
}
</script>
