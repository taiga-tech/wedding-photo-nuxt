<template>
  <v-container fluid>
    <app-alert :error="error" />

    <v-dialog
      v-if="modalData"
      v-model="openmodal"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="openmodal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer />

          <v-toolbar-items>
            <v-btn text color="primary"> Save </v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-card
          max-width="100%"
          max-height="100%"
          align="center"
          justify="center"
          class="pa-3"
        >
          <img :src="modalData.photos[pullIndex].path" alt="" width="90%" />
        </v-card>
        <v-card-title>{{ modalData.user.name }}</v-card-title>
        <v-card-subtitle>{{ modalData.user.login_id }}</v-card-subtitle>
      </v-card>
    </v-dialog>

    <client-only>
      <div
        v-masonry="containerId"
        transition-duration="0.1s"
        item-selector=".item"
        class="masonryWrap"
      >
        <div
          v-for="preview in previews"
          :key="preview.path"
          v-masonry-tile="containerId"
          class="item"
        >
          <v-card hover :loading="loading" :disabled="loading">
            <v-img
              :src="preview.path"
              :alt="preview.path"
              :width="width"
              class="fill-height"
            ></v-img>
          </v-card>
        </div>

        <div v-for="(post, i) in posts" :key="i">
          <v-card
            v-for="(photo, index) in post.photos"
            :key="index"
            v-masonry-tile="containerId"
            hover
            class="item"
            @click="getPhoto(post, index)"
          >
            <v-img
              :src="photo.path"
              lazy-src="https://picsum.photos/id/11/100/60"
              :alt="photo.created_at"
              :width="width"
              class="fill-height"
              @load="refresh"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="green lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </div>
      </div>
    </client-only>
  </v-container>
</template>

<script>
import posts from '~/assets/json/DemoData'

export default {
  data() {
    return {
      error: null,
      width: '100%',
      containerId: 'containerId',
      previews: [],
      openmodal: false,
      modalData: null,
      posts,
    }
  },

  methods: {
    refresh() {
      this.$redrawVueMasonry(this.containerId)
    },

    getPhoto(post, index) {
      this.openmodal = true
      this.modalData = post
      this.pullIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @media only screen and (min-width: 1900px) {
    width: calc(100% / 8 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 1900px) {
    width: calc(100% / 6 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 1300px) {
    width: calc(100% / 5 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 900px) {
    width: calc(100% / 3 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 599px) {
    width: calc(100% / 2 - 24px);
    margin: 10px;
  }
}
</style>
