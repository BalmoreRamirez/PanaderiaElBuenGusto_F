<template>
  <v-layout>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Usuarios y roles.</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn  class="mx-2" fab dark color="indigo"  v-bind="attrs" v-on="on">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                            label="Nombre*">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                            label="Correo">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                            label="Rol">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                            label="Contraseña">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "MigracionMatePrima",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nombre (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Correo', value: 'fat' },
      { text: 'Rol', value: 'carbs' },
      { text: 'Contraseña', value: 'protein' },
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          name: 'Jose',
          calories: 'jose@gmail.com',
          fat: 'administrador',
          carbs: '*******',
          protein: 4.0,
        },
        {
          name: 'Maria',
          calories: 'maria@gmail.com',
          fat: 'administrador',
          carbs: '*******',
          protein: 4.0,
        },



      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('¿Estás seguro de que quieres eliminar este Items') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>