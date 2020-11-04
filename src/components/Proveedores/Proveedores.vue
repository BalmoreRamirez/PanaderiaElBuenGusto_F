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
                              required('CodigoProveedor'),
                              maxlength('CodigoProveedor', 15)
                            ]"
                            id="CodigoProveedor"
                            @keydown="errors.clear('CodigoProveedor')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NombreProveedor"
                            label="Nombre"
                            :rules="[
                              required('NombreProveedor'),
                              letter('letras'),
                              maxlength('NombreProveedor', 50)
                            ]"
                            id="NombreProveedor"
                            @keydown="errors.clear('NombreProveedor')"
                          >
                          </v-text-field>
                        </v-col>
                        <!--=============-->
                        <v-col cols="12" sm="6">
                          <v-select
                            v-model="TipoProveedorID"
                            item-text="NombreTipo"
                            item-value="IdTipo"
                            label="Selecione tipo de proveedor"
                            id="IdTipo"
                            @click="errors.clear('IdTipo')"
                            :rules="[v => !!v || 'Tipo proveedor es requerido']"
                            required
                          >
                          </v-select>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="TelefonoProveedor"
                            label="Telefono"
                            :rules="[maxlength('TelefonoProveedor', 8)]"
                            id="TelefonoProveedor"
                            @keydown="errors.clear('TelefonoProveedor')"
                          >
                          </v-text-field>
                        </v-col>
                        <!--=============-->
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="MovilProveedor"
                            label="Movil"
                            :rules="[maxlength('MovilProveedor', 8)]"
                            id="MovilProveedor"
                            @keydown="errors.clear('MovilProveedor')"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="EmailProveedor"
                            label="Correo"
                            :rules="[maxlength('EmailProveedor', 25)]"
                            id="EmailProveedor"
                            @keydown="errors.clear('EmailProveedor')"
                          >
                          </v-text-field>
                        </v-col>
                        <!--=============-->
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="FaxProveedor"
                            label="Movil"
                            :rules="[maxlength('FaxProveedor', 9)]"
                            id="Observacion"
                            @keydown="errors.clear('FaxProveedor')"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NITPRoveedor"
                            label="NIT"
                            :rules="[maxlength('NITPRoveedor', 20)]"
                            id="NITPRoveedor"
                            @keydown="errors.clear('NITPRoveedor')"
                          >
                          </v-text-field>
                        </v-col>
                        <!--=============-->
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NIDFiscal"
                            label="NID"
                            :rules="[maxlength('NIDFiscal', 25)]"
                            id="NIDFiscal"
                            @keydown="errors.clear('NIDFiscal')"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="TituloProveedor"
                            label="Titulo"
                            :rules="[maxlength('TituloProveedor', 50)]"
                            id="TituloProveedor"
                            @keydown="errors.clear('TituloProveedor')"
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
                      >Salir</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveProveedores"
                      :disabled="!valid"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
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
  name: "Proveedores", //1-definimos el nombre
  data() {
    return {
      //retornamos los datos a utilizar
      required(propertyType) {
        return v =>
          (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },
      maxlength(propertyType, minlength) {
        return v =>
          (v && v.length >= minlength) ||
          `${propertyType} no puede ser inferior ${minlength} caracteres`;
      },
      letter(propertyType) {
        return v =>
          /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]+$/.test(v) ||
          `Solo acepta ${propertyType}`;
      },
      valid: false,
      dialog: false,
      Alert: false,
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
      NombreTipo: "",
      urlGuardarProv: "http://localhost/PanaderiaBG/public/Proveedores",
      urlListaProveedores:
        "http://localhost/PanaderiaBG/public/ListaProveedores",
      /** ========================== */
      headers: [
        {
          text: "Nombre ",
          value: "NombreProveedor",
          class: "indigo  white--text"
        },
        { text: "Tipo", value: "NombreTipo", class: "indigo  white--text" },

        {
          text: "Telefono",
          value: "TelefonoProveedor",
          class: "indigo  white--text"
        },
        {
          text: "Correo",
          value: "EmailProveedor",
          class: "indigo  white--text"
        },
        {
          text: "Titulo",
          value: "TituloProveedor",
          class: "indigo  white--text"
        }
      ]
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
    async getProveedores() {
      try{
        const data = await fetch('http://localhost/PanaderiaBG/public/ListaProveedores')
        const info = await data.json()
        this.Proveedores= info
      }catch(error){
        console.log(error)
      }
    },
    saveProveedores: async function() {
      const obj = new FormData();
      obj.append("CodigoProveedor", this.CodigoProveedor);
      obj.append("NombreProveedor", this.NombreProveedor);
      obj.append("TipoProveedorID", this.TipoProveedorID);
      obj.append("TelefonoProveedor", this.TelefonoProveedor);
      obj.append("MovilProveedor", this.MovilProveedor);
      obj.append("EmailProveedor", this.EmailProveedor);
      obj.append("FaxProveedor", this.FaxProveedor);
      obj.append("NITProveedor", this.NITProveedor);
      obj.append("NIDFiscal", this.NIDFiscal);
      obj.append("TituloProveedor", this.TituloProveedor);
      axios
        .post(this.urlGuardarProv, obj)
        .then(response => {
          //console.log(response.data.result)
          this.EntradaMatPrima.push(response.data.result);
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
        .catch(error => this.errors.record(error.response.data));
    }
  },
    created() {
    this.getProveedores()
  },
}
</script>

<style scoped>
</style>
