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

      <template v-slot:append>
        <div align="right" class="ma-1">
          <v-btn
            v-for="(sns, i) in socials"
            :key="i"
            icon
            :color="sns.color"
            :href="sns.to"
            target="_blank"
            rel="noopener"
          >
            <v-icon medium>mdi-{{ sns.icon }}</v-icon>
          </v-btn>
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
      </template>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app dense flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <nuxt-link
        to="/"
        class="text-decoration-none"
        :style="$vuetify.theme.dark ? 'color: #fff' : 'color: #000'"
      >
        <v-toolbar-title>
          <v-avatar tile><v-img src="/icon.png"></v-img></v-avatar>
          <!-- {{ user ? user.name : title }} -->
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

export default {
  mixins: [AuthComputed],

  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'トップ',
          to: '/',
        },
        {
          icon: 'mdi-alpha-d-box-outline',
          title: 'デモ',
          to: '/demo/',
        },
        {
          icon: 'mdi-github',
          title: '作成者について',
          to: '/info/',
        },
        { icon: 'mdi-note', title: '利用規約', to: '/info/terms/' },
        {
          icon: 'mdi-note',
          title: 'プライバシーポリシー',
          to: '/info/privacy/',
        },
        {
          icon: 'mdi-email',
          title: 'お問い合わせ',
          to: '/info/contact/',
        },
      ],
      socials: [
        {
          icon: 'qrcode',
          to: 'https://taiga-tech.tk/',
          color: '',
        },
        {
          icon: 'github',
          to: 'https://github.com/taiga-tech/',
          color: 'purple',
        },
        {
          icon: 'alpha-w',
          to: '',
          color: '#4fcce3',
        },
        {
          icon: 'twitter',
          to: 'https://twitter.com/Taiga_dev/',
          color: 'primary',
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
