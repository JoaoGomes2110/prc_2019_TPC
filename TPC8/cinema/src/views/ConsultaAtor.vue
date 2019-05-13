<template>
  <v-container>
      <Ator :idAtor="$route.params.idAtor"/>
      <Filmes :idAtor="$route.params.idAtor"/>
      <v-layout>
          <v-btn @click="goBack" color="info"> Voltar à página anterior</v-btn>
      </v-layout>
  </v-container>
</template>

<script>
  import Ator from '@/components/Ator'
  import Filmes from '@/components/LFilmes'
  
  export default {
    components: {
        Ator, Filmes
    },
    methods: {
        goBack: function(){
            this.$router.go(-1)
        }
    }
  }
</script>

<style>

</style>
