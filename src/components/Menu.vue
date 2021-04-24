<template>
  <div class="w-full bg-blue-50 flex flex-col h-full">
    <div class="w-full flex justify-center items-center h-1/4">
      <div class="w-1/4 h-1/3 text-3xl font-bold text-white p-0 text-center pt-2 rounded bg-blue-500">
        &#8721;
      </div>
    </div>
    <div class="w-full h-1/2 flex">
      <div class="w-full h-full" style="font-family: 'Roboto Black'">
        <router-link exact active-class="bg-blue-100 text-gray-700" v-for="item in activeMenuItems" :key="item.title" v-bind:to="item.link"  class="w-full h-1/6 text-gray-400 flex justify-center items-center hover:bg-blue-100 hover:text-gray-700">
            <i :class="item.icon" class="mx-1.5"></i>
            <p>{{item.title}}</p>
        </router-link>
      </div>
    </div>
    <div class="w-full flex justify-center items-center h-1/4">
      <div class="bg-blue-500 w-1/5 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-blue-600">
        <router-link to="/">
          <i class="fas fa-door-open"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    data(){
      return{
        activeMenuItems: [
          { title: 'Dashboard', link: '/layout/user-home', icon: 'fas fa-border-all'},
          { title: 'Disciplines', link: '/layout/disciplines', icon: 'fas fa-graduation-cap'},
          { title: 'Notifications', link: '/layout/notifications', icon: 'fas fa-bell'},
          { title: 'Statistic', link: '/layout/statistic', icon: 'fas fa-chart-line'},
          { title: 'Events', link: '/layout/events', icon: 'fas fa-calendar-week'},
        ],
        user: null
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'))
      if(this.user.status === 'Teacher'){
        this.activeMenuItems.push({ title: 'Students', link: 'students', icon: 'fas fa-user-friends'})
      }
    }
  }
</script>
