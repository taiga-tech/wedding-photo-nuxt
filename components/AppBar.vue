<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped floating app>
      <v-list v-if="check">
        <v-list-item :to="`/room/${user.id}/`" color="white" exact>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item :to="`/room/${user.id}/album`" color="white" exact>
          <v-list-item-content>
            <v-list-item-title>アルバム</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item :to="`/room/${user.id}/2nd-party/`" color="white">
          <v-list-item-content>
            <v-list-item-title>二次会情報</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>

      <v-divider v-if="check" />

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
        <!-- <div align="right" class="ma-1">
          <app-sns />
        </div>

        <v-divider v-if="check" /> -->

        <v-list v-if="check">
          <v-list-item color="pink" input-value="true" @click="logout">
            <v-list-item-action>
              <v-icon>{{ mdiAccountArrowRightOutline }}</v-icon>
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

    <v-app-bar clipped-left fixed app dense :flat="!scrollY">
      <v-app-bar-nav-icon
        aria-label="open-menu"
        @click.stop="drawer = !drawer"
      />

      <nuxt-link to="/" aria-label="top">
        <v-toolbar-title>
          <v-avatar tile><v-img src="/icon.png"></v-img></v-avatar>
        </v-toolbar-title>
      </nuxt-link>

      <v-spacer />

      <v-btn v-if="!check" to="/login/" small> ログイン </v-btn>

      <info-help />
    </v-app-bar>
  </div>
</template>

<script>
import { mdiAccountArrowRightOutline } from '@mdi/js'
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import { links } from '~/assets/js/Links'

export default {
  components: { InfoHelp: () => import('~/components/Info/Help') },
  mixins: [AuthComputed],

  data() {
    return { drawer: false, links, scrollY: 0, mdiAccountArrowRightOutline }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/')
      })
    },
    handleScroll() {
      this.scrollY = window.scrollY
    },
  },
}
</script>
