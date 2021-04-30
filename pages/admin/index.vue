<template>
  <v-container>
    <v-data-table
      v-if="users"
      :headers="dessertHeaders"
      :items="users[1].posts"
      show-select
      :expanded.sync="expanded"
      :loading="users[1].posts.length === 0"
      loading-text="Loading... Please wait"
      item-key="id"
      show-expand
      class="elevation-1"
      :item-selected="expanded"
    >
      <template v-slot:top="{ pagination }">
        <v-toolbar flat>
          <v-toolbar-title>Room: {{ users[1].name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip outlined color="success">{{ pagination.itemsLength }}</v-chip>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-2">
          <v-row>
            <v-col col="6">{{ item.message }}</v-col>
            <v-col col="6">
              <v-card>
                <v-img
                  v-if="item.photos.length !== 0"
                  height="100"
                  width="100"
                  :aspect-ratio="item.photos[0].aspect"
                  :src="awsCdnUrl + item.photos[0].path"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Meta from '~/assets/mixins/Meta'

export default {
  middleware: ['not_logined_user', 'is_admin'],
  mixins: [Meta],

  data() {
    return {
      expanded: [],
      users: null,
      dessertHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'NickName', value: 'nickname' },
        { text: 'Photos', value: 'photos.length' },
        {
          text: 'Message & Photo',
          value: 'data-table-expand',
        },
      ],
      meta: {
        title: '管理画面',
      },
    }
  },

  computed: {
    awsCdnUrl() {
      return process.env.AWS_CDN_URL
    },
  },

  mounted() {
    this.get()
  },

  methods: {
    async get() {
      this.users = null
      await this.$axios
        .get('/api/admin')
        .then((response) => {
          this.users = response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
