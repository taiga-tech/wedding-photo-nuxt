<template>
  <div>
    <v-dialog v-model="open" width="520" persistent scrollable>
      <v-card color="#13151a">
        <v-card-title>
          <v-icon color="info" left>{{ mdiAlertCircleOutline }}</v-icon>
          デモページへようこそ！
        </v-card-title>

        <v-card-text>
          <strong>
            <u>このページでは、ログイン後の動作を再現しています。</u><br />
            ※追加した写真は画面をリロードすると削除されます、ご注意ください。<br />
            ※データの送信、保存は行わないため、安心してご使用ください。
          </strong>
          <br /><br />
          <v-card class="pa-1" color="#152535">
            <strong><u>使い方</u></strong>
            <ol>
              <li>
                右下の<v-icon small>{{ mdiCamera }}</v-icon
                >を押す
              </li>
              <li>
                フォームを開いたら真ん中の
                <v-icon small>{{ mdiCamera }}</v-icon>
                を押し、写真(最大6枚)を選択する
              </li>
              <li>
                右上の<v-icon small>{{ mdiSend }}</v-icon
                >を押すと写真を追加できます。
              </li>
            </ol>
          </v-card>
          <br />
          不具合の報告や使い方の相談があればお問い合わせページまたは、Twitterよりご連絡ください。
        </v-card-text>

        <v-card-actions>
          <v-btn small color="green" text to="/info/contact/">
            お問い合わせ
          </v-btn>

          <app-sns />

          <v-spacer />

          <v-btn color="pink" aria-label="start" @click="open = false">
            <v-icon>{{ mdiPlay }}</v-icon>
            <span class="hidden-sm-and-down">start</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiAlertCircleOutline, mdiCamera, mdiSend, mdiPlay } from '@mdi/js'
export default {
  components: { AppSns: () => import('~/components/AppSns') },
  data() {
    return { open: true, mdiAlertCircleOutline, mdiCamera, mdiSend, mdiPlay }
  },
}
</script>
