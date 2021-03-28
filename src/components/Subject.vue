<template>
  <div class="w-1/4 mx-2 р-3/4 px-8 bg-white rounded flex flex-col">
    <div>
      <img src="" alt="">
    </div>
    <h1 class="text-2xl text-gray-700 my-4" style="font-family: 'Roboto Black'">Math</h1>
    <p style="font-family: Roboto" class="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
    <div class="flex my-4">
      <router-link to="/" class="px-2 bg-blue-200 cursor-pointer rounded-full text-blue-600 hover:bg-blue-600 hover:text-white">Lectures</router-link>
      <router-link to="/" class="px-2 ml-2 bg-blue-200 cursor-pointer rounded-full text-blue-600 hover:bg-blue-600 hover:text-white">Tasks</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lecture"
}
</script>

<style scoped>

</style>
