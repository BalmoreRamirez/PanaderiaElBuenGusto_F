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
                <v-btn color="blue" class="ml-3" dark v-bind="attrs" v-on="on">Ingresar registro</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Materia prima</span>
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="CodigoMP"
                              label="Codigo*"
                              :rules="[required('codigo')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="NombreMP"
                              label="Nombre*"
                              :rules="[required('nombre')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="Clase" label="Clase*" :rules="[required('clase')]"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="Observacion"
                              label="Observacion*"
                              :rules="[required('Observacion')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="Descripcion" label="Descripcion*"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-select
                              :items="UnidadMedida"
                              item-text="NombreUnidad"
                              item-value="IdUnidadMedida"
                              v-model="UnidadMedidaID"
                              label="Selecione la unidad"
                          >
                          </v-select>
                        </v-col>

                        <v-card-actions>
                          <v-flex>
                            <v-btn @click="close">Salir</v-btn>
                          </v-flex>
                          <v-flex class="text-xs-right">
                            <v-btn @click="saveMateriaPrima" :disabled="!valid">Guardar</v-btn>
                          </v-flex>
                        </v-card-actions>
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
      valid: false,
      required(propertyType) {
        return v =>
            (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },

      MateriaPrima: [],
      UnidadMedida: [],
      CodigoMP: "",
      NombreMP: "",
      Clase: "",
      Observacion: "",
      Descripcion: "",
      NombreUnidad: "",
      UnidadMedidaID: "",

      url2: "http://localhost/PanaderiaBG/public/UnidadMateria",
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
        {text: "Nombre", value: "NombreMP"},
        {text: "Clase", value: "Clase"},
        {text: "Obervacion", value: "Observacion"},
        {text: "Descripcion", value: "Descripcion"},
        {text: "Unidad de Medida", value: "NombreUnidad"}
      ]
    };
  },
  methods: {
    getUnidad: async function () {
      const res = await this.$http.get(this.url2);
      this.UnidadMedida = res.data;
    },
    getMateriaPrima: async function () {
      const res = await this.$http.get(this.url);
      this.MateriaPrima = res.data;
    },
    saveMateriaPrima: async function () {
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
      this.getMateriaPrima();
    },
    close() {
      this.dialog = false;
    }
  },
  created() {
    this.getMateriaPrima();
    this.getUnidad();
  }
};
</script>
