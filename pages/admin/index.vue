<template>
  <v-container class="list-container">
    <template v-for="(user, i) in users">
      <v-skeleton-loader
        v-if="!user"
        :key="i"
        transition
        type="card"
      ></v-skeleton-loader>

      <v-card
        v-if="user.role !== 1"
        :key="i"
        :to="'/admin/' + user.id + '/'"
        nuxt
        tile
        hover
        min-width="256"
        min-height="200"
      >
        <v-card-text>
          {{ user.created_at }}
          <v-card-title>{{ user.name }}</v-card-title>
          { id: {{ user.id }}, role: {{ user.role }} }
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import Meta from '~/assets/mixins/Meta'

export default {
  middleware: ['not_logined_user', 'is_admin'],
  mixins: [Meta],

  data() {
    return {
      users: null,
      meta: {
        title: '管理画面',
      },
    }
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
          this.$rollbar.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.list-container {
  display: grid;
  justify-content: start;
  gap: 3px;

  @media only screen and (min-width: 1900px) {
    grid-template-columns: repeat(5, 20%);
  }
  @media only screen and (max-width: 1900px) {
    grid-template-columns: repeat(4, 25%);
  }
  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(3, 33.333%);
  }
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media only screen and (max-width: 599px) {
    grid-template-columns: 100%;
    gap: 1px;
  }
}
</style>
