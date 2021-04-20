<template>
  <div class="w-full h-full flex flex-col items-center">
      <div class="w-11/12 my-8 flex items-center flex-wrap">
        <Subject v-for="d in studentDisciplines" :key="d.id" class="my-2"></Subject>
        <Subject class="my-2"></Subject>
        <Subject class="my-2"></Subject>
        <Subject class="my-2"></Subject>
        <Subject class="my-2"></Subject>
      </div>
  </div>
</template>

<script>
  import Subject from "@/components/DisciplineItem";
  export default {
    name: "UserDisciplines",
    components: {
      Subject
    },
    data(){
      return{
        studentDisciplines: [
          {

          },
          {

          }
        ]
      }
    }
  }
  </script>

<style scoped>

</style>
