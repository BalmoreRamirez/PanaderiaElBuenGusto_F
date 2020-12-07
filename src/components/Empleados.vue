<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="Empleados"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Empleados</v-toolbar-title>
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
                  <span class="headline">Empleados</span>
                </v-card-title>
                <v-row justify="center">
                  <v-form ref="form" v-model="valid">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!--=============-->
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoTitulo"
                              item-text="Titulo"
                              item-value="IdTitulo"
                              v-model="TituloID"
                              label="Selecione el titulo"
                              :rules="[(v) => !!v || 'titulo es requerido']"
                              id="TituloID"
                              @click="errors.clear('TituloID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('TituloID')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="NombreEmpleado"
                              label="Nombre"
                              :rules="[
                                letter('letras'),
                                maxlength('Nombre Empleado', 25),
                              ]"
                              id="NombreEmpleado"
                              @keydown="errors.clear('NombreEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('NombreEmpleado')"
                            ></span>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="ApellidoEmpleado"
                              label="Apellido"
                              :rules="[
                                letter('letras'),
                                maxlength('Apellido Empleado', 25),
                              ]"
                              id="ApellidoEmpleado"
                              @keydown="errors.clear('ApellidoEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('ApellidoEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              :items="sexo"
                              label="Genero"
                              v-model="GeneroEmpleado"
                              :rules="[(v) => !!v || 'genero es requerido']"
                              id="GeneroEmpleado"
                              @click="errors.clear('GeneroEmpleado')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('GeneroEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="DireccionEmpleado"
                              label="Direccion"
                              :rules="[maxlength('Direccion Empleado', 100)]"
                              id="DireccionEmpleado"
                              @keydown="errors.clear('DireccionEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('DireccionEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="EmailEmpleado"
                              label="Correo"
                              :rules="[maxlength('Email', 30), email('Email')]"
                              id="EmailEmpleado"
                              @keydown="errors.clear('EmailEmpleado')"
                              required
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('EmailEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="TelefonoEmpleado"
                              label="Telefono"
                              :rules="[
                                number('numeros'),
                                maxlength('Telefono Empleado', 8),
                                minlength('Telefono Empleado', 8),
                              ]"
                              id="TelefonoEmpleado"
                              @keydown="errors.clear('TelefonoEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('TelefonoEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="MovilEmpleado"
                              label="Movil"
                              :rules="[
                                number('numeros'),
                                maxlength('Movil Empleado', 8),
                                minlength('Movil Empleado', 8),
                              ]"
                              id="MovilEmpleado"
                              @keydown="errors.clear('MovilEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('MovilEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="DUIEmpleado"
                              label="DUI"
                              :rules="[
                                number('numeros'),
                                maxlength('DUI', 9),
                                minlength('DUI', 9),
                              ]"
                              id="DUIEmpleado"
                              @keydown="errors.clear('DUIEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('DUIEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="Observaciones"
                              label="Observaciones"
                              :rules="[maxlength('Observaciones', 100)]"
                              id="Observaciones"
                              @keydown="errors.clear('Observaciones')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('Observaciones')"
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
                                  :value="
                                    computedFechaContratacionFormattedMomentjs
                                  "
                                  label="Fecha Contratacion"
                                  :rules="[required('Fecha Contratacion')]"
                                  prepend-icon="event"
                                  readonly
                                  @click="errors.clear('FechaContratacion')"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                                <span
                                  class="red--text"
                                  v-text="errors.get('FechaContratacion')"
                                ></span>
                              </template>
                              <v-date-picker
                                v-model="FechaContratacion"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-menu
                              v-model="menu3"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    computedFechaNacimientoFormattedMomentjs
                                  "
                                  label="Fecha Nacimiento"
                                  :rules="[required('Fecha Nacimiento')]"
                                  prepend-icon="event"
                                  readonly
                                  @click="errors.clear('FechaNacimiento')"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                                <span
                                  class="red--text"
                                  v-text="errors.get('FechaNacimiento')"
                                ></span>
                              </template>
                              <v-date-picker
                                v-model="FechaNacimiento"
                                @input="menu3 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoCargo"
                              item-text="NombreCargo"
                              item-value="IdCargo"
                              v-model="CargoID"
                              label="Selecione el cargo"
                              :rules="[(v) => !!v || 'cargo es requerido']"
                              id="CargoID"
                              @click="errors.clear('CargoID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('CargoID')"
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
                        @click="saveEmpleado"
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
                  <span class="headline">Empleados</span>
                </v-card-title>
                <v-row justify="center">
                  <v-form ref="form" v-model="valid">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!--=============-->
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoTitulo"
                              item-text="Titulo"
                              item-value="IdTitulo"
                              v-model="TituloID"
                              label="Selecione el titulo"
                              :rules="[(v) => !!v || 'titulo es requerido']"
                              id="TituloID"
                              @click="errors.clear('TituloID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('TituloID')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="NombreEmpleado"
                              label="Nombre"
                              :rules="[
                                letter('letras'),
                                maxlength('Nombre Empleado', 25),
                              ]"
                              id="NombreEmpleado"
                              @keydown="errors.clear('NombreEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('NombreEmpleado')"
                            ></span>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="ApellidoEmpleado"
                              label="Apellido"
                              :rules="[
                                letter('letras'),
                                maxlength('Apellido Empleado', 25),
                              ]"
                              id="ApellidoEmpleado"
                              @keydown="errors.clear('ApellidoEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('ApellidoEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              :items="sexo"
                              label="Genero"
                              v-model="GeneroEmpleado"
                              :rules="[(v) => !!v || 'genero es requerido']"
                              id="GeneroEmpleado"
                              @click="errors.clear('GeneroEmpleado')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('GeneroEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="DireccionEmpleado"
                              label="Direccion"
                              :rules="[maxlength('Direccion Empleado', 100)]"
                              id="DireccionEmpleado"
                              @keydown="errors.clear('DireccionEmpleado')"
                            >
                            </v-text-field>
                            <span
                              class="red--text"
                              v-text="errors.get('DireccionEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="EmailEmpleado"
                              label="Correo"
                              :rules="[email('Email'), maxlength('Email', 30)]"
                              id="EmailProveedor"
                              @keydown="errors.clear('EmailEmpleado')"
                              required
                            >
                            </v-text-field>
                             <span
                              class="red--text"
                              v-text="errors.get('EmailEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="TelefonoEmpleado"
                              label="Telefono"
                              :rules="[
                                number('numeros'),
                                maxlength('Telefono Empleado', 8),
                                minlength('Telefono Empleado', 8),
                              ]"
                              id="TelefonoEmpleado"
                              @keydown="errors.clear('TelefonoEmpleado')"
                            >
                            </v-text-field>
                             <span
                              class="red--text"
                              v-text="errors.get('TelefonoEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="MovilEmpleado"
                              label="Movil"
                              :rules="[
                                number('numeros'),
                                maxlength('Movil Empleado', 8),
                                minlength('Movil Empleado', 8),
                              ]"
                              id="MovilEmpleado"
                              @keydown="errors.clear('MovilEmpleado')"
                            >
                            </v-text-field>
                              <span
                              class="red--text"
                              v-text="errors.get('MovilEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="DUIEmpleado"
                              label="DUI"
                              :rules="[
                                number('numeros'),
                                maxlength('DUI', 9),
                                minlength('DUI', 9),
                              ]"
                              id="DUIEmpleado"
                              @keydown="errors.clear('DUIEmpleado')"
                            >
                            </v-text-field>
                             <span
                              class="red--text"
                              v-text="errors.get('DUIEmpleado')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="Observaciones"
                              label="Observaciones"
                              :rules="[maxlength('Observaciones', 100)]"
                              id="Observaciones"
                              @keydown="errors.clear('Observaciones')"
                            >
                            </v-text-field>
                             <span
                              class="red--text"
                              v-text="errors.get('Observaciones')"
                            ></span>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-menu
                              v-model="menu4"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    computedFechaContratacionFormattedMomentjs
                                  "
                                  label="Fecha Contratacion"
                                  :rules="[required('Fecha Contratacion')]"
                                  prepend-icon="event"
                                  readonly
                                  @click="errors.clear('FechaContratacion')"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                                <span
                                  class="red--text"
                                  v-text="errors.get('FechaContratacion')"
                                ></span>
                              </template>
                              <v-date-picker
                                v-model="FechaContratacion"
                                @input="menu4 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-menu
                              v-model="menu5"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    computedFechaNacimientoFormattedMomentjs
                                  "
                                  label="Fecha Nacimiento"
                                  :rules="[required('Fecha Nacimiento')]"
                                  prepend-icon="event"
                                  readonly
                                  @click="errors.clear('FechaNacimiento')"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                                <span
                                  class="red--text"
                                  v-text="errors.get('FechaNacimiento')"
                                ></span>
                              </template>
                              <v-date-picker
                                v-model="FechaNacimiento"
                                @input="menu5 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              :items="TipoCargo"
                              item-text="NombreCargo"
                              item-value="IdCargo"
                              v-model="CargoID"
                              label="Selecione el cargo"
                              :rules="[(v) => !!v || 'cargo es requerido']"
                              id="CargoID"
                              @click="errors.clear('CargoID')"
                              required
                            ></v-select>
                            <span
                              class="red--text"
                              v-text="errors.get('CargoID')"
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
          <v-btn class="mb-2" color="primary" @click="FormEditar(item)">
            Editar
          </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import moment from "moment";
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
  name: "Empleados", //1-definimos el nombre
  data() {
    return {
      sexo: ["M", "F"],

      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
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
      Empleados: [],
      TipoCargo: [],
      TipoTitulo: [],
      /** ============model============== */
      IdEmpleado: "",
      NombreEmpleado: "",
      ApellidoEmpleado: "",
      DireccionEmpleado: "",
      EmailEmpleado: "",
      TelefonoEmpleado: "",
      MovilEmpleado: "",
      DUIEmpleado: "",
      GeneroEmpleado: "",
      FechaContratacion: "",
      FechaNacimiento: "",
      Observaciones: "",
      CargoID: "",
      NombreCargo: "",
      TituloID: "",
      Titulo: "",

      urlEmpleados: "https://panaderiabg.ga",
      urlCargo: "https://panaderiabg.ga",
      urlTitulo: "https://panaderiabg.ga",

      /** ========================== */
      headers: [
        {
          text: "Nombre",
          value: "NombreEmpleado",
          class: "indigo  white--text",
        },
        {
          text: "Email ",
          value: "EmailEmpleado",
          class: "indigo  white--text",
        },
        {
          text: "Telefono",
          value: "TelefonoEmpleado",
          class: "indigo  white--text",
        },

        {
          text: "DUI",
          value: "DUIEmpleado",
          class: "indigo  white--text",
        },
        {
          text: "Fecha de Contratacion",
          value: "FechaContratacion",
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
  computed: {
    computedFechaNacimientoFormattedMomentjs() {
      return this.FechaNacimiento
        ? moment(this.FechaNacimiento).format("YYYY-MM-DD")
        : "";
    },
    computedFechaContratacionFormattedMomentjs() {
      return this.FechaContratacion
        ? moment(this.FechaContratacion).format("YYYY-MM-DD")
        : "";
    },
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
      this.NombreEmpleado = "";
      this.ApellidoEmpleado = "";
      this.DireccionEmpleado = "";
      this.TelefonoEmpleado = "";
      this.MovilEmpleado = "";
      this.DUIEmpleado = "";
      this.NITProveedor = "";
      this.GeneroEmpleado = "";
      this.FechaContratacion = "";
      this.FechaNacimiento = "";
      this.CargoID = "";
      this.Observaciones = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.clear();
      });
    },

    FormEditar(item) {
      this.IdEmpleado = item.IdEmpleado
      this.TituloID = item.TituloID;
      this.NombreEmpleado = item.NombreEmpleado;
      this.ApellidoEmpleado = item.ApellidoEmpleado;
      this.DireccionEmpleado = item.DireccionEmpleado;
      this.EmailEmpleado = item.EmailEmpleado;
      this.TelefonoEmpleado = item.TelefonoEmpleado;
      this.MovilEmpleado = item.MovilEmpleado;
      this.DUIEmpleado = item.DUIEmpleado;
      this.GeneroEmpleado = item.GeneroEmpleado;
      this.FechaContratacion = item.FechaContratacion;
      this.FechaNacimiento = item.FechaNacimiento;
      this.CargoID = item.CargoID;
      this.Observaciones = item.Observaciones;
      this.dialog2 = true;
    },
    async getEmpleados() {
      const res = await this.$http.get('/Empleados');
      this.Empleados = res.data;
      setTimeout(() => {
        this.Alert = false;
        this.Alert2 = false;
      }, 5000);
    },

    async getTipoTitulo() {
      const res = await this.$http.get('Titulo');
      this.TipoTitulo = res.data;
    },

    async getTipoCargo() {
      const res = await this.$http.get('/Cargo');
      this.TipoCargo = res.data;
    },

    formNuevo: function () {
      this.dialog = true;
    },

    saveEmpleado: async function () {
      const obj = new FormData();
      obj.append("TituloID", this.TituloID);
      obj.append("NombreEmpleado", this.NombreEmpleado);
      obj.append("ApellidoEmpleado", this.ApellidoEmpleado);
      obj.append("DireccionEmpleado", this.DireccionEmpleado);
      obj.append("EmailEmpleado", this.EmailEmpleado);
      obj.append("TelefonoEmpleado", this.TelefonoEmpleado);
      obj.append("MovilEmpleado", this.MovilEmpleado);
      obj.append("DUIEmpleado", this.DUIEmpleado);
      obj.append("GeneroEmpleado", this.GeneroEmpleado);
      obj.append("FechaContratacion", this.FechaContratacion);
      obj.append("FechaNacimiento", this.FechaNacimiento);
      obj.append("CargoID", this.CargoID);
      obj.append("Observaciones", this.Observaciones);
      axios
        .post('/Empleados', obj)
        .then((response) => {
          //console.log(response.data.result)
          this.Empleados.push(response.data.result);
          this.NombreEmpleado = "";
          this.ApellidoEmpleado = "";
          this.DireccionEmpleado = "";
          this.TelefonoEmpleado = "";
          this.MovilEmpleado = "";
          this.DUIEmpleado = "";
          this.NITProveedor = "";
          this.GeneroEmpleado = "";
          this.FechaContratacion = "";
          this.FechaNacimiento = "";
          this.CargoID = "";
          this.Observaciones = "";

          this.Alert = true;
          this.getEmpleados();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },

    saveEditar: async function () {
      const obj = new FormData();
      obj.append("TituloID", this.TituloID);
      obj.append("NombreEmpleado", this.NombreEmpleado);
      obj.append("ApellidoEmpleado", this.ApellidoEmpleado);
      obj.append("DireccionEmpleado", this.DireccionEmpleado);
      obj.append("EmailEmpleado", this.EmailEmpleado);
      obj.append("TelefonoEmpleado", this.TelefonoEmpleado);
      obj.append("MovilEmpleado", this.MovilEmpleado);
      obj.append("DUIEmpleado", this.DUIEmpleado);
      obj.append("GeneroEmpleado", this.GeneroEmpleado);
      obj.append("FechaContratacion", this.FechaContratacion);
      obj.append("FechaNacimiento", this.FechaNacimiento);
      obj.append("CargoID", this.CargoID);
      obj.append("Observaciones", this.Observaciones);
      axios
        .post('/Empleados' + "/" + this.IdEmpleado, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.Empleados.push(response.data.result);
          this.NombreEmpleado = "";
          this.ApellidoEmpleado = "";
          this.DireccionEmpleado = "";
          this.TelefonoEmpleado = "";
          this.MovilEmpleado = "";
          this.DUIEmpleado = "";
          this.NITProveedor = "";
          this.GeneroEmpleado = "";
          this.FechaContratacion = "";
          this.FechaNacimiento = "";
          this.CargoID = "";
          this.Observaciones = "";

          this.Alert2 = true;
          this.getEmpleados();

          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },
  },
  created() {
    this.getEmpleados();
    this.getTipoTitulo();
    this.getTipoCargo();
  },
};
</script>


