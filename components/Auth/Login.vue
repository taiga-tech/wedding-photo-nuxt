<template>
  <div>
    <v-dialog v-model="openLogin" width="500">
      <auth-form style="background-color: #12151d" />
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink"
          large
          class="my-2"
          v-bind="attrs"
          v-on="on"
          @click="maintenance"
        >
          <v-icon left>{{ mdiPlay }}</v-icon>
          ログインしてアルバムを開く
        </v-btn>
      </template>
    </v-dialog>

    <v-btn color="pink" outlined large to="/demo/" class="my-2">
      デモを体験する
    </v-btn>
  </div>
</template>

<script>
import { mdiPlay } from '@mdi/js'
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  components: { AuthForm: () => import('~/components/Auth/Form') },
  mixins: [AuthComputed],

  data() {
    return { openLogin: false, mdiPlay }
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
