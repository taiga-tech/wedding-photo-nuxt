<template>
  <div>
    <v-btn color="pink" large class="my-2" @click="openLogin = !openLogin">
      <v-icon left>mdi-play</v-icon> ログインして写真を見る
    </v-btn>
    <v-btn color="pink" outlined large to="/demo/" class="my-2">
      デモを体験する
    </v-btn>

    <v-dialog v-model="openLogin" width="500">
      <auth-form />
    </v-dialog>
  </div>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  data() {
    return {
      openLogin: false,
    }
  },
}
</script>
