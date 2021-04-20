<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12">
      <div class="flex w-1/4 items-center">
        <router-link :to="{name: 'Tasks', params: {disciplineId:disciplineId}}" tag="a" class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
          <i class="fas fa-step-backward"></i>
        </router-link>
        <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">{{task.name}}</p>
      </div>
    </div>
    <div class="w-11/12 mt-4 pb-6 bg-white flex flex-col rounded">
      <div class="flex px-8 flex-col items-center">
        <h1 class="text-5xl text-gray-400 mt-8" style="font-family: 'Roboto Medium'">{{task.name}}</h1>
        <p class="mt-8">Text</p>
        <div class="w-full mt-8 justify-between flex">
          <div class="flex">
            <div class="border border-dashed border-gray-500 relative">
              <input type="file" class="cursor-pointer relative block opacity-0 w-full h-full px-4 py-6 z-50">
              <div class="text-center absolute top-6 right-0 left-0 m-auto">
                <p>Drop or select file</p>
              </div>
            </div>
            <div class="bg-blue-200 my-6 px-8 py-2 mx-4 cursor-pointer rounded-full text-blue-600 hover:bg-blue-600 hover:text-white">Send</div>
          </div>
          <input type="button" value="Delete" class="text-lg my-6 py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600">
        </div>
        <div class="w-full mt-2 hidden">
          <p>File name</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Task",
    data(){
      return{
        task: {},
        user: {},
        disciplineId: 0
      }
    },
    props: {
      id: Number
    },
    async mounted() {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      let res = await axios.get(`http://127.0.0.1:8000/api/tasks/getTask/${this.id}`,{headers: headers})
      this.task = res.data.task
      this.user = JSON.parse(localStorage.getItem('user'))
      res = await axios.get(`http://127.0.0.1:8000/api/disciplines/getIdByTaskId/${this.id}`,{headers: headers})
      this.disciplineId = res.data.disciplineId
    }
  }
</script>

<style scoped>

</style>
