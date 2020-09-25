<template>
  <v-container>
    <v-row>
       <v-img class="col-3"
      :src="image"

    ></v-img>
    </v-row>
  </v-container>
</template>

<script>
import  image from "../assets/Home.png"
  export default {
    name: 'HelloWorld',

    data () {
      return{
        image:image
      }
      
    },
  }
</script>
<style>
img{
  width: 50%;
  height: 50%;
}
</style>

