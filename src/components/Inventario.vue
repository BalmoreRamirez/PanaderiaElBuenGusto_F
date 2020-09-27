<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="Inventario"
        :search="search"
        class="elevation-10"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Inventario</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>add</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">Inventario</span>
                </v-card-title>

                <v-form v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="Cantidad"
                            label="Cantidad*"
                            :rules="[required('cantidad '), number('numeros')]"
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
                                v-model="FechaMovimiento"
                                label="Fecha de movimiento"
                                :rules="[required('Fecha de movimiento')]"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="FechaMovimiento"
                              @input="menu"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-select
                            :items="MateriaPrima"
                            item-text="NombreMP"
                            item-value="IdRegistroMP"
                            v-model="RegistroMPID"
                            label="Selecione la materia prima"
                            :rules="[
                              (v) => !!v || 'Materia prima es requerido',
                            ]"
                            required
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Sucursal"
                            item-text="NombreSucursal"
                            item-value="IdSucursal"
                            v-model="SucursalID"
                            label="Selecione una sucursal"
                            :rules="[(v) => !!v || 'Sucursal es requerido']"
                            required
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Salir</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveInventario"
                      :disabled="!valid"
                      >Guardar</v-btn
                    >
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
import axios from "axios";
axios.defaults.baseURL = "http://localhost";
export default {
  name: "TableInventario",
  data() {
    return {
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

      Inventario: [],
      Sucursal: [],
      MateriaPrima: [],

      IdMovimiento: "",
      Cantidad: "",
      FechaMovimiento: "",
      NombreMP: "",
      RegistroMPID: "",
      NombreSucursal: "",
      SucursalID: "",
      url3: "/PanaderiaBG/public/ShowMateriaPrima",
      url2: "/PanaderiaBG/public/Sucursal",
      url: "http://localhost/PanaderiaBG/public/MovimientoMP",
      search: "",
      dialog: false,
      headers: [
        {
          text: "Movimiento ID",
          value: "IdMovimiento",
          class: "indigo white--text",
        },

        {
          text: "Cantidad",
          value: "Cantidad",
          class: "indigo white--text",
        },

        {
          text: " Fecha de movimiento",
          value: "FechaMovimiento",
          class: "indigo  white--text",
        },

        {
          text: "Nombre de Producto",
          value: "NombreMP",
          class: "indigo white--text",
        },

        {
          text: " Sucursal",
          value: "NombreSucursal",
          class: "indigo  white--text",
        },
      ],
    };
  },
  methods: {
    getMateriaPrima: async function () {
      const res = await this.$http.get(this.url3);
      this.MateriaPrima = res.data;
    },
    getSucursal: async function () {
      const res = await this.$http.get(this.url2);
      this.Sucursal = res.data;
    },
    getInventario: async function () {
      const res = await this.$http.get(this.url);
      this.Inventario = res.data;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    saveInventario: async function () {
      const obj = new FormData();

      obj.append("Cantidad", this.Cantidad);
      obj.append("FechaMovimiento", this.FechaMovimiento);
      obj.append("MateriaPrimaID", this.RegistroMPID);
      obj.append("SucursalID", this.SucursalID);
      const res = await this.$http.post(this.url, obj);
      this.Inventario.push(res.data.result);
      this.Cantidad = "";
      this.FechaMovimiento = "";
      this.RegistroMPID = "";
      this.SucursalID = "";
      this.getInventario();
      this.close();
    },
  },
  created() {
    this.getInventario();
    this.getMateriaPrima();
    this.getSucursal();
  },
};
</script>

