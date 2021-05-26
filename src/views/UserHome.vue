<template>
  <div class="w-full h-full flex pr-8">
    <div class="w-5/6 h-full flex flex-col">
      <div class="flex h-1/2 flex-col w-full items-center">
        <div class="w-11/12 flex justify-between">
          <h2 style="font-family: 'Roboto Black'" class="text-xl">Lectures</h2>
        </div>
        <div class="w-11/12 my-8 flex items-center">
          <Subject v-for="discipline in disciplines" :key="discipline.id" v-bind:name="discipline.name" v-bind:disciplineId="discipline.id" v-bind:text="discipline.text"></Subject>
          <div class="w-1/4 h-56 mx-2 pt-2 bg-white rounded flex justify-center items-center">
            <div class="w-11/12 flex flex-col items-center h-11/12">
              <p><b>{{ user.status === 'Student' ? 'Your tasks' : 'Students by AS' }}</b></p>
              <canvas ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-1/2 flex flex-col items-center">
        <div class="w-11/12 flex justify-between">
          <h2 style="font-family: 'Roboto Black'" class="text-xl">Tasks</h2>
        </div>
        <div class="w-11/12 flex-col mt-3 pb-3 flex bg-white rounded">
          <div class="w-full flex justify-center">
            <TaskListHeader class="mt-4"></TaskListHeader>
          </div>
          <div class="w-full flex flex-col items-center justify-center">
            <TaskItem v-for="task in currentTasks" :key="task.id" v-bind:task="task"></TaskItem>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/6 flex bg-white flex-col items-center rounded">
      <div class="w-11/12 mt-4 bg-blue-50 flex flex-col rounded">
        <div class="flex w-full my-4 justify-between px-4">
          <p class="xl" style="font-family: 'Roboto Medium'">Notifications</p>
          <router-link class="text-blue-500 text-blue-700" style="font-family: Roboto" to="/layout/notifications">See all</router-link>
        </div>
        <div class="flex w-full flex-col items-center pb-4">
          <SmallNotification v-for="n in notifications" v-bind:note="n" :key="n.name">{{n.name}}</SmallNotification>
        </div>
      </div>
      <div class="w-11/12 mt-4 px-4 bg-blue-50 flex flex-col items-center pb-8 rounded">
        <p class="text-gray-400">{{user.status === 'Student' ? 'Average score' : 'Count of students'}}</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">
          {{user.status === 'Student' ? user.average_score : students.length}}
        </p>
      </div>
      <div class="w-11/12 mt-4 px-4 bg-blue-50 flex flex-col items-center pb-8 rounded">
        <p class="text-gray-400">Count of disciplines</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{disciplines.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskListHeader from "@/components/TaskListHeader";
  import TaskItem from "@/components/TaskItem";
  import Subject from "@/components/DisciplineItem";
  import SmallNotification from "@/components/SmallNotification";
  import {Bar} from 'vue-chartjs';
  import axios from "axios";
  export default {
      name: 'UserHome',
      extends: Bar,
      components: {
        SmallNotification,
        Subject,
        TaskItem,
        TaskListHeader
      },
      data(){
        return{
          randomTasks: [],
          randomLectures: [],
          disciplines: [],
          tasks: [],
          currentTasks: [],
          notifications: [],
          user: {},
          students: [],
        }
      },
    async mounted() {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      let res = await axios.get(`http://127.0.0.1:8000/api/users/getDisciplines`,{headers: headers})
      this.disciplines = res.data.userDisciplines.slice(0,3)
      res = await axios.get(`http://127.0.0.1:8000/api/users/getTasks`,{headers: headers})
      this.tasks = res.data.userTasks.reverse()
      this.currentTasks = [...this.tasks.slice(0,3)]

      res = await axios.get(`http://127.0.0.1:8000/api/users/getStudentsByTeacher`, {headers: headers})
      this.students = res.data.students

      res = await axios.get(`http://127.0.0.1:8000/api/users/getNotifications`,{headers: headers})
      this.notifications = res.data.userNotifications.reverse()

      this.user = JSON.parse(localStorage.getItem('user'))

      if(this.user.status === 'Student')
        this.renderStudentDiagram()
      else
        this.renderTeacherDiagram()

    },
    methods:{
        renderStudentDiagram(){
          let completedTaskCount = this.tasks.filter(task => task.status === 'Completed').length
          let inProcessTaskCount = this.tasks.filter(task => task.status === 'In process').length
          let uncompletedTaskCount = this.tasks.filter(task => task.status === 'Uncompleted').length

          let barData = {
            labels: ['Completed', 'In process', 'Uncompleted'],
            datasets: [{
              data: [completedTaskCount, inProcessTaskCount, uncompletedTaskCount],
              backgroundColor: ['#4ABC9A', '#EFBD09', '#FF5A5A'],
            }]
          }

          let barOptions = {
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            xAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }],
            yAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }]
          }
          this.renderChart(barData, barOptions)
        },
        renderTeacherDiagram(){
          let lessThan6 = this.students.filter(student => student.average_score < 6).length
          let from6To8 = this.students.filter(student => student.average_score >= 6 && student.average_score < 8).length
          let moreThan8 = this.students.filter(student => student.average_score > 8).length
          let barData = {
            labels: ['Less than 6', 'From 6 to 8', 'More than 8'],
            datasets: [{
              data: [lessThan6, from6To8, moreThan8],
              backgroundColor: ['#FF5A5A', '#EFBD09', '#4ABC9A'],
            }]
          }

          let barOptions = {
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            xAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }],
            yAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }]
          }
          this.renderChart(barData, barOptions)
        }
    }
  }
</script>
