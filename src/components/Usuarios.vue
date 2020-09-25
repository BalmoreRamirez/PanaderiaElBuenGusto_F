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
                <v-form v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="NombreUsuario" label="Nombre*">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="EmailUsuario" label="Correo">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Roles"
                            item-text="NombreRol"
                            item-value="IdRol"
                            v-model="RolId"
                            label="Selecione el rol"
                            required
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="Password" label="Contraseña">
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="saveUsers"
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
  
  name: "Usuarios", //1-definimos el nombre
  data() {
    return {
      //retornamos los datos a utilizar
      valid: false,
      dialog: false,
      Usuarios: [],
      Roles: [],
      NombreUsuario: "",
      EmailUsuario: "",
      RolId: "",
      Password: "",
      urlUsers: "http://localhost/PanaderiaBG/public/Usuarios",
      urlRoles: "/PanaderiaBG/public/Roles",
      headers: [
        {
          text: "Nombre ",
          value: "NombreUsuario",
          class: "indigo  white--text"
        },
        { text: "Correo", value: "EmailUsuario", class: "indigo  white--text" },
        { text: "Rol", value: "NombreRol", class: "indigo  white--text" }
      ]};},

  methods: {

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });},

    getUsers: async function() {
      const res = await this.$http.get(this.urlUsers);
      this.Usuarios = res.data;
    },

    getRol: async function() {
      const res = await this.$http.get(this.urlRoles);
      this.Roles = res.data;
    },

    saveUsers: async function() {
      const obj = new FormData();
      obj.append("NombreUsuario", this.NombreUsuario);
      obj.append("EmailUsuario", this.EmailUsuario);
      obj.append("RolId", this.RolId);
      obj.append("Password", this.Password);
      const res = await this.$http.post(this.urlUsers, obj);
      this.Usuarios.push(res.data.result);
      this.NombreUsuario = "";
      this.EmailUsuario = "";
      this.RolId = "";
      this.Password = "";
      this.getUsers();
      this.close();
    }},

  created() {
    this.getUsers();
    this.getRol();
  }};

</script>

<style scoped>
</style>