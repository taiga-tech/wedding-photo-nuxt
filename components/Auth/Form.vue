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
          label="ログインID*"
        />
        <v-text-field
          v-model="form.password"
          :rules="rules.password"
          label="パスワード*"
          type="password"
          name="password"
        />
        <v-btn
          :disabled="!valid"
          :loading="loading"
          type="submit"
          @click.prevent="login"
        >
          ログイン
        </v-btn>
        <v-card-actions>
          <v-spacer />
          <v-btn v-for="(link, i) in links" :key="i" text x-small :to="link.to">
            {{ link.name }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import ValidateRules from '~/assets/mixins/ValidateRules.js'

export default {
  components: { AppAlert: () => import('~/components/AppAlert') },
  mixins: [AuthComputed, ValidateRules],

  data() {
    return {
      error: null,
      form: {
        login_id: '',
        password: '',
      },
      links: [
        { name: '利用規約', to: '/info/terms/' },
        { name: 'プライバシーポリシー', to: '/info/privacy/' },
      ],
      loading: false,
    }
  },

  methods: {
    async login() {
      this.error = null
      this.loading = true
      await this.$store
        .dispatch('auth/login', this.form)
        .then(() => {
          this.loading = false
          if (this.check) {
            this.$router.push(`/room/${this.user.id}`)
          }
        })
        .catch((err) => {
          console.error(err)
          this.loading = false
          this.error = err
          this.form.password = ''
        })
    },
  },
}
</script>
