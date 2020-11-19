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
                <v-form ref="form" @submit.prevent="saveUsers(newuser)">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="newuser.name"
                              label="Nombre*"
                              :rules="[
                              required('Nombre Usuario'),
                              minlength('Nombre Usuario', 4)
                            ]"
                              id="name"
                              @keydown="errors.clear('name')"
                          >
                          </v-text-field>
                          <span
                              class="red--text"
                              v-text="errors.get('name')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="newuser.email"
                              label="Correo"
                              :rules="[required('email')]"
                              id="email"
                              @keydown="errors.clear('email')"
                          >
                          </v-text-field>
                          <span
                              class="red--text"
                              v-text="errors.get('email')"
                          ></span>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                              :items="Roles"
                              item-text="NombreRol"
                              item-value="IdRol"
                              v-model="newuser.RolId"
                              label="Selecione el rol"
                              id="RolId"
                              @click="errors.clear('RolId')"
                              :rules="[v => !!v || 'Rol es requerido']"
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
                              v-model="newuser.password"
                              label="Contraseña"
                              :rules="[
                              required('Contraseña'),
                              minlength('Contraseña', 6)
                            ]"
                              id="Password"
                              @keydown="errors.clear('password')"
                          >
                          </v-text-field>
                          <span
                              class="red--text"
                              v-text="errors.get('password')"
                          ></span>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                    >Cancelar
                    </v-btn
                    >
                    <v-btn
                        color="blue darken-1"
                        type="submit"
                    >Guardar
                    </v-btn
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
      Usuarios: [],
      Roles: [],
      newuser: {},
      name: "",
      email: "",
      RolId: "",
      NombreRol: "",
      password: "",
      headers: [
        {
          text: "Nombre ",
          value: "name",
          class: "indigo  white--text"
        },
        {text: "Correo", value: "email", class: "indigo  white--text"},
        {text: "Rol", value: "NombreRol", class: "indigo  white--text"}
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

    getUsers() {
      this.axios
          .get("/Usuarios")
          .then(res => {
            this.Usuarios = res.data;
          })
          .catch(e => {
            console.log(e.response);
          });
    },
    getRol() {
      this.axios.get("/Roles")
          .then(res => {
            this.Roles = res.data;
          })
          .catch(e => {
            console.log(e.response)
          })


    },
    saveUsers(item) {
      this.axios.post('/Usuarios', item)
          .then(res => {
            this.Usuarios.unshift(res.data)
            this.close()
            this.getUsers()
          })
          /*.catch(e=>{
            console.log(e.response)
          })*/

          .catch(error => this.errors.record(error.response.data));
    }

  },
  created() {
    this.getUsers();
    this.getRol();
  }
};
</script>

<style scoped>
</style>