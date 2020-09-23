<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="EntradaMatPrima"
          :search="search"
          class="elevation-10"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Registro de entradas de Materia Prima</v-toolbar-title>
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
                  <span class="headline">Entrada de Materia Prima</span>
                </v-card-title>
                <v-form v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="MateriaPrima"
                              item-text="NombreMP"
                              item-value="IdRegistroMP"
                              v-model="MateriaPrimaID"
                              label="Selecione Materia Prima"
                              :rules="[(v) => !!v || 'Materia Prima es requerido']"
                              required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="Desperdicio"
                              label="Desperdicio*"
                              :rules="[required('Desperdicio'), number('numeros')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="CantidadTotal"
                              label="Cantidad*"
                              :rules="[required('CantidadTotal'), number('numeros')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="Bodegas"
                              item-text="NombreBodega"
                              item-value="IdBodega"
                              v-model="BodegaID"
                              label="Selecione Bodega"
                              :rules="[(v) => !!v || 'Bodega es requerida']"
                              required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="PrecioUnitario"
                              label="Precio Unitario*"
                              :rules="[required('PrecioUnitario'), number('numeros')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="FechaCaducidad"
                                  label="Fecha Caducidad"
                                  :rules="[required('FechaCaducidad')]"
                                  prepend-icon="event"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"

                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="FechaCaducidad" @input="menu"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="UnidadMedida"
                              item-text="NombreUnidad"
                              item-value="IdUnidadMedida"
                              v-model="UnidadMedidaID"
                              label="Selecione la unidad"
                              :rules="[(v) => !!v || 'Unidad es requerido']"
                              required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="Proveedor"
                              item-text="NombreProveedor"
                              item-value="IdProveedor"
                              v-model="ProveedorId"
                              label="Selecione Proveedor"
                              :rules="[(v) => !!v || 'proveedor es requerido']"
                              required
                          ></v-select>
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
  name: "EntradaMatPrima",
  data() {
    return {
      date: false,
      menu: false,
      valid: false,
      required(propertyType) {
        return (v) =>
            (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },
      letter(propertyType) {
        return (v) =>
            /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]+$/.test(v) ||
            `Solo acepta ${propertyType}`;
      },
      number(propertyType) {
        return (v) => /^\d+$/.test(v) || `Solo acepta ${propertyType}`;
      },
      maxlength(propertyType, maxlength) {
        return (v) =>
            (v && v.length <= maxlength) ||
            `${propertyType} no puede superar los ${maxlength} caracteres`;
      },

      EntradaMatPrima: [],
      MateriaPrima: [],
      Bodegas: [],
      UnidadMedida: [],
      Proveedor: [],

      ProveedorId: "",
      NombreProveedor: "",
      MateriaPrimaID: "",
      NombreMP: "",
      CantidadTotal: "",
      Desperdicio: "",
      FechaCaducidad: "",
      UnidadMedidaID: "",
      NombreUnidad: "",
      PrecioUnitario: "",
      BodegaID: "",
      NombreBodega: "",
      url5: "http://localhost/PanaderiaBG/public/ShowMateriaPrima",
      url4: "http://localhost/PanaderiaBG/public/Bodegas",
      url3: "http://localhost/PanaderiaBG/public/Proveedores",
      url2: "http://localhost/PanaderiaBG/public/UnidadMateria",
      url: "http://localhost/PanaderiaBG/public/MateriaPrimaProveedor",
      search: "",
      dialog: false,
      headers: [
        {text: "Materia Prima", value: "NombreMP", class: 'indigo  white--text'},
        {text: "Desperdicio", value: "Desperdicio", class: 'indigo  white--text'},
        {text: "Cantidad Total", value: "CantidadTotal", class: 'indigo  white--text'},
        {text: "Fecha Caducidad", value: "FechaCaducidad", class: 'indigo  white--text'},
        {text: "Precio Unitario", value: "PrecioUnitario", class: 'indigo  white--text'},
        {text: "Unidad de Medida", value: "NombreUnidad", class: 'indigo  white--text'},
        {text: "Proveedor", value: "NombreProveedor", class: 'indigo  white--text'},
        {text: "Bodega", value: "NombreBodega", class: 'indigo  white--text'},
      ],
    };
  },
  methods: {
    getMateriaPrima: async function () {
      const res = await this.$http.get(this.url5);
      this.MateriaPrima = res.data;
    },
    getBodegas: async function () {
      const res = await this.$http.get(this.url4);
      this.Bodegas = res.data;
    },
    getProveedores: async function () {
      const res = await this.$http.get(this.url3);
      this.Proveedor = res.data;
    },
    getUnidad: async function () {
      const res = await this.$http.get(this.url2);
      this.UnidadMedida = res.data;
    },
    getEntradaMatPrima: async function () {
      const res = await this.$http.get(this.url);
      this.EntradaMatPrima = res.data;
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
      obj.append("ProductoId", this.ProductoId);
      obj.append("Desperdicio", this.Desperdicio);
      obj.append("CantidadTotal", this.CantidadTotal);
      obj.append("FechaCaducidad", this.FechaCaducidad);
      obj.append("PrecioUnitario", this.PrecioUnitario);
      obj.append("UnidadMedidaID", this.UnidadMedidaID);
      obj.append("ProveedorId", this.ProveedorId);
      obj.append("BodegaID", this.BodegaID);
      obj.append("MateriaPrimaID", this.MateriaPrimaID);
      const res = await this.$http.post(this.url, obj);
      this.EntradaMatPrima.push(res.data.result);
      this.ProductoId = "";
      this.Desperdicio = "";
      this.CantidadTotal = "";
      this.FechaCaducidad = "";
      this.PrecioUnitario = "";
      this.UnidadMedidaID = "";
      this.ProveedorId = "";
      this.BodegaID = "";
      this.MateriaPrimaID = "";
      this.getEntradaMatPrima();
      this.close();
    },

  },
  created() {
    this.getEntradaMatPrima();
    this.getUnidad();
    this.getProveedores();
    this.getBodegas();
    this.getMateriaPrima();
  },
};
</script>
