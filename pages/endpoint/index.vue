<template>
  <base-container>
    <pre>{{ response }}</pre>
  </base-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const response = await $axios.get('/api/hello').catch((error) => {
      console.log(error)
      return { error }
    })
    return { response }
  },
}
</script>
