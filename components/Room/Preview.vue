<template>
  <div class="pb-5">
    <div class="d-flex" style="width: 100%; flex-wrap: wrap">
      <div v-for="(img, i) in previews" :key="i" style="width: 33%">
        <v-card>
          <v-img :src="img.path" height="100">
            <template>
              <v-btn icon x-small color="pink" @click="removePreviews(i)">
                <v-icon>{{ mdiCloseCircle }}</v-icon>
              </v-btn>
            </template>
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js'
export default {
  props: {
    previews: { type: Array, default: () => [] },
    photos: { type: Array, default: () => [] },
  },
  data() {
    return { mdiCloseCircle }
  },

  methods: {
    removePreviews(e) {
      this.previews.splice(e, 1)
      this.photos.splice(e, 1)
    },
  },
}
</script>
