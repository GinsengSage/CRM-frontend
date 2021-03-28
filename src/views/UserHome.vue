<template>
  <div class="w-full h-full flex pr-8">
    <div class="w-5/6 h-full flex flex-col">
      <div class="flex h-1/2 flex-col w-full items-center">
        <div class="w-11/12 flex justify-between">
          <h2 style="font-family: 'Roboto Black'" class="text-xl">Lectures</h2>
        </div>
        <div class="w-11/12 my-8 flex items-center">
          <Subject></Subject>
          <Subject></Subject>
          <Subject></Subject>
          <div class="w-1/4 mx-2 р-3/4 px-8 bg-white rounded flex flex-col">

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
        <div class="w-full flex justify-center">
          <TaskListHeader class="mt-4"></TaskListHeader>
        </div>
        <div class="w-full flex flex-col items-center justify-center">
          <Task></Task>
          <Task></Task>
          <Task></Task>
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
          <router-link class="text-blue-500" style="font-family: Roboto" to="/">See all</router-link>
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
  import Task from "@/components/Task";
  import Subject from "@/components/Subject";
  import SmallNotification from "@/components/SmallNotification";
  export default {
      name: 'UserHome',
      components: {
        SmallNotification,
        Subject,
        Task,
        TaskListHeader
      },
      data(){
        return{
          randomTasks: [],
          randomLectures: []
        }
      }
  }
</script>
