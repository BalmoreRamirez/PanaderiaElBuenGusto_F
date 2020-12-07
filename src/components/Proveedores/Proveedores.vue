<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="Proveedores"
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Proveedores</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-row>
              <v-col cols="3">
                <!-- Filtro por codigo -->
                <v-text-field
                    v-model="CodigoValue"
                    append-icon="mdi-magnify"
                    label="Codigo"
                    single-line
                    hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <!-- Filtro por nombre -->
                <v-text-field
                    v-model="NombreValue"
                    append-icon="mdi-magnify"
                    label="Nombre"
                    single-line
                    hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <!-- Filtro por tipo -->
                <v-select
                    :items="TipoProveedor"
                    item-text="NombreTipo"
                    v-model="TipoValue"
                    label="Tipo"
                ></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn color="blue darken-1" text @click="clearfilter"
                >Limpiar
                </v-btn
                >
              </v-col>
            </v-row>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="500px">
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
                  <span class="headline">Proveedores</span>
                </v-card-title>
                <v-row justify="center">
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                      >Persona
                      </v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-form ref="form" v-model="valid">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <!--=============-->
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="TituloProveedor"
                                      label="Titulo"
                                      :rules="[
                                      letter('letras'),
                                      maxlength('Titulo proveedor', 50),
                                    ]"
                                      id="TituloProveedor"
                                      @keydown="errors.clear('TituloProveedor')"
                                  >
                                  </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="CodigoProveedor"
                                      label="Codigo"
                                      :rules="[
                                      required('CodigoProveedor'),
                                      maxlength('Codigo Proveedor', 15),
                                    ]"
                                      id="CodigoProveedor"
                                      @keydown="errors.clear('CodigoProveedor')"
                                  >
                                  </v-text-field>
                                  <span
                                      class="red--text"
                                      v-text="errors.get('CodigoProveedor')"
                                  ></span>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="NombreProveedor"
                                      label="Nombre de Proveedor"
                                      :rules="[
                                      required('Nombre Proveedor'),
                                      letter('letras'),
                                      maxlength('Nombre Proveedor', 50),
                                    ]"
                                      id="NombreProveedor"
                                      @keydown="errors.clear('NombreProveedor')"
                                  >
                                  </v-text-field>
                                  <span
                                      class="red--text"
                                      v-text="errors.get('NombreProveedor')"
                                  ></span>
                                </v-col>
                                <!--=============-->

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="TelefonoProveedor"
                                      label="Telefono"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('Telefono Proveedor', 8),
                                      minlength('Telefono Proveedor', 8),
                                    ]"
                                      id="TelefonoProveedor"
                                      @keydown="errors.clear('TelefonoProveedor')"
                                      required
                                  >
                                  </v-text-field>
                                </v-col>
                                <!--=============-->
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="MovilProveedor"
                                      label="Movil"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('Movil Proveedor', 8),
                                      minlength('Movil Proveedor', 8),
                                    ]"
                                      id="MovilProveedor"
                                      @keydown="errors.clear('MovilProveedor')"
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="EmailProveedor"
                                      label="Correo"
                                      :rules="[
                                      maxlength('Email', 25),
                                      email('Email'),
                                    ]"
                                      id="EmailProveedor"
                                      @keydown="errors.clear('EmailProveedor')"
                                      required
                                  >
                                  </v-text-field>
                                </v-col>
                                <!--=============-->

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="NITPRoveedor"
                                      label="NIT"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('NIT Proveedor', 20),
                                      minlength('Nit Proveedor', 14),
                                    ]"
                                      id="NITPRoveedor"
                                      @keydown="errors.clear('NITPRoveedor')"
                                  >
                                  </v-text-field>
                                </v-col>

                                <!--=============-->
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close"
                            >Salir
                            </v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="saveProveedoresPersona"
                                :disabled="!valid"
                            >Guardar
                            </v-btn
                            >
                          </v-card-actions>
                        </v-form>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header
                      >Empresa
                      </v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-form ref="form" v-model="valid">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <!--=============-->
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="CodigoProveedor"
                                      label="Codigo"
                                      :rules="[
                                      required('Codigo Proveedor'),
                                      maxlength('Codigo Proveedor', 15),
                                    ]"
                                      id="CodigoProveedor"
                                      @keydown="errors.clear('CodigoProveedor')"
                                  >
                                  </v-text-field>
                                  <span
                                      class="red--text"
                                      v-text="errors.get('CodigoProveedor')"
                                  ></span>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="NombreProveedor"
                                      label="Nombre de Proveedor"
                                      :rules="[
                                      required('Nombre Proveedor'),
                                      letter('letras'),
                                      maxlength('Nombre Proveedor', 50),
                                    ]"
                                      id="NombreProveedor"
                                      @keydown="errors.clear('NombreProveedor')"
                                  >
                                  </v-text-field>
                                  <span
                                      class="red--text"
                                      v-text="errors.get('NombreProveedor')"
                                  ></span>
                                </v-col>

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="TelefonoProveedor"
                                      label="Telefono"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('Telefono Proveedor', 8),
                                      minlength('Telefono Proveedor', 8),
                                    ]"
                                      id="TelefonoProveedor"
                                      @keydown="errors.clear('TelefonoProveedor')"
                                      required
                                  >
                                  </v-text-field>
                                </v-col>
                                <!--=============-->
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="MovilProveedor"
                                      label="Movil"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('Movil Proveedor', 8),
                                      minlength('Movil Proveedor', 8),
                                    ]"
                                      id="MovilProveedor"
                                      @keydown="errors.clear('MovilProveedor')"
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="EmailProveedor"
                                      label="Correo"
                                      :rules="[
                                      maxlength('Email', 25),
                                      email('Email'),
                                    ]"
                                      id="EmailProveedor"
                                      @keydown="errors.clear('EmailProveedor')"
                                      required
                                  >
                                  </v-text-field>
                                </v-col>
                                <!--=============-->
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="FaxProveedor"
                                      label="Fax"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('Fax Proveedor', 9),
                                      minlength('Fax Proveedor', 8),
                                    ]"
                                      id="Observacion"
                                      @keydown="errors.clear('FaxProveedor')"
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                  <v-text-field
                                      v-model="NIDFiscal"
                                      label="NID"
                                      :rules="[
                                      number('numeros'),
                                      maxlength('NID Fiscal', 25),
                                      minlength('NID Fiscal', 14),
                                    ]"
                                      id="NIDFiscal"
                                      @keydown="errors.clear('NIDFiscal')"
                                  >
                                  </v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close"
                            >Salir
                            </v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="saveProveedoresEmpresa"
                                :disabled="!valid"
                            >Guardar
                            </v-btn
                            >
                          </v-card-actions>
                        </v-form>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
              </v-card>
            </v-dialog>

            <!--======Confirmacion eliminar=======-->

            <v-dialog v-model="dialog2" persistent max-width="350">
              <v-card>
                <v-card-title class="headline">
                  ¿Estas seguro de eliminar el registro?
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="saveEliminar">
                    Si
                  </v-btn>
                  <v-btn color="green darken-1" text @click="closeEliminar">
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
              Registro Eliminado exitosamente.
            </v-alert>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2" color="primary" large @click="FormEliminar(item)">
            delete
          </v-icon>
         
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://panaderiabg.ga";
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
  name: "Proveedores", //1-definimos el nombre
  data() {
    return {
      //retornamos los datos a utilizar
      required(propertyType) {
        return (v) =>
            (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },
      maxlength(propertyType, maxlength) {
        return (v) =>
            (v && v.length <= maxlength) ||
            `${propertyType} no puede ser superior a los ${maxlength} caracteres`;
      },
      minlength(propertyType, minlength) {
        return (v) =>
            (v && v.length >= minlength) ||
            `${propertyType} no puede ser inferior a los ${minlength} caracteres`;
      },
      letter(propertyType) {
        return (v) =>
            /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]+$/.test(v) ||
            `Solo acepta ${propertyType}`;
      },
      number(propertyType) {
        return (v) => /^\d+$/.test(v) || `Solo acepta ${propertyType}`;
      },

      email(propertyType) {
        return (v) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                v
            ) || ` ${propertyType} no valido`;
      },

      valid: false,
      dialog: false,
      dialog2: false,
      Alert: false,
      Alert2: false,
      errors: new Errors(),
      /** ============array============== */
      Proveedores: [],
      TipoProveedor: [],
      /** ============model============== */
      CodigoProveedor: "",
      NombreProveedor: "",
      TipoProveedorID: "",
      TelefonoProveedor: "",
      MovilProveedor: "",
      EmailProveedor: "",
      FaxProveedor: "",
      password: "",
      NITPRoveedor: "",
      NIDFiscal: "",
      TituloProveedor: "",
      IdTipo: "",
      Inactivo: "",
      NombreTipo: "",
      CodigoValue: "",
      NombreValue: "",
      TipoValue: null,

      urlGuardarProv: "https://panaderiabg.ga",
      urlListaProveedores:
          "https://panaderiabg.ga",
      urlListaTipoProveedores:
          "https://panaderiabg.ga",
      /** ========================== */
      headers: [
        {
          text: "Codigo",
          value: "CodigoProveedor",
          class: "indigo  white--text",
          filter: this.CodigoFilter,
        },
        {
          text: "Nombre ",
          value: "NombreProveedor",
          class: "indigo  white--text",
          filter: this.NombreFilter,
        },
        {
          text: "Tipo",
          value: "NombreTipo",
          class: "indigo  white--text",
          filter: this.TipoFilter,
        },

        {
          text: "Telefono",
          value: "TelefonoProveedor",
          class: "indigo  white--text",
        },
        {
          text: "Correo",
          value: "EmailProveedor",
          class: "indigo  white--text",
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
  methods: {
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
    closeEliminar() {
      this.dialog2 = false;
    },
    ProveedorEdit(){
      alert('Edit')
    },
    FormEliminar(item) {
      this.IdProveedor = item.IdProveedor;
      this.dialog2 = true;
    },
    async getProveedores() {
      const res = await this.$http.get('/ListaProveedores');
      this.Proveedores = res.data;
      setTimeout(() => {
        this.Alert = false;
        this.Alert2 = false;
      }, 5000);
    },

    async getTipoProveedor() {
      const res = await this.$http.get('/TipoProveedor');
      this.TipoProveedor = res.data;
    },
    saveProveedoresPersona: async function () {
      const obj = new FormData();
      obj.append("CodigoProveedor", this.CodigoProveedor);
      obj.append("NombreProveedor", this.NombreProveedor);
      obj.append("TipoProveedorID", "1");
      obj.append("TelefonoProveedor", this.TelefonoProveedor);
      obj.append("MovilProveedor", this.MovilProveedor);
      obj.append("EmailProveedor", this.EmailProveedor);
      obj.append("FaxProveedor", this.FaxProveedor);
      obj.append("NITProveedor", this.NITProveedor);
      obj.append("NIDFiscal", this.NIDFiscal);
      obj.append("TituloProveedor", this.TituloProveedor);
      axios
          .post('/Proveedores', obj)
          .then((response) => {
            //console.log(response.data.result)
            this.Proveedores.push(response.data.result);
            this.CodigoProveedor = "";
            this.NombreProveedor = "";
            this.TipoProveedorID = "";
            this.TelefonoProveedor = "";
            this.MovilProveedor = "";
            this.EmailProveedor = "";
            this.FaxProveedor = "";
            this.NITProveedor = "";
            this.NIDFiscal = "";
            this.TituloProveedor = "";
            this.Alert = true;
            this.getProveedores();

            this.clear();
            this.close();
          })
          .catch((error) => this.errors.record(error.response.data));
    },

    saveEliminar: async function () {
      axios
          .post('/Proveedores' + "/" + this.IdProveedor)
          .then(() => {
            this.Alert2 = true;

            this.getProveedores();
            this.closeEliminar();
          })
          .catch((error) => this.errors.record(error.response.data));
    },

    CodigoFilter(value) {
      if (!this.CodigoValue) {
        return true;
      }
      return value.toLowerCase().includes(this.CodigoValue.toLowerCase());
    },

    NombreFilter(value) {
      if (!this.NombreValue) {
        return true;
      }
      return value.toLowerCase().includes(this.NombreValue.toLowerCase());
    },

    TipoFilter(value2) {
      if (!this.TipoValue) {
        return true;
      }
      return value2 === this.TipoValue;
    },

    clearfilter() {
      this.CodigoValue = "";
      this.NombreValue = "";
      this.TipoValue = "";
    },

    saveProveedoresEmpresa: async function () {
      const obj = new FormData();
      obj.append("CodigoProveedor", this.CodigoProveedor);
      obj.append("NombreProveedor", this.NombreProveedor);
      obj.append("TipoProveedorID", "2");
      obj.append("TelefonoProveedor", this.TelefonoProveedor);
      obj.append("MovilProveedor", this.MovilProveedor);
      obj.append("EmailProveedor", this.EmailProveedor);
      obj.append("FaxProveedor", this.FaxProveedor);
      obj.append("NITProveedor", this.NITProveedor);
      obj.append("NIDFiscal", this.NIDFiscal);
      obj.append("TituloProveedor", this.TituloProveedor);
      axios
          .post('/Proveedores', obj)
          .then((response) => {
            //console.log(response.data.result)
            this.Proveedores.push(response.data.result);
            this.CodigoProveedor = "";
            this.NombreProveedor = "";
            this.TipoProveedorID = "";
            this.TelefonoProveedor = "";
            this.MovilProveedor = "";
            this.EmailProveedor = "";
            this.FaxProveedor = "";
            this.NITProveedor = "";
            this.NIDFiscal = "";
            this.TituloProveedor = "";
            this.Alert = true;
            this.getProveedores();

            this.clear();
            this.close();
          })
          .catch((error) => this.errors.record(error.response.data));
    },
  },
  created() {
    this.getProveedores();
    this.getTipoProveedor();
  },
};
</script>

<style scoped>
</style>
