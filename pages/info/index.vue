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
        <p>"全力で楽をする"ために毎日開発しています。</p>
        <h2 class="mb-2">このアプリについて</h2>
        <p>
          このアプリは友人の結婚式のために作成しました。<br />
          コードは以下の3つのリポジトリに公開されています。
        </p>
        <v-list style="max-width: 400px">
          <template v-for="(product, i) in products">
            <v-list-item
              :key="i"
              :href="product.href"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar>
                <v-icon large :color="product.color"
                  >mdi-{{ product.icon }}</v-icon
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <b>{{ product.name }}</b>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ product.about }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
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
      products: [
        {
          name: 'wedding-photo-api',
          icon: 'laravel',
          color: '#ff291a',
          href: 'https://github.com/taiga-tech/wedding-photo-api/',
          about: 'バックエンド at AWS ECS Fargate',
        },
        {
          name: 'wedding-photo-nuxt',
          icon: 'nuxt',
          color: '#04c58e',
          href: 'https://github.com/taiga-tech/wedding-photo-nuxt/',
          about: 'フロントエンド at Netlify',
        },
        {
          name: 'lambda-edge-image-convert',
          icon: 'nodejs',
          color: '#67a063',
          href: 'https://github.com/taiga-tech/lambda-edge-image-convert/',
          about: '画像最適化処理 at AWS Lambda',
        },
      ],

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
