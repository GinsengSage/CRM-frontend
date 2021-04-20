<template>
  <div to="/" class="w-11/12 mt-1 bg-blue-50 rounded py-4 px-4 flex items-center justify-between hover:bg-blue-100">
    <div class="flex">
      <div class="flex items-center">
        <div class="fas fa-circle text-blue-600" style="font-size: 7px"></div>
      </div>
      <div class="ml-2">
        <router-link to="/" class="text-gray-500 hover:text-black" style="font-family: Roboto">New Math task</router-link>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <p>12-12-2021</p>
      <i class="fas fa-times text-black ml-6 mr-2 cursor-pointer text-lg hover:text-red-600"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BigNotification"
  }
</script>

<style scoped>

</style>
