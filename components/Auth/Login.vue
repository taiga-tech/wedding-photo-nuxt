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
            v-model="user.login_id"
            autofocus
            name="name"
            label="login_id"
          />
          <v-text-field
            v-model="user.password"
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
export default {
  data() {
    return {
      openLogin: false,
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
