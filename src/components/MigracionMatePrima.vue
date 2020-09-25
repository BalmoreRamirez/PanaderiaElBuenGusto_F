<template>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="Pedido"
         :search="search"
        class="elevation-10"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Movimiento de la materia prima</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
             <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
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
                  <span class="headline">Movimiento de Materia Prima</span>
                </v-card-title>

            <v-form v-model="valid">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="CantidadPedido"
                            label="Cantidad de pedido*"
                            :rules="[required('cantidad de pedido'), number('numeros')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="DescripcionPedido"
                            label="Descripcion Pedido*"
                            counter="30"
                            :rules="[
                              required('descripcion de pedido'),
                              maxlength('Descripcion de pedido', 30)
                            ]"
                          >
                          </v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="MateriaPrima"
                            item-text="NombreMP"
                            item-value="IdRegistroMP"
                            v-model="RegistroMPID"
                            label="Selecione la materia prima"
                            :rules="[v => !!v || 'Materia prima es requerido']"
                            required
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="Bodegas"
                            item-text="NombreBodega"
                            item-value="IdBodega"
                            v-model="BodegaID"
                            label="Selecione Bodega"
                            :rules="[v => !!v || 'Bodega es requerido']"
                            required
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Salir</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="savePedido"
                      :disabled="!valid"
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
  name: "TablePedidos",
  data() {
    return {
      valid: false,
      required(propertyType) {
        return v =>
          (v && v.length > 0) || `Tienes que ingresar ${propertyType}`;
      },
      letter(propertyType) {
        return v =>
          /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]+$/.test(v) ||
          `Solo acepta ${propertyType}`;
      },
      number(propertyType) {
        return v => /^\d+$/.test(v) || `Solo acepta ${propertyType}`;
      },
      maxlength(propertyType, maxlength) {
        return v =>
          (v && v.length <= maxlength) ||
          `${propertyType} no puede superar los ${maxlength} caracteres`;
      },

      Pedido: [],
      Bodegas: [],
      MateriaPrima: [],

     
      
      CantidadPedido: "",
      DescripcionPedido: "",     
      NombreMP: "",
      RegistroMPID: "",
      NombreBodega: "",
      BodegaID: "",
      url3: "/PanaderiaBG/public/ShowMateriaPrima",
      url2: "/PanaderiaBG/public/Bodegas",
      url: "http://localhost/PanaderiaBG/public/Pedido",
      search: "",
      dialog: false,
      headers: [
        
            
        { text: "Cantidad Pedido", 
        value: "CantidadPedido", 
        class: "indigo white--text" 
        },

        {
          text: "Descripcion Pedido",
          value: "DescripcionPedido",
          class: "indigo white--text"
        },

        { 
          text: "Materia Prima", 
        value: "NombreMP", 
        class: "indigo  white--text" 
        },
       
        {
          text: "Bodega",
          value: "NombreBodega",
          class: "indigo white--text"
        }
      ]
    };
  },
  methods: {
    getMateriaPrima: async function() {
      const res = await this.$http.get(this.url3);
      this.MateriaPrima = res.data;
    },
    getBodegas: async function() {
      const res = await this.$http.get(this.url2);
      this.Bodegas = res.data;
    },
    getPedido: async function() {
      const res = await this.$http.get(this.url);
      this.Pedido = res.data;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    savePedido: async function() {
      const obj = new FormData();
      obj.append("CantidadPedido", this.CantidadPedido);
      obj.append("DescripcionPedido", this.DescripcionPedido);
      obj.append("RegistroMPID", this.RegistroMPID);
      obj.append("BodegaID", this.BodegaID);
      const res = await this.$http.post(this.url, obj);
      this.Pedido.push(res.data.result);
      this.CantidadPedido = "";
      this.DescripcionPedido = "";
      this.RegistroMPID = "";
      this.BodegaID = "";
      this.getPedido();
      this.close();
    }
  },
  created() {
    this.getPedido();
    this.getMateriaPrima();
    this.getBodegas();
  }
};
</script>

