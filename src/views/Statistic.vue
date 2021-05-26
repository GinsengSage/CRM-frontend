<template>
  <div>
    <div class="w-full h-full flex">
      <div class="w-full h-full flex flex-col items-center">
        <div class="w-11/12 mt-4 flex bg-white pb-4 rounded flex-wrap items-center">
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col items-center pb-14 rounded">
            <p class="text-gray-400">Count of disciplines</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{disciplines.length}}</p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col items-center pb-14 rounded">
            <p class="text-gray-400">Count of tasks</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{tasks.length}}</p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col items-center pb-14 rounded">
            <p class="text-gray-400">Count of notifications</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{notifications.length}}</p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col items-center pb-8 rounded">
            <p class="text-gray-400">Count of checked notes</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{checkedNotifications.length}}</p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col justify-center items-center pb-8 rounded">
            <p class="text-gray-400 text-center">Count of unchecked notes</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{uncheckedNotifications.length}}</p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 bg-blue-50 flex flex-col justify-center items-center pb-8 rounded">
            <p class="text-gray-400 text-center">{{user.status === 'Student' ? 'Average score' : 'Count of students'}}</p>
            <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">
              {{user.status === 'Student' ? user.average_score : students.length}}
            </p>
          </div>
          <div class="w-1/6 mt-4 px-4 mx-4 flex rounded bg-blue-50 flex-col items-center h-1/8">
            <p><b>{{ user.status === 'Student' ? 'Your tasks' : 'Students by AS' }}</b></p>
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Bar} from "vue-chartjs";

export default {
  name: "Statisctic",
  extends: Bar,
  data(){
    return{
      disciplines: [],
      notifications: [],
      checkedNotifications: [],
      uncheckedNotifications: [],
      tasks: [],
      students: [],
      user: {},
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
      barOptions: {
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
    }
  },
  methods: {
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

      this.renderChart(barData, this.barOptions)
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
      this.renderChart(barData, this.barOptions)
    }
  },
  async mounted() {

    this.user = JSON.parse(localStorage.getItem('user'))

    let res = await axios.get(`http://127.0.0.1:8000/api/users/getDisciplines`,{headers: this.headers})
    this.disciplines = res.data.userDisciplines

    res = await axios.get(`http://127.0.0.1:8000/api/users/getTasks`,{headers: this.headers})
    this.tasks = res.data.userTasks

    res = await axios.get(`http://127.0.0.1:8000/api/users/getNotifications`,{headers: this.headers})
    this.notifications = res.data.userNotifications.reverse()

    this.checkedNotifications = this.notifications.filter(note => note.checked === 1)
    this.uncheckedNotifications = this.notifications.filter(note => note.checked === 0)

    res = await axios.get(`http://127.0.0.1:8000/api/users/getStudentsByTeacher`, {headers: this.headers})
    this.students = res.data.students

    if(this.user.status === 'Student')
      this.renderStudentDiagram()
    else
      this.renderTeacherDiagram()

  }
}
</script>

<style scoped>

</style>
