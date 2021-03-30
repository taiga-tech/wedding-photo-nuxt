<template>
  <v-container>
    <v-card dark>
      <v-alert v-if="error" outlined type="error">{{ error.message }}</v-alert>
      <v-card-title>ログイン</v-card-title>
      <v-card-text>
        <v-text-field v-model="user.login_id" name="name" label="login_id" />
        <v-text-field
          v-model="user.password"
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
export default {
  middleware: 'logined_user',

  data() {
    return {
      error: null,
      user: {
        login_id: '',
        password: '',
      },
    }
  },

  computed: {
    check() {
      return this.$store.getters['auth/check']
    },
    authUser() {
      return this.$store.getters['auth/user']
    },
  },

  methods: {
    async login() {
      await this.$store
        .dispatch('auth/login', this.user)
        .then(() => {
          this.$router.push(`/room/${this.authUser.id}`)
        })
        .catch((e) => {
          console.error(e)
          this.error = e
        })
    },
  },
}
</script>
