<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="Usuarios"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Usuarios y roles.</v-toolbar-title>
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
                  <span class="headline">Usuarios</span>
                </v-card-title>
                <v-form ref="form" v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="NombreUsuario"
                            label="Nombre*"
                            :rules="[required('Nombre Usuario'), minlength('Nombre Usuario', 4)]"
                            id="NombreUsuario"
                            @keydown="errors.clear('NombreUsuario')"
                          >
                          </v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('NombreUsuario')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="EmailUsuario"
                            label="Correo"
                            :rules="[required('Email')]"
                            id="EmailUsuario"
                            @keydown="errors.clear('EmailUsuario')"
                          >
                          </v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('EmailUsuario')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Roles"
                            item-text="NombreRol"
                            item-value="IdRol"
                            v-model="RolId"
                            label="Selecione el rol"
                            id="RolId"
                            @click="errors.clear('RolId')"
                            :rules="[(v) => !!v || 'Rol es requerido']"
                            required
                          >
                          </v-select>
                          <span
                            class="red--text"
                            v-text="errors.get('RolId')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :type="'password'"
                            v-model="Password"
                            label="Contraseña"
                            :rules="[required('Contraseña'),minlength('Contraseña', 6)]"
                            id="Password"
                            @keydown="errors.clear('Password')"
                          >
                          </v-text-field>
                          <span
                            class="red--text"
                            v-text="errors.get('Password')"
                          ></span>
                        </v-col>
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
                      @click="saveUsers"
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
  name: "Usuarios", //1-definimos el nombre

  data() {
    return {
      //retornamos los datos a utilizar

      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },

       minlength(propertyType, minlength) {
        return (v) =>
          (v && v.length >= minlength) ||
          `${propertyType} no puede ser inferior ${minlength} caracteres`;
      },

      valid: false,
      dialog: false,
      Alert: false,
      errors: new Errors(),
      Usuarios: [],
      Roles: [],
      NombreUsuario: "",
      EmailUsuario: "",
      RolId: "",
      NombreRol: "",
      Password: "",

      urlUsers: "http://localhost/PanaderiaBG/public/Usuarios",
      urlRoles: "/PanaderiaBG/public/Roles",
      headers: [
        {
          text: "Nombre ",
          value: "NombreUsuario",
          class: "indigo  white--text",
        },
        { text: "Correo", value: "EmailUsuario", class: "indigo  white--text" },
        { text: "Rol", value: "NombreRol", class: "indigo  white--text" },
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

    getUsers: async function () {
      const res = await this.$http.get(this.urlUsers);
      this.Usuarios = res.data;
      setTimeout(() => {
        this.Alert = false;
      }, 5000);
    },

    getRol: async function () {
      const res = await this.$http.get(this.urlRoles);
      this.Roles = res.data;
    },
    saveUsers: async function () {
      const obj = new FormData();
      obj.append("NombreUsuario", this.NombreUsuario);
      obj.append("EmailUsuario", this.EmailUsuario);
      obj.append("RolId", this.RolId);
      obj.append("Password", this.Password);
      axios
        .post(this.urlUsers, obj)
        .then((response) => {
          //console.log(response.data.result)
          this.Usuarios.push(response.data.result);
          this.Alert = true;
          this.getUsers();
          this.clear();
          this.close();
        })
        .catch((error) => this.errors.record(error.response.data));
    },
  },
  created() {
    this.getUsers();
    this.getRol();
  },
};
</script>

<style scoped>
</style>