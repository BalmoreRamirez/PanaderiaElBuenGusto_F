<template>
  <v-container>
    <v-row
    align="center"
    justify="center">
   <img src="../assets/Home2.jpeg">
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
<style scoped>
.img{

  width: 400px;
  height: 400px
}
</style>

