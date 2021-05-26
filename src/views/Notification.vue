<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12">
      <div class="flex w-1/4 items-center">
        <router-link :to="{name: 'Notifications'}" tag="a" class="bg-blue-500 px-1 py-1 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
          <i class="fas fa-step-backward"></i>
        </router-link>
        <p class="mx-2 text-lg text-gray-500" style="font-family: 'Roboto Medium'">Notifications</p>
      </div>
    </div>
    <div class="w-11/12 mt-4 h-full pb-6 bg-white flex flex-col rounded">
      <div class="flex h-full px-8 flex-col items-center">
        <h1 class="text-5xl text-gray-400 mt-8" style="font-family: 'Roboto Medium'">{{notification.name}}</h1>
        <div style="height: 380px" class="w-full mt-8 overflow-y-scroll">
          <p class="text-xl">{{notification.text}}</p>
        </div>
        <div class="w-full mt-4 items-center justify-between flex">
          <input type="button" value="Delete" @click="remove"
                 class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"  placeholder="Password">
          <form @submit.prevent="rate" :class="[ isSendControlVisible ? 'block' : 'hidden']">
            <div class="flex items-center">
              <p class="text-lg mr-2">Score</p>
              <input type="number" max="10" min="1" class="px-8 py-2 mx-4 bg-blue-50" v-model="score"/>
              <input class="text-lg py-1 px-4 text-white rounded bg-blue-500 cursor-pointer hover:bg-blue-600"
                     value="Send"
                     type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Notification",
    props:{
      id:Number
    },
    data(){
      return{
        notification: {},
        score: 1,
        isSendControlVisible: true,
        user: {},
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
        pathName: ''
      }
    },
    methods:{
      async rate(){
        if(confirm('Are you sure?')){
          let formData = new FormData()
          formData.append('studentId', this.notification.student_id)
          formData.append('taskId', this.notification.task_id)
          formData.append('notificationId', this.notification.id)
          formData.append('score', this.score)
          await axios.post('http://127.0.0.1:8000/api/tasks/rateTask', formData , {headers: this.headers})
              .then(() => {
                this.isSendControlVisible = false
                alert('Task was successfully rated')
              })
             .catch(() => {
               alert('Error')
              })
        }else{
          return
        }
      },
      async remove(){
        if(confirm('Are you sure?')){
          let res = await axios.delete( `http://127.0.0.1:8000/api/notifications/removeNotification/${this.notification.id}`, {headers: this.headers})
          if(res){
            window.location.replace('/layout/notifications')
          }
        }else{
          return
        }
      },
      async changeStatus(){
        if(this.notification.checked === 0){
          let formData = new FormData();
          formData.append('id', this.id)
          await axios.post(`http://127.0.0.1:8000/api/notifications/changeStatus`,formData, {headers: this.headers})
        }
      },
      changeCheckPathName(){
        if(this.notification.name.includes('lecture')){
          this.pathName = 'Lecture'
        }else if(this.notification.name.includes('task')){
          this.pathName = 'Task'
        }
      }
    },
    async mounted() {
      let res = await axios.get(`http://127.0.0.1:8000/api/notifications/getNotification/${this.id}`,{headers: this.headers})
      this.notification = res.data.notification
      this.user = JSON.parse(localStorage.getItem('user'))

      if(this.user.status === 'Teacher' && this.notification.rated === 0){
        this.isSendControlVisible = true
      }else{
        this.isSendControlVisible = false
      }

      this.changeCheckPathName()
      this.changeStatus()
    }
  }
</script>

<style scoped>

</style>
