<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12">
      <div class="flex w-1/4 items-center">
        <router-link :to="{name: 'Lectures', params: {disciplineId:disciplineId}}" tag="a" class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
          <i class="fas fa-step-backward"></i>
        </router-link>
        <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">{{lecture.name}}</p>
      </div>
    </div>
    <div class="w-11/12 mt-4 pb-6 bg-white flex flex-col rounded">
      <div class="flex px-8 flex-col items-center">
        <h1 class="text-5xl text-gray-400 mt-8" style="font-family: 'Roboto Medium'">{{lecture.name}}</h1>
        <p class="mt-8">{{lecture.text}}</p>
        <div class="w-full mt-4 items-center justify-between flex">
          <input type="button" value="Delete"
                 class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                 :class="[ user.status === 'Teacher' ? 'block' : 'hidden' ]" placeholder="Password">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Lecture",
    data(){
      return{
        lecture: {},
        user: {},
        disciplineId: 0,
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
      let res = await axios.get(`http://127.0.0.1:8000/api/lectures/getLecture/${this.id}`,{headers: headers})
      this.lecture = res.data.lecture
      this.user = JSON.parse(localStorage.getItem('user'))
      res = await axios.get(`http://127.0.0.1:8000/api/disciplines/getIdByLectureId/${this.id}`,{headers: headers})
      this.disciplineId = res.data.disciplineId
    }
  }
</script>

<style scoped>

</style>
