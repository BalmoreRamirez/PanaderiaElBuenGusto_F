<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="estaActivo"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense nav>
        <!---------->
        <v-list-item v-if="!estaActivo" :to="{ name: 'login' }">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <!---------->
        <v-list-item v-if="estaActivo" @click="cerrarSesion()">
          <v-list-item-icon>
            <v-icon>power_settings_new</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>cerrar session</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item v-if="estaActivo" :to="{ name: 'Home' }">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item v-if="estaActivo" :to="{ name: 'materiaPrima' }">
          <v-list-item-icon>
            <v-icon>shopping_basket</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Materia Prima</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item v-if="estaActivo" :to="{ name: 'entradaMatPrima' }">
          <v-list-item-icon>
            <v-icon>library_add</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Entrada Materia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item v-if="estaActivo" :to="{ name: 'movimientoMatePrima' }">
          <v-list-item-icon>
            <v-icon>queue_play_next</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Salidas Materia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item
          v-if="estaActivo"
          :to="{ name: 'historialMovimientomateriaPrima' }"
        >
          <v-list-item-icon>
            <v-icon>assignment_turned_in</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Historial </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
        <!--Proveedores--->

        <v-list-item v-if="estaActivo" :to="{ name: 'proveedor' }">
          <v-list-item-icon>
            <v-icon>group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Proveedores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        

        <!--inventario--->
        <v-list-item v-if="estaActivo" :to="{ name: 'inventario' }">
          <v-list-item-icon>
            <v-icon>assignment</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ inventario }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--Empleados--->

        <v-list-item v-if="estaActivo" :to="{ name: 'empleados' }">
          <v-list-item-icon>
            <v-icon>group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Empleados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <!------------>
        <v-list-item v-if="estaActivo" :to="{ name: 'usuarios' }">
          <v-list-item-icon>
            <v-icon>account_circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--------------->
        <v-list-item v-if="estaActivo" :to="{ name: 'pedido' }">
          <v-list-item-icon>
            <v-icon>list_alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Pedido</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--------------->
        <v-list-item v-if="estaActivo" :to="{ name: 'sucursal' }">
          <v-list-item-icon>
            <v-icon>room</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>sucursales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <!---end-->
      </v-list>
    </v-navigation-drawer>

    /***===barra de navegacion=== */
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Panaderia El Buen Gusto</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    /***===fin de la barrra de navegacion=== */ /**==aqui se cargan los
    componentes=== */
    <v-main>
      <v-container class="fill-height" fluid>
        <v-slide-y-transition>
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "@/components/Home/Footer";
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["cerrarSesion", "leerToken"])
  },
  computed: {
    ...mapGetters(["estaActivo"])
  },
  created() {
    this.leerToken();
  },
  name: "Inicio",
  components: { Footer },
  props: {
    source: String
  },

  data() {
    return {
      inventario: "Inventario",
      dialog: false,
      drawer: null
    };
  }
};
</script>
