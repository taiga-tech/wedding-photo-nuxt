<template>
  <div>
    <v-dialog v-model="open" width="500" persistent>
      <v-card color="#13151a">
        <v-card-title>
          <v-icon color="error" left>{{ mdiCloudAlert }}</v-icon>
          復旧までしばらくお待ちください
        </v-card-title>
        <v-card-text>
          大変申し訳ありません、只今メンテナンス中です。復旧までしばらくお待ちください。<br />
          お問い合わせの場合は、下記のお問い合わせ又はTwitterDMより受け付けております。
        </v-card-text>
        <v-card-actions>
          <v-btn text to="/" color="pink">topへ</v-btn>
          <v-spacer />
          <v-btn color="green" text to="/info/contact/"> お問い合わせ </v-btn>
          <v-btn
            color="primary"
            text
            href="https://twitter.com/Taiga_dev/"
            rel="noopener"
            target="_blank"
          >
            <v-icon>{{ mdiTwitter }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCloudAlert, mdiTwitter } from '@mdi/js'
export default {
  data() {
    return { open: true, mdiCloudAlert, mdiTwitter }
  },
}
</script>
