<template>
  <form class="w-1/3 h-2/3 bg-white flex flex-col justify-center items-center rounded" @submit="login">
    <div class="w-1/6 h-16 text-3xl font-bold text-white p-0 text-center pt-2 rounded bg-blue-500">
      &#8721;
    </div>
    <h1 class="text-3xl text-gray-700 mt-8" style="font-family: 'Roboto Medium'">Welcome back</h1>
    <p class="text-gray-400">Enter your credentials to access the account</p>
    <input v-model="username" type="text" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Username">
    <input v-model="password" type="password" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Password">
    <p class="text-red-600 mt-2" :style="{display:errorMessage?'block':'none'}">{{errorMessage}}</p>
    <input type="submit" value="Sign in" class="w-1/2 text-xl py-2 px-4 mt-6 text-white rounded bg-blue-500 cursor-pointer" placeholder="Password">
    <p class="text-gray-400 mt-2">You don't have an account? <router-link class="hover:text-gray-600" to="/layout">Sign up</router-link></p>
  </form>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        username: '',
        password: '',
        errorMessage: ''
      }
    },
    methods:{
      login(){
        this.errorMessage = 'Error'
      }
    }
  }
</script>

<style scoped>

</style>
