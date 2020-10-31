<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container
              class="fill-height"
              fluid
          >
            <v-row
                align="center"
                justify="center"
            >
              <v-col
                  cols="12"
                  sm="8"
                  md="4"
              >
                <v-card class="elevation-12">
                  <v-toolbar
                      color="primary"
                      dark
                      flat
                      class="align-center"
                  >
                    <v-toolbar-title >{{nameForm.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            :href="source"
                            icon
                            large
                            target="_blank"
                            v-on="on"
                        >
                          <v-icon>mdi-code-tags</v-icon>
                        </v-btn>
                      </template>
                      <span>Source</span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          v-model="usuario"
                          label="Usuario"
                          name="login"
                          prepend-icon="mdi-account"
                          type="text"
                      ></v-text-field>

                      <v-text-field
                          v-model="password"
                          id="password"
                          label="Contraseña"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="login" color="primary" :to="{name:'inicio'} ">{{nameForm.enviar}}</v-btn>
                  </v-card-actions>
                </v-card>
                  <div>
            <v-alert :value="Alert" type="warning" border="top" dense>
              Usuario o Contraseña invalido
            </v-alert>
          </div>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
  
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
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      nameForm:{
        title:"Iniciar session",
        enviar:"Enviar"
      },

      usuario: "",
      password: "",
      Alert:false,
        errors: new Errors(),
      url: "http://localhost/PanaderiaBG/public/login",
    }
  },
  methods: {
    login: async function(){
      
      const obj = new FormData();
      obj.append("name", this.usuario);
      obj.append("password", this.password);
      axios
        .post(this.url , obj)
        .then(() => {

           
            this.$router.push('/Home')
            console.log("Usuario correcto")
             
        })
      
      
        .catch(() => 
        this.Alert = true
        );
        
      
        
        
        
        
      setTimeout(() => {
        this.Alert = false;
      }, 5000);

    }


  }

}
</script>

<style scoped>

</style>