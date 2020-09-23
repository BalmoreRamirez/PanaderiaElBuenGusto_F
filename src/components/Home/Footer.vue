<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-col class="blue darken-4 lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Panaderia El Buen Gusto</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      //
    }
  }
}
</script>

<style scoped>

</style>