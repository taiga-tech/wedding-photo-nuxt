<template>
  <v-card>
    <app-alert :error="error" />
    <v-card-title>ログイン</v-card-title>
    <v-card-text>
      <v-form v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.login_id"
          :rules="rules.login_id"
          autofocus
          name="name"
          label="login_id"
        />
        <v-text-field
          v-model="form.password"
          :rules="rules.password"
          label="password"
          type="password"
          name="password"
        />
        <v-btn :disabled="!valid" @click="login">ログイン</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import ValidateRules from '~/assets/mixins/ValidateRules.js'

export default {
  mixins: [AuthComputed, ValidateRules],

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
          if (this.check) {
            this.$router.push(`/room/${this.user.id}`)
          }
        })
        .catch((err) => {
          console.error(err)
          this.error = err
        })
    },
  },
}
</script>
