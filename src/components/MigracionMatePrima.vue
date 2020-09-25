<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="MoviMatePrima"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Movimiento de la materia prima.</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Nuevo Movimiento
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Movimiento de Materia Prima</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                         
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                         
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                         
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "MigracionMatePrima",
  data() {
    return {
      dialog: false,
      valid: false,
      MoviMatePrima: [],
      urlMoviMatePrima:"/PanaderiaBG/public/MateriaPrimaProveedor",
      headers: [
        { text: "Proveedor", value: "NombreProveedor" },
        { text: "Bodega", value: "NombreBodega" },
        { text: "Cantidad", value: "CantidadTotal" },
        { text: "Desperdicio", value: "Desperdicio" },
        { text: "Fecha", value: "FechaCaducidad" },
        { text: "Materia", value: "NombreMP" },
        { text: "Unidad", value: "NombreUnidad" },
        { text: "Precio", value: "PrecioUnitario" },
      ],};},

  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });},
      
    getMoviMatePrima: async function() {
      const res = await this.$http.get(this.urlMoviMatePrima);
      this.MoviMatePrima = res.data;
    },},

  created() {
    this.getMoviMatePrima();
  }};

</script>

<style scoped>
</style>