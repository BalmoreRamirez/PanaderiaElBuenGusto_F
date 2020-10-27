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
export default {
  data() {
    return {
      inventario: 'Inventario',
      headers: [
        {text: 'ID', value: 'IdInventario',},
        {text: 'REGISTRO', value: 'NombreMP'},
        {text: 'DISPONIBLE', value: 'Disponible'},
        {text: 'BODEGA', value: 'NombreBodega'},
        {text: 'FECHA INGRESO', value: 'FechaIngreso'},
      ],
      Inventarios: []
    }
  },
  methods: {
    //si la cantidad disponible es menor o igual que cuatro se coloca en rojo
    //si la cantidad disponibles es mayor a 5 se ponen en verde
    getColor(Disponible) {
      if (Disponible >= 5) return 'green'
      else if (Disponible <= 4) return 'red'
    },

    //se trae los datos de inventario y se transforma en json y se guarda en un array
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

  //para que el navegador lo recargue antes que el componente
  created() {
    this.getInventario()
  },
}
</script>


