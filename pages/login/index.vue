<template>
  <v-container>
    <v-card>
      <app-alert :error="error" />

      <v-card-title>ログイン</v-card-title>

      <v-card-text>
        <v-text-field v-model="form.login_id" name="name" label="login_id" />
        <v-text-field
          v-model="form.password"
          label="password"
          type="password"
          name="password"
        />
        <v-btn @click="login">ログイン</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  middleware: 'logined_user',

  data() {
    return {
      error: null,
      form: {
        login_id: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      this.error = null
      await this.$store
        .dispatch('auth/login', this.form)
        .then(() => {
          this.$router.push(`/room/${this.user.id}`)
        })
        .catch((err) => {
          console.error(err)
          this.error = err
        })
    },
  },
}
</script>
