<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="Inventarios"
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:item.Disponible="{item}">
          <v-chip :color="getColor(item.Disponible)" dark>{{ item.Disponible }}</v-chip>
        </template>
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
import {mapState} from "vuex";

export default {
  data() {
    return {
      inventario: 'Inventario',
      headers: [
        {text: 'ID', value: 'IdInventario', class: "indigo  white--text"},
        {text: 'REGISTRO', value: 'NombreMP', class: "indigo  white--text"},
        {text: 'DISPONIBLE', value: 'Disponible', class: "indigo  white--text"},
        {text: 'BODEGA', value: 'NombreBodega', class: "indigo  white--text"},
        {text: 'FECHA INGRESO', value: 'FechaIngreso', class: "indigo  white--text"},
      ],
      Inventarios: []
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    getInventario() {
     /** let config = {
        headers: {
          token: this.token
        }
      }**/
      this.axios.get('/Inventario', /*config*/)
          .then(res => {
            console.log(res.data);
            this.Inventarios = res.data;
          })
          .catch(e => {
            console.log(e.response)
          })
    },
    getColor(Disponible) {
      if (Disponible >= 5) return 'green'
      else if (Disponible <= 4) return 'red'
    },

  },
  created() {
    this.getInventario()
  },

  //para que el navegador lo recargue antes que el componente

}
</script>


