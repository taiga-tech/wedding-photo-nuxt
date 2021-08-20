<template>
  <v-card>
    <v-card-title>お問い合わせ内容確認</v-card-title>
    <v-card-subtitle>
      お問い合わせ内容はこちらで宜しいでしょうか？<br />
      よろしければ「送信」ボタンを押して下さい。
    </v-card-subtitle>
    <contacts-content :data="data" />
  </v-card>
</template>

<script>
export default {
  components: {
    ContactsContent: () => import('~/components/Contacts/Content'),
  },
  props: {
    data: { type: Object, default: null },
  },
}
</script>
