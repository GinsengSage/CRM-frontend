<template>
  <transition name="modal-fade">
    <div style="background-color: rgba(0, 0, 0, 0.3);" class="fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center">
      <div class="overflow-x-auto w-1/3 flex flex-col" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <form class="bg-white m-3 flex flex-col justify-center items-center rounded" @submit.prevent="submitLecture()">
          <h1 class="text-3xl text-gray-700 mt-8" style="font-family: 'Roboto Medium'">Add new task</h1>
          <input v-model="name" required type="text" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Name">
          <input v-model="date" required type="datetime-local" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50">
          <div class="flex mt-4 flex-col">
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <p class="text-red-600 mt-2" :style="{display:errorMessage?'block':'none'}">{{errorMessage}}</p>
          <div class="flex mt-1 mb-6">
            <input type="submit" value="Send" class="w-1/2 mx-2 text-xl py-2 px-4 mt-6 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600">
            <input type="submit" value="Close" @click="close" class="w-1/2 mx-2 text-xl py-2 px-4 mt-6 text-white rounded bg-red-500 cursor-pointer hover:bg-red-600">
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "AddTask"
  }
</script>
