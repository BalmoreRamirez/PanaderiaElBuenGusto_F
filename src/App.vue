<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense nav>
        <!------------>
        <v-list-item :to="{ name: 'Home' }">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item :to="{ name: 'materiaPrima' }">
          <v-list-item-icon>
            <v-icon>shopping_basket</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Materia Prima</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item :to="{ name: 'entradaMatPrima' }">
          <v-list-item-icon>
            <v-icon>library_add</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Entrada Materia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item :to="{ name: 'movimientoMatePrima' }">
          <v-list-item-icon>
            <v-icon>queue_play_next</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Movimientos de materia prima</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item :to="{ name: 'historialMovimientomateriaPrima' }">
          <v-list-item-icon>
            <v-icon>assignment_turned_in</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              >Historial Movimiento Materia Prima</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <!------------>
        <v-list-item :to="{ name: 'usuarios' }">
          <v-list-item-icon>
            <v-icon>group</v-icon>
          </v-list-item-icon>
      
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--Proveedores--->

        <v-list-item :to="{ name: 'proveedores' }">
          <v-list-item-icon>
            <v-icon>group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Proveedores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--inventario--->
        <v-list-item :to="{ name: 'inventario' }">
          <v-list-item-icon>
            <v-icon>assignment</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ inventario }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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

export default {
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
<style scoped>
