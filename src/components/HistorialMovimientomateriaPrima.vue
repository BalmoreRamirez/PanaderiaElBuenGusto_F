<template>
  <v-layout>
    <v-flex>
      <v-data-table :headers="headers" :items="Inventario" class="elevation-10">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title
              >Historial Movimiento Materia Prima</v-toolbar-title
            >
            <v-divider class="mx-6" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="3">
                 <!-- Filter for materia -->
                <v-text-field
                  v-model="NombreMP"
                  append-icon="mdi-magnify"
                  label="Materia"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <!-- Filter for sucursal -->
                <v-select
                  :items="Sucursal"
                  item-text="NombreSucursal"
                  v-model="SucursalID"
                  label="Sucursal"
                ></v-select>
              </v-col>

              <v-col cols="3">
                <!-- Filter for fecha -->
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
                      :value="computedFechaMovimientoFormattedMomentjs"
                      label="Fecha de movimiento"
                      
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="FechaMovimiento"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
              <v-btn color="blue darken-1" text @click="clearfilter"
                      >Limpiar</v-btn
                    >
              </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <!-- Formulario que no se utiliza de momento  -->
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Inventario</span>
                </v-card-title>

                <v-form ref="form" v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            type="number"
                            v-model="Cantidad"
                            label="Cantidad*"
                            :rules="[required('cantidad ')]"
                            id="Cantidad"
                            @keydown="errors.clear('Cantidad')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('Cantidad')"
                          ></span>
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
                                :value="
                                  computedFechaMovimientoFormattedMomentjs
                                "
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
                              @input="menu = false"
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
                            id="IdRegistroMP"
                            @click="errors.clear('IdRegistroMP')"
                            required
                          >
                          </v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdRegistroMP')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Sucursal"
                            item-text="NombreSucursal"
                            item-value="IdSucursal"
                            v-model="SucursalID"
                            label="Selecione una sucursal"
                            :rules="[(v) => !!v || 'Sucursal es requerido']"
                            id="IdSucursal"
                            @click="errors.clear('IdSucursal')"
                            required
                          >
                          </v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdSucursal')"
                          ></span>
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

            <!-- Fin Formulario que no se utiliza de momento  -->
          </v-toolbar>
          <div>
            <v-alert :value="Alert" type="success" border="top" dense>
              Registro guardado exitosamente.
            </v-alert>
          </div>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
//importo moment para setear la fecha del date picker en el formato segub necesidada
import moment from "moment";

axios.defaults.baseURL = "http://localhost";

class Errors {
  constructor() {
    this.errors = {};
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }

  //Guarda los errores en el array
  record(errors) {
    this.errors = errors;
  }

  //Limpia validaciones backend
  clear(field) {
    delete this.errors[field];
  }
}

export default {
  name: "TableInventario",
  data() {
    return {
      Alert: false,
      errors: new Errors(),
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
      menu: "",
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
          text: "Nombre de Producto",
          value: "NombreMP",
          class: "indigo white--text",
          filter: this.MateriaPrimaFilter,
        },

        {
          text: "Cantidad",
          value: "Cantidad",
          class: "indigo white--text",
        },

        {
          text: " Sucursal",
          value: "NombreSucursal",
          class: "indigo  white--text",
          filter: this.SucursalFilter,
        },

        {
          text: " Fecha de movimiento",
          value: "FechaMovimiento",
          class: "indigo  white--text",
          filter: this.FechaFilter,
        },
      ],
    };
  },

  //Defino el formato a mostrar en el date picker en el formulario
  computed: {
    computedFechaMovimientoFormattedMomentjs() {
      return this.FechaMovimiento
        ? moment(this.FechaMovimiento).format("DD-MM-YYYY")
        : "";
    },
    
    
  },
  methods: {
    getMateriaPrima() {
      this.axios.get('/ShowMateriaPrima')
     .then(res=>{
       this.MateriaPrima=res.data
     })
     .catch(e=>{
       console.log(e.response)
     })
    },
    getSucursal() {
      this.axios.get('/Sucursal')
      .then(res=>{
        this.Sucursal=res.data
      })
      .catch(e=>{
        console.log(e.response)
      })
    },
    getInventario() {
      this.axios.get('/MovimientoMP')
      .then(res=>{
        this.Inventario=res.data
      })
      .catch(e=>{
        console.log(e.response)
      })
    },

    //limpia errores front-end
    clear() {
      this.$refs.form.reset();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },
    saveInventario: async function () {
      const obj = new FormData();

      obj.append("Cantidad", this.Cantidad);
      obj.append("FechaMovimiento", this.FechaMovimiento);
      obj.append("MateriaPrimaID", this.RegistroMPID);
      obj.append("SucursalID", this.SucursalID);
      axios
        .post(this.url, obj)

        .then((response) => {
          this.Inventario.push(response.data.result);
          this.Cantidad = "";
          this.FechaMovimiento = "";
          this.RegistroMPID = "";
          this.SucursalID = "";
          this.Alert = true;
          this.getInventario();
          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },

    /**
     * Filtro para materia
     * @param value
     * @returns {boolean}
     */

    MateriaPrimaFilter(value) {
      if (!this.NombreMP) {
        return true;
      }

      return value.toLowerCase().includes(this.NombreMP.toLowerCase());
    },
    /**
     * Filtro para sucursal
     * @param value2
     * @returns {boolean}
     */
    SucursalFilter(value2) {
      if (!this.SucursalID) {
        return true;
      }

      return value2 === this.SucursalID;
    },

    /**
     * Filtro para fecha
     * @param value3
     * @returns {boolean}
     */
    
    
   

    
    
    FechaFilter(value3) {
      
      let result;
       var d = new Date(value3),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    result = [year, day, month].join('-');

      if (!this.FechaMovimiento) {
        return true;
      }
      console.log("el valor de el valor 3 es " + result);
      console.log("el valor de fechamovimiento es " + this.FechaMovimiento);
      return result === this.FechaMovimiento;
      
    
    },
    clearfilter () {
        this.NombreMP = ''
        this.SucursalID = ''
        this.FechaMovimiento = ''
        
      },
    
  },
  created() {
    this.getInventario();
    this.getMateriaPrima();
    this.getSucursal();
  },
};
</script>

