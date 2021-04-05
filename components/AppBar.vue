<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped floating app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer />

      <v-list>
        <v-list-item v-if="check" @click="logout">
          <v-list-item-action>
            <v-icon>mdi-account-arrow-right-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app dense flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="user ? user.name : title" />

      <v-spacer />

      <v-btn v-if="!check" to="/login">ログイン</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/',
        },
        {
          icon: 'mdi-phone',
          title: 'お問い合わせ',
          to: '/info/contact/',
        },
        {
          icon: 'mdi-github',
          title: '作成者について',
          to: '/info/',
        },
      ],
      title: 'weddingphoto',
    }
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
