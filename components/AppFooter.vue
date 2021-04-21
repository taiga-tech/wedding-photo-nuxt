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
          :href="sns.to"
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
export default {
  data() {
    return {
      links: [
        { name: '使い方', to: '/demo/' },
        { name: '作成者について', to: '/info/' },
        { name: 'お問い合わせ', to: '/info/contact/' },
        { name: '利用規約', to: '/info/terms/' },
        { name: 'プライバシーポリシー', to: '/info/privacy/' },
      ],
      socials: [
        {
          icon: 'qrcode',
          to: 'https://taiga-tech.tk/',
          color: '',
        },
        {
          icon: 'github',
          to: 'https://github.com/taiga-tech/',
          color: 'purple',
        },
        {
          icon: 'alpha-w',
          to: '',
          color: '#4fcce3',
        },
        {
          icon: 'twitter',
          to: 'https://twitter.com/Taiga_dev/',
          color: 'primary',
        },
      ],
    }
  },
}
</script>
