<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="Sucursales"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Sucursales</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <template v-slot:activator="{}">
                <v-btn class="mx-2" fab dark color="indigo" @click="formNuevo">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Sucursales</span>
                </v-card-title>
                <v-row justify="center">
                  <v-form ref="form" v-model="valid">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!--=============-->
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoEncargado"
                              item-text="NombreEncargado"
                              item-value="IdEncargado"
                              v-model="EncargadoID"
                              label="Selecione el encargado"
                              :rules="[(v) => !!v || 'encargado es requerido']"
                              id="EncargadoID"
                              @click="errors.clear('EncargadoID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('EncargadoID')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="NombreSucursal"
                              label="Nombre"
                              :rules="[
                                letter('letras'),
                                maxlength('Nombre sucursal', 25),
                              ]"
                              id="NombreSucursal"
                              @keydown="errors.clear('NombreSucursal')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('NombreSucursal')"
                            ></span>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="Ubicacion"
                              label="Ubicacion"
                              :rules="[
                                
                                maxlength('Ubicacion', 25),
                              ]"
                              id="Ubicacion"
                              @keydown="errors.clear('Ubicacion')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('Ubicacion')"
                            ></span>
                          </v-col>

                          



                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="TelefonoSucursal"
                              label="Telefono"
                              :rules="[
                                number('numeros'),
                                maxlength('Telefono Sucursal', 8),
                                minlength('Telefono Sucursal', 8),
                              ]"
                              id="TelefonoSucursal"
                              @keydown="errors.clear('TelefonoSucursal')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('TelefonoSucursal')"
                            ></span>
                          </v-col>
                       
                          <!--=============-->
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
                        @click="saveSucursal"
                        :disabled="!valid"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-row>
              </v-card>
            </v-dialog>

            <!--======Form Editar=======-->

            <v-dialog v-model="dialog2" persistent max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Sucursales</span>
                </v-card-title>
                <v-row justify="center">
                  <v-form ref="form" v-model="valid">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!--=============-->
                        <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoEncargado"
                              item-text="NombreEncargado"
                              item-value="IdEncargado"
                              v-model="EncargadoID"
                              label="Selecione el encargado"
                              :rules="[(v) => !!v || 'encargado es requerido']"
                              id="EncargadoID"
                              @click="errors.clear('EncargadoID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('EncargadoID')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="NombreSucursal"
                              label="Nombre"
                              :rules="[
                                letter('letras'),
                                maxlength('Nombre sucursal', 25),
                              ]"
                              id="NombreSucursal"
                              @keydown="errors.clear('NombreSucursal')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('NombreSucursal')"
                            ></span>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="Ubicacion"
                              label="Ubicacion"
                              :rules="[
                                
                                maxlength('Ubicacion', 25),
                              ]"
                              id="Ubicacion"
                              @keydown="errors.clear('Ubicacion')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('Ubicacion')"
                            ></span>
                          </v-col>

                          



                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="TelefonoSucursal"
                              label="Telefono"
                              :rules="[
                                number('numeros'),
                                maxlength('Telefono Sucursal', 8),
                                minlength('Telefono Sucursal', 8),
                              ]"
                              id="TelefonoSucursal"
                              @keydown="errors.clear('TelefonoSucursal')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('TelefonoSucursal')"
                            ></span>
                          </v-col>

                          <!--=============-->
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeEdit"
                        >Salir</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="saveEditar"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-row>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <div>
            <v-alert :value="Alert" type="success" border="top" dense>
              Registro guardado exitosamente.
            </v-alert>
            <v-alert :value="Alert2" type="success" border="top" dense>
              Registro Actualizado exitosamente.
            </v-alert>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mb-2" color="primary" @click="FormEditar(item)">
            edit
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
  name: "Encargados", //1-definimos el nombre
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
      Sucursales: [],
      TipoEncargado: [],
      /** ============model============== */

      IdSucursal: "",
      NombreSucursal: "",
      Ubicacion: "",
      TelefonoSucursal: "",
      EncargadoID: "",
      NombreEncargado: "",

    
      urlSucursales: "https://panaderiabg.ga",
      urlEncargado: "https://panaderiabg.ga",
      

      /** ========================== */
      headers: [
        {
          text: "Nombre Sucursal",
          value: "NombreSucursal",
          class: "indigo  white--text",
        },
        {
          text: "Ubicacion",
          value: "Ubicacion",
          class: "indigo  white--text",
        },
        {
          text: "Telefono",
          value: "TelefonoSucursal",
          class: "indigo  white--text",
        },

        {
          text: "Encargado",
          value: "NombreEncargado",
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
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },
    closeEdit() {
      this.dialog2 = false;
      this.NombreSucursal = "";
          this.Ubicacion = "";
          this.TelefonoSucursal = "";
          this.EncargadoID = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },

    FormEditar(item) {
      this.IdSucursal = item.IdSucursal
      this.NombreSucursal = item.NombreSucursal;
      this.Ubicacion = item.Ubicacion;
      this.TelefonoSucursal = item.TelefonoSucursal;
      this.EncargadoID = item.EncargadoID;
  
      this.dialog2 = true;
    },
    async getSucursales() {
      const res = await this.$http.get(this.urlSucursales);
      this.Sucursales = res.data;
      setTimeout(() => {
        this.Alert = false;
        this.Alert2 = false;
      }, 5000);
    },

    async getTipoEncargado() {
      const res = await this.$http.get(this.urlEncargado);
      this.TipoEncargado = res.data;
    },

   

    formNuevo: function () {
      this.dialog = true;
    },

    saveSucursal: async function () {
      const obj = new FormData();
      obj.append("NombreSucursal", this.NombreSucursal);
      obj.append("Ubicacion", this.Ubicacion);
      obj.append("TelefonoSucursal", this.TelefonoSucursal);
      obj.append("EncargadoID", this.EncargadoID);

      axios
        .post(this.urlSucursales, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.Sucursales.push(response.data.result);
          this.NombreSucursal = "";
          this.Ubicacion = "";
          this.TelefonoSucursal = "";
          this.EncargadoID = "";
          
          this.Alert = true;
          this.getSucursales();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },

    saveEditar: async function () {
       const obj = new FormData();
      obj.append("NombreSucursal", this.NombreSucursal);
      obj.append("Ubicacion", this.Ubicacion);
      obj.append("TelefonoSucursal", this.TelefonoSucursal);
      obj.append("EncargadoID", this.EncargadoID);
    
      axios
        .post(this.urlSucursales + "/" + this.IdSucursal, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.Sucursales.push(response.data.result);
          this.NombreSucursal = "";
          this.Ubicacion = "";
          this.TelefonoSucursal = "";
          this.EncargadoID = "";
          
          this.Alert = true;
          this.getSucursales();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },
  },
  created() {
    this.getSucursales();
    this.getTipoEncargado();
  },
};
</script>


