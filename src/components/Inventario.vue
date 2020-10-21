<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="Inventarios"
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ inventario }}</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      inventario: 'Inventario',
      headers: [
        {text: 'ID', value: 'IdInventario',},
        {text: 'REGISTRO', value: 'RegistroMPID'},
        {text: 'DISPONIBLE', value: 'Disponible'},
        {text: 'BODEGA', value: 'BodegaID'},
        {text: 'FECHA INGRESO', value: 'FechaIngreso'},
      ],
      Inventarios: []
    }
  },
  methods: {
    async getInventario() {
      try {
        const data = await fetch('http://localhost/PanaderiaBG/public/Inventario')
        const info = await data.json()
        this.Inventarios = info
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getInventario()
  },
}
</script>