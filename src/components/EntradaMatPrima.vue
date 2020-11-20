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
            <v-toolbar-title
              >Registro de entradas de Materia Prima</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog2" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Entrada de Materia Prima</span>
                </v-card-title>
                <v-form ref="form" v-model="valid">
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
                            disabled
                            :rules="[
                              (v) => !!v || 'Materia Prima es requerido',
                            ]"
                            id="IdRegistroMP"
                            @click="errors.clear('IdRegistroMP')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdRegistroMP')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="Desperdicio"
                            label="Desperdicio*"
                            :rules="[
                              desperdicioregla,
                              number('numeros'),
                            ]"
                            disabled
                            id="Desperdicio"
                            @keydown="errors.clear('Desperdicio')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('Desperdicio')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            type="number"
                            v-model="CantidadTotal"
                            label="Cantidad*"
                            :rules="cantidadregla"
                            disabled
                            id="CantidadTotal"
                            @keydown="errors.clear('CantidadTotal')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('CantidadTotal')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Bodegas"
                            item-text="NombreBodega"
                            item-value="IdBodega"
                            v-model="BodegaID"
                            label="Selecione Bodega"
                            :rules="[(v) => !!v || 'Bodega es requerida']"
                            disabled
                            id="IdBodega"
                            @click="errors.clear('IdBodega')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdBodega')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            type="number"
                            v-model="PrecioUnitario"
                            label="Precio Unitario*"
                            :rules="precioregla"
                            disabled
                            id="PrecioUnitario"
                            @keydown="errors.clear('PrecioUnitario')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('PrecioUnitario')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                :value="computedFechaCaducidadFormattedMomentjs"
                                label="Fecha Caducidad"
                                :rules="[required('Fecha Caducidad')]"
                                prepend-icon="event"
                                readonly
                                  @click="errors.clear('message')"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                               <span
                                class="red--text"
                                v-text="errors.get('message')"
                              ></span>
                            </template>
                            <v-date-picker
                              v-model="FechaCaducidad"
                              @input="menu2 = false"
                            ></v-date-picker>
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
                            disabled
                            id="IdUnidadMedida"
                            @click="errors.clear('IdUnidadMedida')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdUnidadMedida')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Proveedor"
                            item-text="NombreProveedor"
                            item-value="IdProveedor"
                            v-model="ProveedorId"
                            label="Selecione Proveedor"
                            :rules="[(v) => !!v || 'proveedor es requerido']"
                            disabled
                            id="IdProveedor"
                            @click="errors.clear('IdProveedor')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdProveedor')"
                          ></span>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeEdit"
                      >Salir</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveEditar"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" persistent max-width="600px">
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
                  <span class="headline">Entrada de Materia Prima</span>
                </v-card-title>
                <v-form ref="form" v-model="valid">
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
                            :rules="[
                              (v) => !!v || 'Materia Prima es requerido',
                            ]"
                            id="IdRegistroMP"
                            @click="errors.clear('IdRegistroMP')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdRegistroMP')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="Desperdicio"
                            label="Desperdicio*"
                            :rules="[
                              required('Desperdicio'),
                              number('numeros'),
                            ]"
                            id="Desperdicio"
                            @keydown="errors.clear('Desperdicio')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('Desperdicio')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            type="number"
                            v-model="CantidadTotal"
                            label="Cantidad*"
                            :rules="[required('Cantidad Total')]"
                            id="CantidadTotal"
                            @keydown="errors.clear('msg')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('msg')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Bodegas"
                            item-text="NombreBodega"
                            item-value="IdBodega"
                            v-model="BodegaID"
                            label="Selecione Bodega"
                            :rules="[(v) => !!v || 'Bodega es requerida']"
                            id="IdBodega"
                            @click="errors.clear('IdBodega')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdBodega')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            type="number"
                            v-model="PrecioUnitario"
                            label="Precio Unitario*"
                            :rules="[required('Precio Unitario')]"
                            id="PrecioUnitario"
                            @keydown="errors.clear('PrecioUnitario')"
                          ></v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('PrecioUnitario')"
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
                                :value="computedFechaCaducidadFormattedMomentjs"
                                label="Fecha Caducidad"
                                :rules="[required('Fecha Caducidad')]"
                                prepend-icon="event"
                                readonly
                                  @click="errors.clear('message')"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                               <span
                                class="red--text"
                                v-text="errors.get('message')"
                              ></span>
                            </template>
                            <v-date-picker
                              v-model="FechaCaducidad"
                              @input="menu = false"
                            ></v-date-picker>
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
                            id="IdUnidadMedida"
                            @click="errors.clear('IdUnidadMedida')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdUnidadMedida')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Proveedor"
                            item-text="NombreProveedor"
                            item-value="IdProveedor"
                            v-model="ProveedorId"
                            label="Selecione Proveedor"
                            :rules="[(v) => !!v || 'proveedor es requerido']"
                            id="IdProveedor"
                            @click="errors.clear('IdProveedor')"
                            required
                          ></v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('IdProveedor')"
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
                      @click="saveMateriaPrima"
                      :disabled="!valid"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>

                 <!--======Confirmacion eliminar=======-->

            <v-dialog v-model="dialog3" persistent max-width="330">
              <v-card>
                <v-card-title class="headline">
                  ¿Estas seguro de anular el registro?
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="saveAnular">
                    Si
                  </v-btn>
                  <v-btn color="green darken-1" text @click="closeAnular">
                    No
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            
          </v-toolbar>

          <div>
            <v-alert :value="Alert" type="success" border="top" dense>
              Registro guardado exitosamente.
            </v-alert>
             <v-alert :value="Alert2" type="success" border="top" dense>
              Registro actualizado exitosamente.
            </v-alert>
            <v-alert :value="Alert3" type="success" border="top" dense>
              Registro anulado exitosamente.
            </v-alert>
          </div>
        </template>
          <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mb-2" color="primary" @click="formEdit(item)">
            edit
          </v-icon>
          <v-icon class="mr-2" color="primary" large @click="FormAnular(item)">
            delete
          </v-icon>
           </template>
        
        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mb-2" v-if="item.FechaCaducidad < currentDate" color='green' >
            ALTA
          </v-btn>
          <v-btn class="mb-2"  v-else color='red' >
            BAJA
          </v-btn>
        </template> -->
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
  name: "EntradaMatPrima",
  data() {
    return {
      Alert: false,
      Alert2: false,
      Alert3: false,
      errors: new Errors(),
      menu: false,
      menu2: false,
      valid: false,
      cantidadregla: [(v) => !!v || "Cantidad es necesaria"],
      desperdicioregla: [(v) => !!v || "Desperdicio es necesario"],
      precioregla: [(v) => !!v || "Precio es necesario"],
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
      Anulado: "",
      currentDate: moment(new Date()).format("DD/MM/YYYY"),
      url5: "http://localhost/PanaderiaBG/public/ShowMateriaPrima",
      url4: "http://localhost/PanaderiaBG/public/Bodegas",
      url3: "http://localhost/PanaderiaBG/public/Proveedores",
      url2: "http://localhost/PanaderiaBG/public/UnidadMateria",
      url: "http://localhost/PanaderiaBG/public/MateriaPrimaProveedor",
      url6: "http://localhost/PanaderiaBG/public/AnularEntrada",
      
      search: "",
      dialog: false,
      dialog2: false,
      dialog3: false,
      headers: [
        {
          text: "Materia Prima",
          value: "NombreMP",
          class: "indigo  white--text",
        },
        {
          text: "Desperdicio",
          value: "Desperdicio",
          class: "indigo  white--text",
        },
        {
          text: "Cantidad Total",
          value: "CantidadTotal",
          class: "indigo  white--text",
        },
        {
          text: "Fecha Caducidad",
          value: "FechaCaducidad",

          class: "indigo  white--text",
        },
        {
          text: "Precio Unitario",
          value: "PrecioUnitario",
          class: "indigo  white--text",
        },
        {
          text: "Unidad de Medida",
          value: "NombreUnidad",
          class: "indigo  white--text",
        },
        {
          text: "Proveedor",
          value: "NombreProveedor",
          class: "indigo  white--text",
        },
        { text: "Bodega", 
        value: "NombreBodega", 
        class: "indigo  white--text" 
        },
        {
          text: "Dias Faltantes",
          value: "Dias",
          class: "indigo  white--text",
          sortable: false,
        },
        {
          text: "Acción",
          value: "actions",
          class: "indigo  white--text",
          sortable: false,
        },
      ],
    };
  },
  //Defino el formato a mostrar en el date picker en el formulario
  computed: {
    computedFechaCaducidadFormattedMomentjs() {
      return this.FechaCaducidad
        ? moment(this.FechaCaducidad).format("YYYY-MM-DD")
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
    getBodegas() {
       this.axios.get('/Bodegas')
      .then(res=>{
       this.Bodegas=res.data
     })
      .catch(e=>{
        console.log(e.response)
      })
    },
    getProveedores() {
       this.axios.get('/Proveedores')
     .then(res=>{
       this.Proveedor=res.data
     })
      .catch(e=>{
        console.log(e.response)
      })
    },
    getUnidad() {
       this.axios.get('/UnidadMateria')
    .then(res=>{
       this.UnidadMedida=res.data
     })
      .catch(e=>{
        console.log(e.response)
      })
    },

    getEntradaMatPrima: async function () {
      const res = await this.$http.get(this.url);
      this.EntradaMatPrima = res.data;
      let result = this.EntradaMatPrima.map(function(o) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate());

        let loopDate = moment(o.FechaCaducidad,'DD-MM-YYYY').format('YYYY-MM-DD');
        loopDate = new Date(loopDate); 
        const diffTime = Math.abs(loopDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(currentDate)
        if (loopDate <=  currentDate) {

          o.Dias = 'Caducado';
        }
        else {
          o.Dias = 'Faltan ' + diffDays + ' dias para que caduque'; 
        }
         
      return o;
      })
      console.log(result);
      setTimeout(() => {
        this.Alert = false;
        this.Alert2 = false;
        this.Alert3 = false;
      }, 5000);
    },
    //limpia errores front-end
    clear() {
      this.$refs.form.reset();
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },
    closeAnular() {
      this.dialog3 = false;
    },
    closeEdit() {
      this.dialog2 = false;
          this.ProductoId = "";
          this.Desperdicio = "";
          this.CantidadTotal = "";
          this.FechaCaducidad = "";
          this.PrecioUnitario = "";
          this.UnidadMedidaID = "";
          this.ProveedorId = "";
          this.BodegaID = "";
          this.MateriaPrimaID = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },

     FormAnular(item) {
      this.IDMatPrimaProveedor = item.IDMatPrimaProveedor;
      this.dialog3 = true;
    },

    saveAnular: async function () {
      axios
          .post(this.url6 + "/" + this.IDMatPrimaProveedor)
          .then(() => {
            this.Alert3 = true;

            this.getEntradaMatPrima();
            this.closeAnular();
          })
          .catch((error) => this.errors.record(error.response.data));
    },

    formEdit: function (item) {

      //this.ProductoId = item.ProductoId;
      this.MateriaPrimaID = item.IdRegistroMP;
      this.Desperdicio = item.Desperdicio;
      this.CantidadTotal = item.CantidadTotal;
      this.PrecioUnitario = item.PrecioUnitario;
      this.BodegaID = item.IdBodega;
      this.FechaCaducidad = moment(item.FechaCaducidad,'DD/MM/YYYY').format('YYYY-MM-DD');
      this.UnidadMedidaID = item.IdUnidadMedida;
      this.ProveedorId = item.IdProveedor;
      this.dialog2 = true;
      
    },
    saveEditar: async function () {
      console.log(this.ProveedorId)
      const obj = new FormData();
      //obj.append("ProductoId", this.ProductoId);
      obj.append("Desperdicio", this.Desperdicio);
      obj.append("CantidadTotal", this.CantidadTotal);
      obj.append("FechaCaducidad", this.FechaCaducidad);
      obj.append("PrecioUnitario", this.PrecioUnitario);
      obj.append("UnidadMedidaID", this.UnidadMedidaID);
      obj.append("ProveedorId", this.ProveedorId);
      obj.append("BodegaID", this.BodegaID);
      obj.append("MateriaPrimaID", this.MateriaPrimaID);
      axios
        .post(this.url + "/" + this.MateriaPrimaID, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.EntradaMatPrima.push(response.data.result);
          this.ProductoId = "";
          this.Desperdicio = "";
          this.CantidadTotal = "";
          this.FechaCaducidad = "";
          this.PrecioUnitario = "";
          this.UnidadMedidaID = "";
          this.ProveedorId = "";
          this.BodegaID = "";
          this.MateriaPrimaID = "";
          this.Alert2 = true;
          this.getEntradaMatPrima();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
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
      axios
        .post(this.url, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.EntradaMatPrima.push(response.data.result);
          this.ProductoId = "";
          this.Desperdicio = "";
          this.CantidadTotal = "";
          this.FechaCaducidad = "";
          this.PrecioUnitario = "";
          this.UnidadMedidaID = "";
          this.ProveedorId = "";
          this.BodegaID = "";
          this.MateriaPrimaID = "";
          this.Alert = true;
          this.getEntradaMatPrima();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
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
