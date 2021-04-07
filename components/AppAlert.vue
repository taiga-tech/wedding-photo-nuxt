<template>
  <v-alert
    v-if="error"
    :value="error ? true : false"
    type="error"
    outlined
    dismissible
    transition="slide-y-transition"
    style="margin: 0 10px"
    >{{ error.message }}
  </v-alert>
</template>

<script>
export default {
  props: {
    error: { type: Error, default: null },
  },
}
</script>
