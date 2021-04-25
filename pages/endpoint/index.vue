<template>
  <h1>{{ data }}</h1>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    }
  },

  mounted() {
    this.$axios
      .get('/api/hello')
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
