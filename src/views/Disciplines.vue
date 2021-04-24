<template>
  <div class="w-full h-full flex flex-col items-center">
      <div class="w-11/12 my-8 flex items-center flex-wrap">
        <Subject v-for="discipline in disciplines" :key="discipline.id" v-bind:name="discipline.name" v-bind:disciplineId="discipline.id" v-bind:text="discipline.text" class="my-2"></Subject>
      </div>
  </div>
</template>

<script>
  import Subject from "@/components/DisciplineItem";
  import axios from "axios";
  export default {
    name: "UserDisciplines",
    components: {
      Subject
    },
    data(){
      return{
        disciplines: []
      }
    },
    async mounted() {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      let res = await axios.get(`http://127.0.0.1:8000/api/users/getDisciplines`,{headers: headers})
      this.disciplines = res.data.userDisciplines
    }
  }
  </script>
