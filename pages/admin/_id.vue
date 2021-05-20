<template>
  <v-container>
    <v-data-table
      v-if="user"
      v-model="selected"
      :headers="dessertHeaders"
      :items="user.posts"
      show-select
      :expanded.sync="expanded"
      :loading="user.posts.length === 0"
      loading-text="Loading... Please wait"
      item-key="id"
      show-expand
      class="elevation-1"
      :item-selected="expanded"
    >
      <template v-slot:top="{ pagination }">
        <v-toolbar flat>
          <v-toolbar-title>Room: {{ user.name }}</v-toolbar-title>
          <v-chip outlined color="success">{{ pagination.itemsLength }}</v-chip>
          <v-spacer />
          <admin-delete v-if="selected.length !== 0" :selected="selected" />
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-2">
          <v-list>
            <v-list-item v-if="item.message">
              <v-list-item-content>
                <v-list-item-title>
                  <b class="label">メッセージ</b>
                </v-list-item-title>

                <v-list-item-content
                  class="pl-4"
                  style="
                    font-size: 14px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  <span class="pa-2 value">{{ item.message }}</span>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <b class="label">photos ({{ item.photos.length }})</b>
                </v-list-item-title>

                <v-list-item-content
                  class="pl-4"
                  style="
                    font-size: 14px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  <div class="d-flex">
                    <v-card
                      v-for="(img, i) in item.photos"
                      :key="i"
                      max-width="100%"
                      max-height="100%"
                      height="100%"
                      align="center"
                      justify="center"
                    >
                      <v-img
                        width="100"
                        :src="conversion(awsCdnUrl, img.path)"
                        :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
                        :alt="img.path"
                        contain
                        :aspect="img.aspect"
                      ></v-img>
                    </v-card>
                  </div>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Meta from '~/assets/mixins/Meta'
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  middleware: ['not_logined_user', 'is_admin'],
  mixins: [Meta, UaFilters],

  async asyncData({ params, $axios, context }) {
    const response = await $axios
      .get('/api/admin/' + params.id + '/')
      .catch((err) => {
        console.error(err)
        context.$rollbar.error(err)
      })
    const user = response.data

    return { user }
  },

  data() {
    return {
      user: null,
      selected: [],
      expanded: [],
      dessertHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'NickName', value: 'nickname' },
        { text: 'Photos', value: 'photos.length' },
        { text: 'created_at', value: 'created_at' },
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

  methods: {
    async reget() {
      console.info('taiga')
      const response = await this.$axios
        .get('/api/admin/' + this.route.params.id + '/')
        .catch((err) => {
          console.error(err)
          this.$rollbar.error(err)
        })
      const user = response.data
      this.user = user
    },
  },
}
</script>
