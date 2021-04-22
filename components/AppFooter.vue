<template>
  <v-footer class="pt-12" color="#00000000">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.title"
        :to="link.to"
        nuxt
        exact
        text
        class="mx-2"
      >
        {{ link.title }}
      </v-btn>

      <v-col class="pb-1 pt-3 text-center" cols="12">
        &copy; 2021 Taiga Nakano
        <app-sns />
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import links from '~/assets/json/Links.json'

export default {
  data() {
    return { links }
  },
}
</script>
