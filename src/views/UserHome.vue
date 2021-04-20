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
              <p>Some text</p>
              <canvas ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-1/2 flex flex-col items-center">
        <div class="w-11/12 flex justify-between">
          <h2 style="font-family: 'Roboto Black'" class="text-xl">Tasks</h2>
          <select class="bg-transparent">
            <option selected>Sort by: name</option>
          </select>
        </div>
        <div class="w-11/12 flex-col mt-3 pb-3 flex bg-white rounded">
          <div class="w-full flex justify-center">
            <TaskListHeader class="mt-4"></TaskListHeader>
          </div>
          <div class="w-full flex flex-col items-center justify-center">
            <TaskItem v-for="task in tasks" :key="task.id" v-bind:task="task"></TaskItem>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/6 flex bg-white flex-col items-center rounded">
      <div class="w-11/12 mt-4 bg-blue-50 flex flex-col">
        <p>Text</p>
        <div class="w-full">

        </div>
      </div>
      <div class="w-11/12 mt-4 bg-blue-50 flex flex-col rounded">
        <div class="flex w-full my-4 justify-between px-4">
          <p class="xl" style="font-family: 'Roboto Medium'">Notifications</p>
          <router-link class="text-blue-500 text-blue-700" style="font-family: Roboto" to="/">See all</router-link>
        </div>
        <div class="flex w-full flex-col items-center pb-4">
          <SmallNotification></SmallNotification>
          <SmallNotification></SmallNotification>
          <SmallNotification></SmallNotification>
          <SmallNotification></SmallNotification>
          <SmallNotification></SmallNotification>
        </div>
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
          barData: {
            labels: ['Purple', 'Red', 'Gray', 'Blue', 'Orange'],
            datasets: [{
              data: [12, 19, 3, 5, 13],
              barThickness: 18,
              radius: 9,
              backgroundColor: ['#7F7FFB', '#FF6666', '#C4C4C4', '#85D7FC', '#FF6D39', '#4ABC9A'],
            }]
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
    async mounted() {
      this.renderChart(this.barData, this.barOptions)
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      let res = await axios.get(`http://127.0.0.1:8000/api/users/getDisciplines`,{headers: headers})
      this.disciplines = res.data.userDisciplines.slice(0,3)
      res = await axios.get(`http://127.0.0.1:8000/api/users/getTasks`,{headers: headers})
      this.tasks = res.data.userTasks.slice(0,3)
    }
  }
</script>
