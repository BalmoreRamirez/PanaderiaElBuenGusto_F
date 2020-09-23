<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="MateriaPrima"
          :search="search"
          class="elevation-10">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Registro de Materia Prima</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2" fab dark color="indigo" v-bind="attrs" v-on="on">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Materia prima</span>
                </v-card-title>

                  <v-form v-model="valid">
                    <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="CodigoMP"
                              label="Codigo*"
                              :rules="[required('codigo'), number('numeros')]">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="NombreMP"
                              label="Nombre*"
                              :rules="[required('nombre'), letter('letras')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="Clase" label="Clase*" :rules="[required('clase')]"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="Observacion"
                              label="Observacion*"
                              counter=30
                              :rules="[required('Observacion'),maxlength('Observacion',30)]">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="Descripcion" label="Descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="UnidadMedida"
                              item-text="NombreUnidad"
                              item-value="IdUnidadMedida"
                              v-model="UnidadMedidaID"
                              label="Selecione la unidad"
                              :rules="[(v) => !!v || 'unidad es requerido']"
                              required
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="Proveedor"
                              item-text="NombreProveedor"
                              item-value="IdProveedor"
                              v-model="ProveedorID"
                              label="Selecione Proveedor"
                              :rules="[(v) => !!v || 'proveedor es requerido']"
                              required

                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Salir</v-btn>
                    <v-btn color="blue darken-1" text @click="saveMateriaPrima" :disabled="!valid">Guardar</v-btn>
                </v-card-actions>
                </v-form>
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
      letter(propertyType) {
        return v => /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]+$/.test(v) || `Solo acepta ${propertyType}`
      },
      number(propertyType) {
        return v => /^\d+$/.test(v) || `Solo acepta ${propertyType}`
      },
      maxlength(propertyType, maxlength) {
        return v => v && v.length <= maxlength || `${propertyType} no puede superar los ${maxlength} caracteres`
      },

      MateriaPrima: [],
      UnidadMedida: [],
      Proveedor: [],

      CodigoMP: "",
      NombreMP: "",
      Clase: "",
      Observacion: "",
      Descripcion: "",
      NombreUnidad: "",
      UnidadMedidaID: "",
      NombreProveedor: "",
      ProveedorID: "",
      url3: "http://localhost/PanaderiaBG/public/Proveedores",
      url2: "http://localhost/PanaderiaBG/public/UnidadMateria",
      url: "http://localhost/PanaderiaBG/public/MateriaPrima",
      search: "",
      dialog: false,
      headers: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "CodigoMP",
          class: 'indigo white--text'
        },
        //  { text: "Codigo", value: "CodigoMP" },
        {text: "Nombre", value: "NombreMP", class: 'indigo  white--text'},
        {text: "Clase", value: "Clase", class: 'indigo white--text'},
        {text: "Obervacion", value: "Observacion", class: 'indigo white--text'},
        {text: "Descripcion", value: "Descripcion", class: 'indigo white--text'},
        {text: "Unidad de Medida", value: "NombreUnidad", class: 'indigo white--text'},
        {text: "Proveedor", value: "NombreProveedor", class: 'indigo white--text'}

      ]
    };
  },
  methods: {
    getProveedores: async function () {
      const res = await this.$http.get(this.url3);
      this.Proveedor = res.data;
    },
    getUnidad: async function () {
      const res = await this.$http.get(this.url2);
      this.UnidadMedida = res.data;

    },
    getMateriaPrima: async function () {
      const res = await this.$http.get(this.url);
      this.MateriaPrima = res.data;
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    saveMateriaPrima: async function () {
      const obj = new FormData();
      obj.append("CodigoMP", this.CodigoMP);
      obj.append("NombreMP", this.NombreMP);
      obj.append("Clase", this.Clase);
      obj.append("Observacion", this.Observacion);
      obj.append("Descripcion", this.Descripcion);
      obj.append("UnidadMedidaID", this.UnidadMedidaID);
      obj.append("ProveedorID", this.ProveedorID);
      const res = await this.$http.post(this.url, obj);
      this.MateriaPrima.push(res.data.result);
      this.CodigoMP = "";
      this.NombreMP = "";
      this.Clase = "";
      this.Observacion = "";
      this.Descripcion = "";
      this.UnidadMedidaID = "";
      this.ProveedorID = "";
      this.getMateriaPrima();
      this.close();
    },
  },
  created() {
    this.getMateriaPrima();
    this.getUnidad();
    this.getProveedores();
  }
};
</script>
