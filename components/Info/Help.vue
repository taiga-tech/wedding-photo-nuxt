<template>
  <div>
    <v-btn icon midiam aria-label="info" @click="open">
      <v-icon>{{ mdiHelpCircleOutline }}</v-icon>
    </v-btn>

    <v-dialog v-model="openHelp" persistent scrollable width="400">
      <v-card color="#13151a">
        <v-app-bar dense>
          <v-app-bar-title>
            <v-icon color="info" left>{{ mdiHelpCircleOutline }}</v-icon>
            ヘルプ
          </v-app-bar-title>
          <v-spacer />
          <v-btn icon color="pink" right @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
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
            <v-carousel v-model="index" hide-delimiters :continuous="false">
              <v-carousel-item v-for="(img, i) in images" :key="i">
                <v-img
                  :src="conversion(awsCdnUrl, img.src)"
                  :alt="img.src"
                  aspect-ratio="0.48955614"
                  contain
                  height="100%"
                >
                  <template v-slot:placeholder>
                    <app-progresscircle />
                  </template>
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-card-text>

        <v-card-actions class="py-0">
          <v-btn v-if="index === 5" block color="pink" @click="close">
            <v-icon left>{{ mdiPlay }}</v-icon>
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
          <v-icon left>{{ mdiCog }}</v-icon>
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
          <v-spacer />
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
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiHelpCircleOutline,
  mdiClose,
  mdiCog,
  mdiPlay,
} from '@mdi/js'
import ValidateRules from '~/assets/mixins/ValidateRules.js'
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  components: {
    AppProgresscircle: () => import('~/components/AppProgresscircle'),
    AppSns: () => import('~/components/AppSns'),
  },
  mixins: [UaFilters, ValidateRules],

  data() {
    return {
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
      mdiArrowRight,
      mdiArrowLeft,
      mdiHelpCircleOutline,
      mdiClose,
      mdiCog,
      mdiPlay,
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

    // swipe(direction) {
    //   if (this.images.length === 1) {
    //     console.log('だめー')
    //     return false
    //   }
    //   if (direction === 1) {
    //     if (this.index + 1 < this.images.length) {
    //       console.log('up')
    //       this.index = direction + this.index
    //     } else {
    //       console.log('だめー')
    //       return false
    //     }
    //   }
    //   if (direction === -1) {
    //     if (this.index !== 0) {
    //       console.log('down')
    //       this.index = direction + this.index
    //     } else {
    //       console.log('だめー')
    //       return false
    //     }
    //   }
    // },
  },
}
</script>
