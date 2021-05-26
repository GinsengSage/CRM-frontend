<template>
  <router-link :to = "{name: 'Task', params: {id:task_.id, status: task_.status}}" style="font-family: 'Roboto Medium'" class="w-11/12 py-3 text-gray-600 flex bg-blue-50 rounded mt-2 hover:bg-blue-100 cursor-pointer">
    <div class="w-1/6 flex justify-center">
      <img>
      <p class="py-1">{{task_.name}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task_.disciplineName}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task_.date_start}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task_.date_end}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p :class="statusColor" class="rounded-full px-2 py-1">{{task_.status}}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <p class="py-1">{{task_.score}}</p>
    </div>
  </router-link>
</template>

<script>
  import axios from "axios";

  export default {
    name: "TaskItem",
    data(){
      return{
        task_: {},
        user: {},
        statusColor: '',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      }
    },
    props:{
      task:Object
    },
    methods: {
      checkStatus(){
        let now = new Date()
        let currentMonth = now.getMonth() + 1
        let currentDay = now.getDate()

        let taskEndDate = this.task.date_end
        let taskEndDateMonth = parseInt(taskEndDate.substr(5,2))
        let taskEndDateDay = parseInt(taskEndDate.substr(8,2))
        if(this.task.status === 'In process'){
          if(currentMonth > taskEndDateMonth){
            axios.patch(`http://127.0.0.1:8000/api/tasks/changeStatus/${this.task.id}`, {newStatus: 'Uncompleted'}, {headers: this.headers})
            this.task_.status = 'Uncompleted'
            this.changeColor()
            this.$emit('changeStatus')
          }else if (currentMonth === taskEndDateMonth){
            if(currentDay > taskEndDateDay){
              axios.patch(`http://127.0.0.1:8000/api/tasks/changeStatus/${this.task.id}`, {newStatus: 'Uncompleted'}, {headers: this.headers})
              this.task_.status = 'Uncompleted'
              this.changeColor()
              this.$emit('changeStatus');
            }
          }
        }
      },
      changeColor(){
        switch (this.task_.status){
          case 'Completed':
            this.statusColor = 'bg-green-200'
            break
          case 'In process':
            this.statusColor = 'bg-yellow-200'
            break
          case 'Uncompleted':
            this.statusColor = 'bg-red-200'
            break
        }
      }
    },
    mounted() {
      this.task_ = Object.assign({}, this.task)
      this.user = JSON.parse(localStorage.getItem('user'))
      if(this.user.status === 'Student')
        this.checkStatus()
      this.changeColor()
    }
  }
</script>

<style scoped>

</style>
