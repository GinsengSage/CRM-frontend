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
    <div class="w-11/12 mt-4 h-full pb-6 bg-white flex flex-col rounded">
      <div class="flex h-full px-8 flex-col items-center">
        <h1 class="text-5xl text-gray-400 mt-8" style="font-family: 'Roboto Medium'">{{lecture.name}}</h1>
        <div style="height: 380px" class="mt-8 overflow-y-scroll">
          {{lecture.text}}
        </div>
        <div class="w-full mt-4 items-center justify-between flex">
          <input type="button" value="Delete" @click="remove"
                 class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                 :class="[ user.status === 'Teacher' ? 'block' : 'hidden' ]">
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    },
    props: {
      id: Number
    },
    methods: {
      async remove(){
        if(confirm('Are you sure?')){
          let res = await axios.delete( `http://127.0.0.1:8000/api/lectures/removeLecture/${this.lecture.id}`, {headers: this.headers})
          if(res){
            window.location.replace(`/layout/lectures/${this.disciplineId}`)
          }
        }else{
          return
        }
      }
    },
    async mounted() {
      let res = await axios.get(`http://127.0.0.1:8000/api/lectures/getLecture/${this.id}`,{headers: this.headers})
      this.lecture = res.data.lecture
      this.user = JSON.parse(localStorage.getItem('user'))
      res = await axios.get(`http://127.0.0.1:8000/api/disciplines/getIdByLectureId/${this.id}`,{headers: this.headers})
      this.disciplineId = res.data.disciplineId
    }
  }
</script>

<style scoped>

</style>
