<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="filmes"
      class="elevation-1"
    >
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Não foi possível apresentar uma lista dos filmes...
        </v-alert>
      </template>

      <template v-slot:items="props">
        <tr @click="rowClicked(props.item)">
          <td class="subheading">{{ props.item.f.split('#')[1] }} </td>
          <td class="subheading">{{ props.item.ftit }} </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import axios from 'axios'
  const lhost = "http://cinema.di.uminho.pt"
  
  export default {
    props: ["idAtor"],
    data: () => ({ 
      headers: [
        {text: 'Identificador', align: "left", sortable: true, value: "f", class:'title'},
        {text: 'Título', align: "left", sortable: true, value: "ftit", class:'title'}   
      ],
      filmes: []
    }),
    mounted: async function (){
      try{
        var response = await axios.get(lhost + '/atores/' + this.idAtor + '/filmes')
        this.filmes = response.data
      }
      catch(e){
        return(e)
      }
    },
    methods: {
      rowClicked: function (item){
        this.$router.push('/filmes/' + item.f.split('#')[1])
      }
    }
  }
</script>

<style>

</style>
