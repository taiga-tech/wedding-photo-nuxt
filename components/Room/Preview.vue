<template>
  <div class="pb-5">
    <div class="d-flex" style="width: 100%; flex-wrap: wrap">
      <div v-for="(img, i) in previews" :key="i" style="width: 33%">
        <v-card>
          <v-img :src="img.path" height="100">
            <template>
              <v-btn icon x-small color="pink" @click="removePreviews(i)">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </template>
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previews: { type: Array, default: () => [] },
    photos: { type: Array, default: () => [] },
  },

  methods: {
    removePreviews(e) {
      this.previews.splice(e, 1)
      this.photos.splice(e, 1)
    },
  },
}
</script>
