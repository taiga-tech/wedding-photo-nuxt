<template>
  <div>
    <v-btn v-if="!check" @click="openLogin = !openLogin">
      ログインして写真を見る
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
