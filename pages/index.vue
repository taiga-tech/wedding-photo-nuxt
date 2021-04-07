<template>
  <v-container>
    <div>
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
    <app-footer />
  </v-container>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],
}
</script>
