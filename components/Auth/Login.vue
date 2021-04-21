<template>
  <div>
    <!-- <v-btn color="pink" large class="my-2" @click="openm">
      <v-icon left>mdi-play</v-icon> ログインしてアルバムを開く
    </v-btn> -->
    <v-dialog v-model="openLogin" width="500">
      <auth-form />
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink"
          large
          class="my-2"
          v-bind="attrs"
          v-on="on"
          @click="maintenance"
        >
          <v-icon left>mdi-play</v-icon> ログインしてアルバムを開く
        </v-btn>
      </template>
    </v-dialog>

    <v-btn color="pink" outlined large to="/demo/" class="my-2">
      デモを体験する
    </v-btn>
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

  methods: {
    maintenance() {
      if (process.env.MAINTENANCE_MODE === 'true') {
        this.$router.push('/maintenance/')
      }
    },
  },
}
</script>
