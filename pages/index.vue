<template>
  <v-container>
    <div align="center">
      <h1 class="my-10 text-h3 headTitle">
        Wedding Photo Album<br />
        みんなでひとつだけのフォトアルバム
      </h1>

      <div class="my-12">
        <auth-login v-if="!check"></auth-login>
        <div v-if="check">
          <v-btn :to="`/room/${user.id}/`" color="pink" large>
            <v-icon left>{{ mdiPlay }}</v-icon>
            {{ user.name }}のアルバム
          </v-btn>
        </div>
      </div>

      <p class="mx-auto mb-10" style="max-width: 568px">
        <b>
          大切なイベントの思い出を<br />
          みんなでひとつだけのフォトアルバムに作っていくアプリです。<br />
          たくさんの思い出を詰め込みましょう！！
        </b>
      </p>

      <div class="d-flex mx-auto" style="max-width: 1200px">
        <v-img
          :src="conversion(awsCdnUrl, 'img/top_demo_desktop.png')"
          :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
          alt="top_demo_desktop"
          style="border-radius: 5px"
          width="75%"
          contain
        >
          <template v-slot:placeholder>
            <app-progresscircle />
          </template>
        </v-img>

        <v-img
          :src="conversion(awsCdnUrl, 'img/top_demo_mobile.png')"
          :lazy-src="conversion(awsCdnUrl, 'img/lazyy.jpg')"
          alt="top_demo_mobile"
          style="border-radius: 5px"
          width="25%"
          aspect-ratio="0.46182266"
          contain
        >
          <template v-slot:placeholder>
            <app-progresscircle />
          </template>
        </v-img>
      </div>
    </div>

    <app-footer />
  </v-container>
</template>

<script>
import { mdiPlay } from '@mdi/js'
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import UaFilters from '~/assets/mixins/UaFilters'
;(async () => await require('~/assets/sass/headTitle.css'))()

export default {
  components: {
    AuthLogin: () => import('~/components/Auth/Login'),
    AppProgresscircle: () => import('~/components/AppProgresscircle'),
    AppFooter: () => import('~/components/AppFooter'),
  },
  mixins: [AuthComputed, UaFilters],
  data() {
    return { mdiPlay }
  },
}
</script>
