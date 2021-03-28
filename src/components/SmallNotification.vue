<template>
  <div class="w-full mt-1 pl-4 flex items-center">
    <div class="flex items-center">
      <div class="fas fa-circle text-blue-600" style="font-size: 7px"></div>
    </div>
    <div class="ml-2">
      <router-link to="/" class="text-gray-500 hover:text-black" style="font-family: Roboto">New Math task</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallNotification"
}
</script>

<style scoped>

</style>
