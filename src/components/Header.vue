<template>
  <div class="flex w-full justify-between items-center h-full text-gray-400">
    <div>
      <h2 class="text-2xl" style="font-family: 'Roboto Black'">Dashboard</h2>
    </div>
    <div style="font-family: 'Roboto Medium'" class="flex justify-center items-center text-l">
      <p class="px-2">12-11-2021</p>
      <div class="flex">
        <router-link class="hover:text-blue-600" to="/"><i class="fas fa-cog px-1"></i></router-link>
        <router-link class="hover:text-blue-600" to="notifications"><i class="fas fa-bell px-1"></i></router-link>
      </div>
      <p class="pl-4">{{user.name}}</p>
      <div>
        <div>
          <img style="width: 40px;" class="block rounded-full mx-3" src="../assets/images/user.jpg">
        </div>
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
        user: {}
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  }
</script>

<style scoped>

</style>
