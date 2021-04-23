<template>
  <v-card>
    <v-card-title>送信完了しました</v-card-title>
    <v-card-subtitle>
      お問い合わせありがとうございます。<br />
      以下の内容でフォームを送信いたしました。<br />
      数日中に追ってメールにて回答をお送りいたします。<br />
      今しばらくお待ちください。
    </v-card-subtitle>
    <contacts-content :data="data" />
  </v-card>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: null },
  },
}
</script>
