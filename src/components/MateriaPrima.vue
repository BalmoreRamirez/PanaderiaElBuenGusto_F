<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Materia Prima</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
        <!--    <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="busqueda"
              single-line
              hide-details
            ></v-text-field>-->
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">Ingresar registro</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Materia prima</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" >
                        <v-text-field label="Nombre*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" >
                        <v-text-field
                          label="Clase*"
                        ></v-text-field>
                      </v-col>
          
                      <v-col cols="12" sm="6">
                        <v-text-field label="Observacion*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select :items="['Proveedor1', 'Proveedor2', 'Proveedor3', 'Proveedor4']" label="Proveedor*" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select :items="['lb', 'g', 'kg', 'oz']" label="Unidad Medida*" required></v-select>
                      </v-col>
                        <v-col cols="12" sm="6">
                        <v-text-field label="Decripcion" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>* campo requerido</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Salir</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Recargar</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TableMaPrima",

  data() {
    return {
      dialog: false,
      search: "",

      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Clase", value: "fat" },
        { text: "Observacion", value: "carbs" },
        { text: "Proveedor", value: "protein" },
        { text: "U Medida", value: "carbs" },
        { text: "Descripcion", value: "protein" }
      ],
/*
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ],
      
Clase*
Observacion*
Proveedor*
Unidad Medida*
Decripcion
*/
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem);
    } else {
      this.desserts.push(this.editedItem);
    }
    this.close();
  }
};
</script>
