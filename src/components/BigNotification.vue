<template>
  <router-link :to="{name:'Notification', params:{id:notification.id}}"
               class="w-11/12 mt-1 rounded py-4 px-4 flex items-center bg-blue-50 justify-between hover:bg-blue-100">
    <div class="flex">
      <div class="flex items-center">
        <div v-show="notification.checked === 0" class="fas fa-circle text-blue-600" style="font-size: 7px"></div>
      </div>
      <div class="ml-2">
        <p class="text-gray-500 hover:text-black" style="font-family: Roboto">{{notification.name}}</p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <p>{{ notification.date }}</p>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "BigNotification",
    props:{
      notification: Object
    },
  }
</script>

<style scoped>

</style>
