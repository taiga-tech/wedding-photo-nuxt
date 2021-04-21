<template>
  <v-container>
    <v-card max-width="500" class="mx-auto my-12">
      <div align="center">
        <h1 class="py-12">
          <v-avatar>
            <v-img
              :src="conversion(awsCdnUrl, 'img/profile.jpg')"
              :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
              alt="taiga-tech"
            ></v-img>
          </v-avatar>
          仲野 大雅
        </h1>
        <p class="px-10">"全力で楽をする"ために毎日開発しています。</p>
      </div>

      <v-card-text class="px-12">
        <v-btn
          v-for="(sns, i) in snsList"
          :key="i"
          block
          class="my-2"
          :color="sns.color"
          style="text-decoration: none; text-transform: none"
          :href="sns.href"
          target="_blank"
          rel="noopener"
        >
          <v-icon left>{{ sns.icon }}</v-icon>
          <b>{{ sns.name }}</b>
        </v-btn>
      </v-card-text>
    </v-card>
    <app-footer />
  </v-container>
</template>

<script>
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  mixins: [UaFilters],
  data() {
    return {
      snsList: [
        {
          name: 'ホームページ',
          href: 'https://taiga-tech.tk/',
          icon: 'mdi-qrcode',
          color: '',
        },
        {
          name: 'GitHub',
          href: 'https://github.com/taiga-tech/',
          icon: 'mdi-github',
          color: 'purple',
        },
        {
          name: 'Twitter',
          href: 'https://twitter.com/Taiga_dev/',
          icon: 'mdi-twitter',
          color: 'primary',
        },
      ],
    }
  },
}
</script>
