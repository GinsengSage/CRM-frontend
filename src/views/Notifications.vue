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
                <input class="bg-transparent w-full" type="text" placeholder="Quick search">
              </div>
              <select class="ml-2">
                <option selected>All Notifications</option>
                <option>New</option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center">
          <BigNotification></BigNotification>
        </div>
      </div>
    </div>
    <div class="w-1/6 pr-8 mt-4 h-full flex flex-col items-center justify-center">
      <div class="w-full bg-white h-1/5 py-6 flex flex-col items-center justify-center">
        <p class="text-gray-400">Notifications count</p>
        <p class="text-4xl mt-4" style="font-family: 'Roboto Black'">6</p>
      </div>
    </div>
  </div>
</template>

<script>
import BigNotification from "@/components/BigNotification";
export default {
  name: "Notifications",
  components: {
    BigNotification,
  }
}
</script>

<style scoped>

</style>
