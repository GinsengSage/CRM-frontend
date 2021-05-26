<template>
  <div class="w-full h-full flex">
    <div class="w-5/6 h-full flex flex-col items-center">
      <div class="w-11/12 mt-4 flex flex-col bg-white pb-4 rounded items-center">
        <div class="w-full flex justify-center my-4">
          <div class="w-11/12 flex justify-between">
            <div class="flex w-1/2 items-center">
              <p class="mr-4 text-xl text-gray-400" style="font-family: 'Roboto Medium'">Notifications</p>
              <div class="flex items-center bg-gray-100 rounded w-1/3 py-1 px-1 justify-center">
                <i class="fas fa-search mx-2"></i>
                <input class="bg-transparent w-full" v-model="searchStr" type="text" placeholder="Quick search">
              </div>
              <select v-model="notificationsStatus" class="ml-2">
                <option value="all" selected>All</option>
                <option value="checked">Checked</option>
                <option value="not checked">Not checked</option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center">
          <BigNotification v-for="notification in currentNotifications" :key="notification.id" v-bind:notification="notification"></BigNotification>
        </div>
      </div>
    </div>
    <div class="w-1/6 pr-8 mt-4 h-full flex flex-col items-center justify-center">
      <div class="w-full bg-white h-1/5 py-6 flex flex-col items-center justify-center">
        <p class="text-gray-400">Notifications</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{notifications.length}}</p>
      </div>
      <div class="w-full bg-white mt-4 h-1/5 py-6 flex flex-col items-center justify-center">
        <p class="text-gray-400">New notifications</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">{{newNotificationsCount}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import BigNotification from "@/components/BigNotification";
import axios from "axios";
export default {
  name: "Notifications",
  components: {
    BigNotification,
  },
  data(){
    return{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      user: {},
      notifications: [],
      currentNotifications: [],
      newNotificationsCount: 0,
      searchStr: '',
      notificationsStatus: 'all',
    }
  },
  methods: {
    async getNotifications(){
      let res = await axios.get(`http://127.0.0.1:8000/api/users/getNotifications`,{headers: this.headers})
      this.notifications = res.data.userNotifications.reverse()
      this.currentNotifications = [...this.notifications]
      this.newNotificationsCount = [...this.notifications.filter(not => not.checked === 0)].length
    }
  },
  watch: {
    searchStr(value){
      if(value){
        this.currentNotifications = [...this.notifications.filter(not => not.name.includes(value))]
      }else{
        this.currentNotifications = [...this.notifications]
      }
    },
    notificationsStatus(value){
      switch (value){
        case 'all':
          this.currentNotifications = [...this.notifications]
          break
        case 'not checked':
          this.currentNotifications = [...this.notifications.filter(not => not.checked === 0)]
          break
        case 'checked':
          this.currentNotifications = [...this.notifications.filter(not => not.checked === 1)]
          break
      }
    }
  },
  async mounted() {
    await this.getNotifications()
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style scoped>

</style>
