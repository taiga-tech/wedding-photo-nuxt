<template>
  <v-alert
    :value="error ? true : false"
    type="error"
    outlined
    transition="slide-y-transition"
    dismissible
    >{{ error }}
  </v-alert>
</template>

<script>
export default {
  props: {
    error: { type: Object, default: null },
  },
}
</script>
