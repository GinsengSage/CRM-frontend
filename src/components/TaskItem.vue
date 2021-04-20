<template>
  <router-link :to = "{name: 'Task', params: {id:task.id}}" style="font-family: 'Roboto Medium'" class="w-11/12 py-3 text-gray-500 flex bg-blue-50 rounded mt-3 hover:bg-blue-100 cursor-pointer">
    <div class="w-1/6 flex justify-center">
      <img>
      <p class="py-1">{{task.name}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task.disciplineName}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task.date_start}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task.date_end}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="bg-green-200 rounded-full px-2 py-1">{{task.status}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task.score}}</p>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "TaskItem",
    data(){
      return{

      }
    },
    props:{
      task:Object
    }
  }
</script>

<style scoped>

</style>
