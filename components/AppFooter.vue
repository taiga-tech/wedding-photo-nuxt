<template>
  <v-footer class="pt-12" color="#00000000">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        nuxt
        exact
        text
        class="mx-2"
      >
        {{ link.name }}
      </v-btn>

      <v-col class="pb-1 pt-3 text-center" cols="12">
        &copy; 2021 Taiga Nakano
        <v-btn
          v-for="(sns, i) in socials"
          :key="i"
          icon
          :color="sns.color"
          :href="sns.href"
          target="_blank"
          rel="noopener"
        >
          <v-icon medium>mdi-{{ sns.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import socials from '~/assets/json/socials.json'

export default {
  data() {
    return {
      links: [
        { name: 'デモ', to: '/demo/' },
        { name: '作成者について', to: '/info/' },
        { name: '利用規約', to: '/info/terms/' },
        { name: 'プライバシーポリシー', to: '/info/privacy/' },
        { name: 'お問い合わせ', to: '/info/contact/' },
      ],

      socials,
    }
  },
}
</script>
