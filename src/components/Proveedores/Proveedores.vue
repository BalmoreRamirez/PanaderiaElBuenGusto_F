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
                            v-model="CodigoProveedor "
                            label="Codigo">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NombreProveedor "
                            label="Nombre"
                          >
                          </v-text-field>
                  
                        </v-col>
                    <!--=============-->
                        <v-col cols="12" sm="6">
                          <v-select
                            v-model="TipoProveedorID "
                            label="Selecione el rol"
                            required
                          >
                          </v-select>    
                        </v-col>
                
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="TelefonoProveedor"
                            label="Telefono"
                          >
                          </v-text-field>
                        </v-col>
                          <!--=============-->
                          <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="MovilProveedor"
                            label="Movil"
                          >
                          </v-text-field>
                        </v-col>
                
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="EmailProveedor"
                            label="Correo"
                          >
                          </v-text-field>
                        </v-col>
                          <!--=============-->
                           <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="FaxProveedor"
                            label="Movil"
                          >
                          </v-text-field>
                        </v-col>
                
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NITPRoveedor"
                            label="NIT"
                          >
                          </v-text-field>
                        </v-col>
                          <!--=============-->
                             <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NIDFiscal"
                            label="NID"
                          >
                          </v-text-field>
                        </v-col>
                
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="TituloProveedor"
                            label="Titulo"
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
                      >Cancelar</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text           
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
  name: "Usuarios", //1-definimos el nombre

  data() {
    return {
      //retornamos los datos a utilizar

      required(propertyType) {
        return v =>
          (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },

      minlength(propertyType, minlength) {
        return v =>
          (v && v.length >= minlength) ||
          `${propertyType} no puede ser inferior ${minlength} caracteres`;
      },

      valid: false,
      dialog: false,
      Alert: false,
      errors: new Errors(),
/** ============array============== */
      Proveedores: [],
      TipoProveedorID: [],
/** ============model============== */
      CodigoProveedor: "",
      NombreProveedor: "",
      TelefonoProveedor: "",
      MovilProveedor: "",
      EmailProveedor: "",
      FaxProveedor: "",
      password: "",
      NITPRoveedor: "",
      NIDFiscal: "",
      TituloProveedor: "",
/** ========================== */
      headers: [
        {
          text: "Nombre ",
          value: "name",
          class: "indigo  white--text"
        },
        { text: "Tipo", value: "email", class: "indigo  white--text" },
        { text: "Telefono", value: "NombreRol", class: "indigo  white--text" },
        { text: "Correo", value: "email", class: "indigo  white--text" },
        { text: "Titulo", value: "NombreRol", class: "indigo  white--text" }
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
    }
  }
};
</script>

<style scoped>
</style>
