<template>
  <v-container style="height: 100%" class="d-flex align-center">
    <div class="mx-auto" style="max-width: 940px">
      <div class="mx-auto" style="max-width: 600px">
        <app-alert :error="error" />

        <auth-form />

        <v-dialog v-model="loading" persistent width="300">
          <v-card color="deep-purple">
            <v-card-text>
              現在ログインしています
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <app-footer />
    </div>
  </v-container>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  data() {
    return {
      error: null,
      loading: false,
    }
  },

  mounted() {
    this.qrLogin()
  },

  methods: {
    async qrLogin() {
      if (this.check) {
        this.$router.push(`/room/${this.user.id}`)
      }

      if (Object.keys(this.$route.query).length !== 0) {
        this.loading = true
        await this.$store
          .dispatch('auth/login', {
            login_id: this.$route.query.login_id,
            password: this.$route.query.password,
          })
          .then(() => {
            if (this.check) {
              this.$router.push(`/room/${this.user.id}`)
              this.loading = false
            }
          })
          .catch((err) => {
            console.error(err)
            this.error = err
            this.loading = false
          })
      } else {
        return false
      }
    },
  },
}
</script>
