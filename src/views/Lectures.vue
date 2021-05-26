<template>
  <div class="w-full h-full flex">
    <div class="w-5/6 h-full flex flex-col items-center">
      <div class="w-11/12 flex items-center flex-wrap">
        <div class="flex w-1/4 items-center">
          <router-link tag="a" to="/layout/user-home" class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
            <i class="fas fa-step-backward"></i>
          </router-link>
          <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">{{discipline}} Lectures</p>
        </div>
      </div>
      <div class="w-11/12 mt-4 flex flex-col bg-white pb-4 rounded items-center">
        <div class="w-full flex justify-center my-4">
          <div class="w-11/12 flex justify-between">
            <div class="flex w-1/2 items-center">
              <p class="mr-4 text-xl text-gray-400" style="font-family: 'Roboto Medium'">Lectures</p>
              <div class="flex items-center bg-gray-100 rounded w-1/3 py-1 px-1 justify-center">
                <i class="fas fa-search mx-2"></i>
                <input class="bg-transparent w-full" v-model="searchStr" type="text" placeholder="Quick search">
              </div>
            </div>
            <div>
              <input type="button" @click="showModal" value="Add"
                     class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                     :class="[ user.status === 'Teacher' ? 'block' : 'hidden' ]">
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <LectureListHeader></LectureListHeader>
        </div>
        <div class="w-full flex flex-col items-center">
          <LectureItem v-for="lecture in currentLectures" :key="lecture.id" v-bind:name="lecture.name" v-bind:id="lecture.id" v-bind:date="lecture.date"></LectureItem>
        </div>
      </div>
    </div>
    <div class="w-1/6 pr-8 mt-12 h-full flex flex-col items-center justify-center">
      <div class="w-full bg-white h-1/5 py-6 flex flex-col items-center justify-center">
        <p class="text-gray-400">Lectures count</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{lectures.length}}</p>
      </div>
    </div>
    <AddLecture v-bind:discipline-id="disciplineId" v-show="isModalVisible" @close="closeModal"></AddLecture>
  </div>
</template>

<script>
  import LectureListHeader from "@/components/LectureListHeader";
  import LectureItem from "@/components/LectureItem";
  import axios from "axios";
  import AddLecture from "@/components/AddLecture";
  export default {
    name: "Lectures",
    components: {
      AddLecture,
      LectureItem,
      LectureListHeader
    },
    data(){
      return{
        discipline: '',
        lectures: [],
        currentLectures: [],
        user: {},
        isModalVisible: false,
        searchStr: '',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    },
    props:{
      disciplineId: Number,
    },
    methods: {
      async getLectures(){
        let res = await axios.get(`http://127.0.0.1:8000/api/users/getLectures/${this.disciplineId}`,{headers: this.headers})
        this.lectures = res.data.userLectures.reverse()
        this.currentLectures = [...this.lectures]
      },
      showModal() {
        this.isModalVisible = true
      },
      async closeModal() {
        this.isModalVisible = false
        await this.getLectures()
      }
    },
    watch: {
      async searchStr(value){
        if(value){
          this.currentLectures = [...this.lectures.filter(lecture => lecture.name.startsWith(value))]
        }else{
          this.currentLectures = [...this.lectures]
        }
      }
    },
    async mounted() {
      await this.getLectures()
      this.user = JSON.parse(localStorage.getItem('user'))
      let res = await axios.get(`http://127.0.0.1:8000/api/disciplines/getName/${this.disciplineId}`,{headers: this.headers})
      this.discipline = res.data.name
    }
  }
</script>

<style scoped>

</style>
