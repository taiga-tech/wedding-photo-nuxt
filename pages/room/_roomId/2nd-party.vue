<template>
  <base-container max-width="500">
    <v-list-item>
      <v-list-item-avatar>
        <v-img
          src="https://imgfp.hotp.jp/IMGH/41/74/P026574174/P026574174_69.jpg"
        />
      </v-list-item-avatar>

      <v-list-item-title>{{ sp.name }}</v-list-item-title>
      <v-list-item-icon>
        <v-btn icon :href="sp.instagram" target="_blank" rel="noopener">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>

    <v-card-text>
      SPORTS BAR at OYAFUKOU, FUKUOKA<br />
      福岡親不孝通りにあるインターナショナルスポーツバー⚽️⚾️🏈<br />
      チャージ料金無し！ドイツの白ビール『ヴァイエンステファン』の生ビールを福岡県内で唯一取り扱っております🍺
    </v-card-text>

    <v-card-text> 電話：<a href="tel:0924069822">092-406-9822</a> </v-card-text>

    <v-card-text>予算：¥3000(仮)</v-card-text>

    <v-card-text>場所：{{ sp.address }}</v-card-text>

    <room-geolonia :sp="sp" />
  </base-container>
</template>

<script>
export default {
  middleware: ['not_logined_user', 'is_admin', 'logined_user'],

  data() {
    return {
      sp: {
        name: 'Two Dogs Fukuoka',
        hp: 'https://www.hotpepper.jp/strJ001168501/',
        instagram: 'https://www.instagram.com/twodogsfukuoka/',
        address:
          '福岡県福岡市中央区舞鶴１丁目9-21 1F 天神駅徒歩5分/親富孝通り沿い-1F',
        // geocording↓
        lat: '33.592684',
        lng: '130.393582',
      },
    }
  },
}
</script>
