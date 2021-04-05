<template>
  <div>
    <v-btn v-if="!check" @click="openLogin = !openLogin">
      ログインして写真を見る
    </v-btn>
    <v-dialog v-model="openLogin" width="500">
      <v-card dark>
        <v-alert v-if="error" outlined type="error">{{ error }}</v-alert>
        <v-card-title>ログイン</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.login_id"
            autofocus
            name="name"
            label="login_id"
          />
          <v-text-field
            v-model="form.password"
            label="password"
            type="password"
            name="password"
          />
          <v-btn @click="login">ログイン</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  data() {
    return {
      openLogin: false,
      error: null,
      form: {
        login_id: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      await this.$store
        .dispatch('auth/login', this.form)
        .then(() => {
          this.$router.push(`/room/${this.user.id}`)
        })
        .catch((e) => {
          console.error(e)
          this.error = e
        })
    },
  },
}
</script>
