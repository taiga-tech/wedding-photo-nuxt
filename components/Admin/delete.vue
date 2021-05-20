<template>
  <div>
    <v-btn color="pink" text @click="open = !open">
      DELETE {{ selected.length }}
    </v-btn>

    <v-dialog v-model="open" width="520" scrollable>
      <v-card color="#13151a">
        <v-btn icon absolute top right @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card-title>
          <v-icon left color="pink">mdi-cancel</v-icon>
          ほんとに削除しますか？
        </v-card-title>

        <v-card-text>
          <pre style="overflow: scroll-auto">{{ selected }}</pre>
        </v-card-text>

        <v-card-actions>
          <v-btn color="warning" text @click="open = false"> cancel </v-btn>

          <v-spacer />

          <v-btn
            color="pink"
            :loading="loading"
            text
            @click="deletePosts(selected)"
          >
            DELETE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    selected: { type: Array, default: () => [] },
  },

  data() {
    return { open: false, loading: false }
  },

  methods: {
    async deletePosts(selected) {
      this.loading = true
      await this.$axios
        .post('/api/admin/1', selected)
        .then((response) => {
          console.log(response.data)
          this.loading = false
          this.open = false
        })
        .catch((err) => {
          this.loading = false
          this.$rollbar.error(err)
          console.error(err)
        })
    },
  },
}
</script>
