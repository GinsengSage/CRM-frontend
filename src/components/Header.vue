<template>
  <div class="flex w-full justify-between items-center h-full text-gray-400">
    <div>
      <h2 class="text-2xl" style="font-family: 'Roboto Black'">Dashboard</h2>
    </div>
    <div style="font-family: 'Roboto Medium'" class="flex justify-center items-center text-l">
      <p class="px-2">12-11-2021</p>
      <div class="flex">
        <i class="fas fa-cog px-1"></i>
        <i class="fas fa-bell px-1"></i>
      </div>
      <p class="pl-4">Jone Jones</p>
      <div>
        <img class="w-2/3 h-2/3" src="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data(){
      return{
        currentDate: 0,
      }
    }
  }
</script>

<style scoped>

</style>
