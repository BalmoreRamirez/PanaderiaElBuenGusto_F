<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Ingrese sus credenciales</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large target="_blank" v-on="on">
                        <v-icon>mdi-code-tags</v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="login" v-model="valid">
                    <v-text-field
                      v-model="usuario.name"
                      label="Usuario"
                      :rules="[required('Nombre Usuario')]"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      v-model="usuario.password"
                      label="Contraseña"
                      :rules="[required('Contraseña')]"
                      prepend-icon="mdi-lock"
                      :append-icon="btn ? 'visibility' : 'visibility_off'"
                      @click:append="() => (btn = !btn)"
                      :type="btn ? 'password' : 'text'"
                    ></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" type="submit" :disabled="!valid"
                        >Iniciar</v-btn
                      >
                    </v-card-actions>
                  </v-form>

                  <div v-if="mensaje != ''">
                    <p justify="center" align="center" class="red--text">
                      {{ mensaje }}
                    </p>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },
      valid: false,
      btn: String,
      usuario: {
        name: "",
        password: "",
      },
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    login() {
      this.axios
        .post("/login", this.usuario)
        .then((res) => {
          const token = res.data.user.access_token;
          this.guardarUsuario(token);
        })
        .catch((e) => {
          console.log(e.response);
          this.mensaje = e.response.data.message;
        });
    },
  },
};
</script>
