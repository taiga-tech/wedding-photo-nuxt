<template lang="html">
  <div>
    <div
      class="geolonia"
      :data-lat="sp.lat"
      :data-lng="sp.lng"
      data-zoom="16"
      data-style="geolonia/midnight"
    />
  </div>
</template>

<script>
export default {
  props: {
    sp: { type: Object, default: null },
  },

  head: {
    script: [
      {
        src:
          'https://cdn.geolonia.com/v1/embed?geolonia-api-key=' +
          process.env.GEOLONIA_TOKEN,
        body: true,
      },
    ],
  },
}
</script>

<style scoped>
.geolonia {
  width: 100%;
  height: 400px;
}
</style>
