<template>
  <v-layout>
    <v-flex>
      <v-data-table :headers="headers" :items="MateriaPrima" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Materia Prima</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue" dark v-bind="attrs" v-on="on">Ingresar registro</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Materia prima</span>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Codigo*" v-model="CodigoMP" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Nombre*" v-model="NombreMP" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Clase*" v-model="Clase" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Observacion*" v-model="Observacion" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Descripcion*" v-model="Descripcion" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Unidad Medida*" v-model="UnidadMedidaID" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-btn small color="primary" dark @click="close">Salir</v-btn>
                          <v-btn small color="primary" dark @click="addBook">Guardar</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <small>* campo requerido</small>
                </v-card-text>
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
  name: "TableMaPrima",

  data() {
    return {
      MateriaPrima: [],
      CodigoMP: "",
      NombreMP: "",
      Clase: "",
      Observacion: "",
      Descripcion: "",
      UnidadMedidaID: "",
      url: "http://localhost/PanaderiaBG/public/MateriaPrima",
      search: "",
      dialog: false,
      headers: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "CodigoMP"
        },
        //  { text: "Codigo", value: "CodigoMP" },
        { text: "Nombre", value: "NombreMP" },
        { text: "Clase", value: "Clase" },
        { text: "Obervacion", value: "Observacion" },
        { text: "Descripcion", value: "Descripcion" },
        { text: "Unidad de Medida", value: "UnidadMedidaID" }
      ]
    };
  },
  methods: {
    getMateriaPrima: async function() {
      const res = await this.$http.get(this.url);
      this.MateriaPrima = res.data;
    },
    addBook: async function() {
      const obj = new FormData();
      obj.append("CodigoMP", this.CodigoMP);
      obj.append("NombreMP", this.NombreMP);
      obj.append("Clase", this.Clase);
      obj.append("Observacion", this.Observacion);
      obj.append("Descripcion", this.Descripcion);
      obj.append("UnidadMedidaID", this.UnidadMedidaID);
      const res = await this.$http.post(this.url, obj);
      this.MateriaPrima.push(res.data.result);
      this.CodigoMP = "";
      this.NombreMP = "";
      this.Clase = "";
      this.Observacion = "";
      this.Descripcion = "";
      this.UnidadMedidaID = "";
    },
       close () {
        this.dialog = false
      },

  },
  created() {
    this.getMateriaPrima();
  },

};
</script>
