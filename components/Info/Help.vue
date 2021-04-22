<template>
  <div>
    <v-btn icon midiam @click="openHelp = !openHelp">
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>
    <v-dialog v-model="openHelp" width="520" scrollable>
      <v-card color="#13151a">
        <v-btn icon absolute top right @click="openHelp = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title>
          <v-icon color="info" left>mdi-help-circle-outline</v-icon>
          ヘルプ
        </v-card-title>

        <v-card-text>
          <br />
          <v-card class="pa-1" color="#152535">
            <strong><u>使い方</u></strong>
            <ol>
              <li>
                <NuxtLink to="/login/" @click.native="openHelp = false"
                  >ログインする</NuxtLink
                >
              </li>
              <li>右下の<v-icon small>mdi-camera</v-icon>を押す</li>
              <li>
                フォームを開いたら真ん中の
                <v-icon small>mdi-camera</v-icon>
                を押し、写真(最大6枚)を選択する
              </li>
              <li>
                右上の<v-icon small>mdi-send</v-icon
                >を押すと写真を追加できます。
              </li>
            </ol>
          </v-card>
          <br />
          不具合の報告や使い方の相談があればお問い合わせページまたは、Twitterよりご連絡ください。
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green"
            text
            to="/info/contact/"
            @click="openHelp = false"
          >
            お問い合わせ
          </v-btn>

          <v-btn
            v-for="(sns, i) in socials"
            :key="i"
            small
            :color="sns.color"
            icon
            :href="sns.href"
            rel="noopener"
            target="_blank"
          >
            <v-icon>mdi-{{ sns.icon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import socials from '~/assets/json/socials.json'

export default {
  data() {
    return { openHelp: false, socials }
  },
}
</script>
