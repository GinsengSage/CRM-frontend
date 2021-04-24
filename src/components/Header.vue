<template>
  <div class="flex w-full justify-between items-center h-full text-gray-400">
    <div>
      <h2 class="text-2xl" style="font-family: 'Roboto Black'">Dashboard</h2>
    </div>
    <div style="font-family: 'Roboto Medium'" class="flex justify-center items-center text-l">
      <p class="px-2">{{ date }}</p>
      <div class="flex">
        <router-link class="hover:text-blue-600" to="/layout/notifications"><i class="fas fa-bell px-1"></i></router-link>
      </div>
      <p class="pl-4 text-gray-500">{{user.name}}</p>
      <div class="ml-4">
        <i v-bind:class="icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data(){
      return{
        date: '',
        user: {},
        icon: ''
      }
    },
    mounted() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();

      this.date = yyyy + '-' + mm + '-' + dd;
      this.user = JSON.parse(localStorage.getItem('user'))

      if(this.user.status === 'Teacher'){
        this.icon = 'fas fa-chalkboard-teacher'
      }else{
        this.icon = 'fas fa-user-graduate'
      }
    }
  }
</script>

<style scoped>

</style>
