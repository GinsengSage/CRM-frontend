<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12">
      <div class="flex w-1/4 items-center">
        <router-link :to="{name: 'Tasks', params: {disciplineId:disciplineId}}" tag="a"
                     class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
          <i class="fas fa-step-backward"></i>
        </router-link>
        <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">{{ task.name }}</p>
      </div>
    </div>
    <div class="w-11/12 mt-4 pb-6 bg-white flex flex-col rounded">
      <div class="flex px-8 flex-col items-center">
        <h1 class="text-5xl text-gray-400 mt-8" style="font-family: 'Roboto Medium'">{{ task.name }}</h1>
        <div style="height: 370px" class="mt-8 overflow-y-scroll">
          {{ task.text }}
        </div>
        <div class="w-full mt-6 justify-between flex">
          <form @submit.prevent="send">
            <div class="flex"
                 :class="[ isSendControlVisible ? 'block' : 'hidden']">
              <input type="file" required id="file" ref="file" class="px-8 py-2 mx-4" v-on:change="handleFileUpload()"/>
              <input class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                     value="Send"
                     type="submit"
              />
            </div>
          </form>
          <input type="button" value="Delete" @click="remove"
                 class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                 :class="[ user.status === 'Teacher' ? 'block' : 'hidden' ]" placeholder="Password">
        </div>
        <div class="w-full mt-2 hidden">
          <p>File name</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Task",
  data() {
    return {
      task: {},
      user: {},
      file: '',
      disciplineId: 0,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      },
      isSendControlVisible: false
    }
  },
  props: {
    id: Number,
    status: String
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    send() {
      if (confirm('Are you sure?')) {
        let formData = new FormData();
        formData.append('file', this.file)
        formData.append('taskId', this.task.id)

        let res = axios.post(`http://127.0.0.1:8000/api/tasks/handOverTask`, formData, {headers: this.headers})
        if(res){
          alert('Task was successfully sended')
          this.isSendControlVisible = false
        }
      } else {
        return
      }
    },
    async remove() {
      if (confirm('Are you sure?')) {
        let res = await axios.delete(`http://127.0.0.1:8000/api/tasks/removeTask/${this.task.id}`, {headers: this.headers})
        if (res) {
          window.location.replace(`/layout/tasks/${this.disciplineId}`)
        }
      } else {
        return
      }
    }
  },
  async mounted() {
    let res = await axios.get(`http://127.0.0.1:8000/api/tasks/getTask/${this.id}`, {headers: this.headers})
    this.task = res.data.task
    console.log(this.task)
    this.user = JSON.parse(localStorage.getItem('user'))
    res = await axios.get(`http://127.0.0.1:8000/api/disciplines/getIdByTaskId/${this.id}`, {headers: this.headers})
    this.disciplineId = res.data.disciplineId

    if(this.user.status === 'Student' && this.status === 'In process'){
      this.isSendControlVisible = true
    }
  }
}
</script>

<style scoped>

</style>
