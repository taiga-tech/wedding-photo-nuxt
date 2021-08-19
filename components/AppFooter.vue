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
        <v-btn text to="/info/" class="text-capitalize" exact>
          &copy; 2021 Taiga Nakano
        </v-btn>
        <app-sns />
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { links } from '~/assets/js/Links'

export default {
  components: { AppSns: () => import('~/components/AppSns') },
  data() {
    return { links }
  },
}
</script>
