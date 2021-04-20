<template>
  <form class="w-1/3 h-5/6 bg-white flex flex-col justify-center items-center rounded" @submit.prevent="validator">
    <div class="w-1/6 h-16 text-3xl font-bold text-white p-0 text-center pt-2 rounded bg-blue-500">
      &#8721;
    </div>
    <h1 class="text-3xl text-gray-700 mt-8" style="font-family: 'Roboto Medium'">Welcome</h1>
    <p class="text-gray-400">Enter your credentials to create the account</p>
    <input v-model="name" type="text" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Name">
    <input pattern="^\w+([\.\w]+)*\w@\w((\.\w)*\w+)*\.\w{2,3}$" v-model="email" type="text" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Email">
    <input v-model="password" type="password" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Password">
    <input v-model="rPassword" type="password" class="w-1/2 text-xl py-2 px-4 mt-4 text-gray-600 rounded bg-blue-50" placeholder="Repeat password">
    <p class="text-red-600 mt-2" :style="{display:errorMessage?'block':'none'}">{{errorMessage}}</p>
    <input required type="submit" value="Sign Up" class="w-1/2 text-xl py-2 px-4 mt-6 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600" placeholder="Password">
    <p class="text-gray-400 mt-2">You have an account? <router-link class="hover:text-gray-600" to="/">Sign in</router-link></p>
  </form>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Register",
    data(){
      return{
        name: '',
        email: '',
        status: 'Student',
        password: '',
        rPassword: '',
        file: ''
      }
    },
    methods: {
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      validator(){
        if(this.password !== this.rPassword){
          this.errorMessage = 'Your passwords do not match'
        }else{
          this.signUp()
        }
      },
      signUp(){
        let user = {
          name: this.name,
          email: this.email,
          status: "Student",
          password: this.password
        }
        axios.post( 'http://127.0.0.1:8000/api/register',
            user,
            {
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }
        ).then((response) =>{
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.access_token)
          window.location.href = "layout/user-home"
        })
        .catch((e) => {
          this.errorMessage = 'Error'
          console.log(e.message)
        });
      }
    }
  }
</script>

<style scoped>

</style>
