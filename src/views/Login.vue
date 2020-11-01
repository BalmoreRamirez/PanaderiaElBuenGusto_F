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
                          label="Usuario"
                          name="login"
                          prepend-icon="mdi-account"
                          type="text"
                      ></v-text-field>

                      <v-text-field
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
                    <v-btn color="primary" :to="{name:'inicio'}">{{nameForm.enviar}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
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
      }

    }
  },
}
</script>
<style scoped>
</style>