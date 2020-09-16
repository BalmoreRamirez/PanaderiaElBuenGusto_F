<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list>
        <v-list-item :to="{name:'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group
            prepend-icon="account_circle"
            value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Materia prima</v-list-item-title>
          </template>
          <v-list-group
              no-action
              sub-group
              value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Producto</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                link
                :to="{name:'configProduct'}"
            >
              <v-list-item-title>Configuracion Producto</v-list-item-title>
            </v-list-item>
            <v-list-item
                link
                :to="{name:'materiaPrima'}"
            >
              <v-list-item-title>Materia Prima</v-list-item-title>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">TEST UFG</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-slide-y-transition>
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "@/components/Home/Footer";
//import HeaderNav from "@/components/Home/HeaderNav";

export default {
  name: "panaderia",
  components: {Footer},
  props: {
    source: String
  },
  data() {
    return {
      dialog: false,
      drawer: null,
      admins: [
        ['Configurar Producto', 'people_outline'],
        ['Materia prima', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],

    };

  }
};
</script>
