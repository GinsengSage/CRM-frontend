<template>
  <div class="w-full bg-blue-50 flex flex-col h-full">
    <div class="w-full flex justify-center items-center h-1/4">
      <div class="w-1/4 h-1/3 text-3xl font-bold text-white p-0 text-center pt-2 rounded bg-blue-500">
        &#8721;
      </div>
    </div>
    <div class="w-full h-1/2 flex">
      <div class="w-full h-full" style="font-family: 'Roboto Black'">
        <div v-for="item in activeMenuItems" :key="item.title" class="w-full h-1/6 text-gray-400 flex justify-center items-center hover:bg-blue-100 hover:text-gray-700">
            <i :class="item.icon" class="mx-1.5"></i>
            <router-link to="{{item.link}}">{{item.title}}</router-link>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center h-1/4">
      <div class="bg-blue-500 w-1/5 h-1/4 text-2xl cursor-pointer flex justify-center items-center font-bold text-white rounded hover:bg-white">
        <router-link to="/">
          <i class="fas fa-door-open hover:text-blue-600"></i>
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
        studentMenuItems: [
          { title: 'Dashboard', link: '/layout/user-home', icon: 'fas fa-border-all'},
          { title: 'Disciplines', link: '/layout/user-discipline', icon: 'fas fa-graduation-cap'},
          { title: 'Notifications', link: '/StudentNotifications', icon: 'fas fa-bell'},
          { title: 'Statistic', link: '/StudentStatistic', icon: 'fas fa-chart-line'},
          { title: 'Events', link: '/StudentEvents', icon: 'fas fa-calendar-week'},
        ],
        teacherMenuItems: [
          { title: 'Dashboard', link: '/TeacherHome', icon: 'fas fa-border-all'},
          { title: 'Disciplines', link: '/TeacherDisciplines', icon: 'fas fa-graduation-cap'},
          { title: 'Students', link: '/Students', icon: 'fas fa-user-friends'},
          { title: 'Notifications', link: '/TeacherNotifications', icon: 'fas fa-bell'},
          { title: 'Statistic', link: '/TeacherStatistic', icon: 'fas fa-chart-line'},
          { title: 'Events', link: 'TeacherEvents', icon: 'fas fa-calendar-week'},
        ],
        activeMenuItems: []
      }
    },
    mounted() {
      this.activeMenuItems = [...this.studentMenuItems]
    }
  }
</script>
