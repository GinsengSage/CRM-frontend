<template>
  <div class="w-full h-full flex">
    <div class="w-5/6 h-full flex flex-col items-center">
      <div class="w-11/12 flex items-center flex-wrap">
        <div class="flex w-1/4 items-center">
          <div class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
            <i class="fas fa-step-backward"></i>
          </div>
          <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">{{subject}} Lectures</p>
        </div>
      </div>
      <div class="w-11/12 mt-4 flex flex-col bg-white pb-4 rounded items-center">
        <div class="w-full flex justify-center my-4">
          <div class="w-11/12 flex justify-between">
            <div class="flex w-1/2 items-center">
              <p class="mr-4 text-xl text-gray-400" style="font-family: 'Roboto Medium'">Lectures</p>
              <div class="flex items-center bg-gray-100 rounded w-1/3 py-1 px-1 justify-center">
                <i class="fas fa-search mx-2"></i>
                <input class="bg-transparent w-full" type="text" placeholder="Quick search">
              </div>
              <select @change="sortStudents" v-model="sortBy" class="ml-2">
                <option value="name">Sort by name</option>
                <option value="course">Sort by course</option>
                <option value="group">Sort by group</option>
                <option value="averageScore">Sort by AS</option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <StudentListHeader></StudentListHeader>
        </div>
        <div class="w-full flex flex-col items-center">
          <Student v-for="student in students" :key="student.name" v-bind:student="student"></Student>
        </div>
      </div>
    </div>
    <div class="w-1/6 pr-8 mt-12 h-full flex flex-col items-center justify-center">
      <div class="w-full bg-white h-1/5 py-6 flex flex-col items-center justify-center">
        <p class="text-gray-400">Students count</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{students.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentListHeader from "@/components/StudentListHeader";
  import Student from "@/components/Student";
  import axios from "axios";

  export default {
    name: "Students",
    components: {
      Student,
      StudentListHeader
    },
    data(){
      return{
        students: [],
        currentStudents: [],
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        searchStr: '',
        sortBy: 'name',
      }
    },
    watch: {
      searchStr(value){
        if(value){
          this.currentStudents = [...this.students.filter(student => student.name.startsWith(value))]
        }else{
          this.currentStudents = [...this.students]
        }
      }
    },
    methods: {
      sortStudents(){
        switch (this.sortBy){
          case 'name':
            this.currentStudents = this.students.sort((s1,s2) => s1.name > s2.name ? 1 : -1)
            break
          case 'course':
            this.currentStudents = this.students.sort((s1,s2) => s1.course > s2.course ? 1 : -1)
            break
          case 'group':
            this.currentStudents = this.students.sort((s1,s2) => s1.group > s2.group ? 1 : -1)
            break
          case 'averageScore':
            this.currentStudents = this.students.sort((s1,s2) => s1.average_score > s2.average_score ? 1 : -1)
            break
        }
      }
    },
    async mounted() {
      let res = await axios.get(`http://127.0.0.1:8000/api/users/getStudentsByTeacher`, {headers: this.headers})
      this.students = res.data.students
      this.currentStudents = [...this.students]
      this.sortStudents()
    }
  }
</script>

<style scoped>

</style>
