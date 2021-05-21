<template>
  <div>
    <v-btn icon midiam aria-label="info" @click="open">
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>

    <v-dialog v-model="openHelp" persistent scrollable width="400">
      <v-card color="#13151a">
        <v-app-bar dense>
          <v-app-bar-title>
            <v-icon color="info" left>mdi-help-circle-outline</v-icon>
            ヘルプ
          </v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon color="pink" right @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-text>
          <v-card
            max-width="100%"
            max-height="100%%"
            align="center"
            justify="center"
            color="#00000000"
            flat
            class="d-flex"
          >
            <div style="width: 15%">
              <v-btn
                v-if="index !== 0"
                text
                block
                height="100%"
                @click="swipe(-1)"
              >
                <v-icon left>mdi-arrow-left</v-icon>
              </v-btn>
            </div>
            <v-img
              v-touch="{
                left: () => swipe(1),
                right: () => swipe(-1),
              }"
              :src="conversion(awsCdnUrl, images[index].src)"
              :alt="images[index].src"
              aspect-ratio="0.48955614"
              contain
              width="70%"
            >
            </v-img>
            <div style="width: 15%">
              <v-btn
                v-if="index !== 4"
                text
                block
                height="100%"
                @click="swipe(1)"
              >
                <v-icon left>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-card-text>

        <v-card-actions class="py-0">
          <v-btn v-if="index === 4" block color="pink" @click="close">
            <v-icon left>mdi-play</v-icon>
            start
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-spacer />
          <v-btn
            v-for="link in links"
            :key="link.name"
            text
            x-small
            :to="link.to"
          >
            {{ link.name }}
          </v-btn>
        </v-card-actions>

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

          <app-sns />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="nicknameForm" persistent scrollable width="500">
      <v-card color="#13151a">
        <v-app-bar dense flat>
          <v-icon left>mdi-cog</v-icon>
          ニックネームを決めてください
        </v-app-bar>
        <v-form v-model="valid" class="pa-4">
          <v-text-field
            v-model="nickname"
            label="ニックネーム"
            placeholder="ニックネームを入力してください"
            :autofocus="!localNickname"
            required
            :rules="rules.nickname"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            block
            :disabled="!valid"
            color="primary"
            @click.prevent="saveNickname"
            >保存</v-btn
          >
        </v-form>
        <v-card-subtitle>※後で変更可能です</v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ValidateRules from '~/assets/mixins/ValidateRules.js'
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  mixins: [UaFilters, ValidateRules],

  data() {
    return {
      e1: 1,
      openHelp: false,
      index: 0,
      links: [
        { name: '利用規約', to: '/info/terms/' },
        { name: 'プライバシーポリシー', to: '/info/privacy/' },
      ],
      images: [
        { src: 'img/info/help_0.png' },
        { src: 'img/info/help_1.png' },
        { src: 'img/info/help_2.png' },
        { src: 'img/info/help_3.png' },
        { src: 'img/info/help_4.png' },
        { src: 'img/info/help_5.png' },
      ],
      nicknameForm: false,
      nickname: '',
    }
  },

  computed: {
    firstInfo() {
      return localStorage.getItem('firstInfo')
    },
    localNickname() {
      return localStorage.getItem('nickname')
    },
  },

  watch: {
    $route(to, from) {
      if (to.name.match('room-roomId')) {
        if (localStorage.getItem('firstInfo')) {
          this.openHelp = false
        } else {
          this.openHelp = true
        }
      }
    },
  },

  mounted() {
    if (this.$route.name.match('room-roomId')) {
      if (this.firstInfo) {
        this.openHelp = false
      } else {
        this.openHelp = true
      }
    }
  },

  methods: {
    open() {
      this.openHelp = !this.openHelp
      this.index = 0
    },

    close() {
      localStorage.setItem('firstInfo', true)
      this.openHelp = false
      if (localStorage.getItem('nickname')) {
        return false
      }
      if (this.$route.name.match('room-roomId')) {
        this.nicknameForm = true
      }
    },

    saveNickname() {
      localStorage.setItem('nickname', this.nickname)
      this.nicknameForm = false
      this.nicknameForm = false
    },

    swipe(direction) {
      if (this.images.length === 1) {
        console.log('だめー')
        return false
      }
      if (direction === 1) {
        if (this.index + 1 < this.images.length) {
          console.log('up')
          this.index = direction + this.index
        } else {
          console.log('だめー')
          return false
        }
      }
      if (direction === -1) {
        if (this.index !== 0) {
          console.log('down')
          this.index = direction + this.index
        } else {
          console.log('だめー')
          return false
        }
      }
    },
  },
}
</script>
