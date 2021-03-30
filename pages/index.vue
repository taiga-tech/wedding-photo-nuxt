<template>
  <v-container>
    <div style="width: 100%; height: 100%" align="center" justify="center">
      <div>
        <auth-login v-if="!check"></auth-login>
        <div v-if="check">
          <v-btn :to="`/room/${user.id}/`">
            <v-icon left>mdi-table-large</v-icon>
            {{ user.name }}に入室する</v-btn
          >
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  // middleware: 'logined_user',

  computed: {
    check() {
      return this.$store.getters['auth/check']
    },
    user() {
      return this.$store.getters['auth/user']
    },
  },
}
</script>
