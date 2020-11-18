<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="Sucursal"
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
  name: "Pedido",
  data() {
    return {
      inventario: 'Sucursal',
      headers: [
        {text: 'ID', value: 'IdSucursal', class: "indigo  white--text"},
        {text: 'Nombre', value: 'NombreSucursal', class: "indigo  white--text"},
        {text: 'Ubicacion', value: 'Ubicacion', class: "indigo  white--text"},
        {text: 'Telefono', value: 'TelefonoSucursal', class: "indigo  white--text"},
        {text: 'Encargado', value: 'EncargadoID', class: "indigo  white--text"},
      ],
      Sucursal: []
    }
  },
  methods: {
    getSucursal() {
      this.axios.get('/Sucursal',)
          .then(res => {
            this.Sucursal = res.data;
          })
          .catch(e => {
            console.log(e.response)
          })
    },
  },
  created() {
    this.getSucursal()
  },
}
</script>

