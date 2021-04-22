<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped floating app>
      <v-list>
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div align="right" class="ma-1">
          <app-sns />
        </div>

        <v-divider v-if="check" />

        <v-list v-if="check">
          <v-list-item color="pink" input-value="true" @click="logout">
            <v-list-item-action>
              <v-icon>mdi-account-arrow-right-outline</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>ログアウト</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list-item align="right">
          <v-spacer />
          &copy; 2021 Taiga Nakano
        </v-list-item>

        <v-list-item v-if="$ua.isFromSmartphone()"></v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app dense flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <nuxt-link to="/">
        <v-toolbar-title>
          <v-avatar tile><v-img src="/icon.png"></v-img></v-avatar>
        </v-toolbar-title>
      </nuxt-link>

      <v-spacer />
      <v-btn v-if="!check" to="/login">ログイン</v-btn>
      <info-help />
    </v-app-bar>
  </div>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import links from '~/assets/json/Links.json'

export default {
  mixins: [AuthComputed],

  data() {
    return { drawer: false, links }
  },

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
