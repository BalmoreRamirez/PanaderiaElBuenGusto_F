<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="Pedidos"
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
      inventario: 'Pedidos',
      headers: [
        {text: 'ID', value: 'IdPedido', class: "indigo  white--text"},
        {text: 'Nombre', value: 'NombreMP', class: "indigo  white--text"},
        {text: 'Sucursal', value: 'NombreSucursal', class: "indigo  white--text"},
        {text: 'Ubicacion', value: 'NombreBodega', class: "indigo  white--text"},
        {text: 'Telefono', value: 'TelefonoSucursal', class: "indigo  white--text"},
        {text: 'Encargado', value: 'NombreEncargado', class: "indigo  white--text"},
        {text: 'Numero', value: 'NumeroPedido', class: "indigo  white--text"}
      ],
      Pedidos: []
    }
  },
  methods: {
    getPedido() {
      this.axios.get('/Pedido',)
          .then(res => {
            this.Pedidos = res.data;
          })
          .catch(e => {
            console.log(e.response)
          })
    },
  },
  created() {
    this.getPedido()
  },
}
</script>

