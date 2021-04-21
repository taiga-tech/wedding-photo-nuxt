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
            <v-icon left>mdi-play</v-icon>
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

      <div class="d-flex">
        <v-img
          :src="conversion(awsCdnUrl, 'img/top_demo_desktop.png')"
          :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
          alt="top_demo_desktop"
          width="75%"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="green lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-img
          :src="conversion(awsCdnUrl, 'img/top_demo_mobile.jpg')"
          :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
          alt="top_demo_mobile"
          width="25%"
          aspect-ratio="0.48976926"
          contain
        >
        </v-img>
      </div>
    </div>

    <app-footer />
  </v-container>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  mixins: [AuthComputed, UaFilters],

  head() {
    return { title: null }
  },
}
</script>

<style scoped>
.headTitle {
  display: block;
  background-image: -webkit-linear-gradient(
    270.97deg,
    rgb(255, 229, 128) -21.36%,
    rgb(255, 117, 113) -2.45%,
    rgb(234, 93, 173) 26.84%,
    rgb(194, 160, 253) 64.15%,
    rgb(59, 240, 228) 108.29%,
    rgb(178, 244, 182) 159.03%
  );
  -webkit-text-fill-color: rgba(0, 0, 0, 0);
  -webkit-background-clip: text;
}
</style>
