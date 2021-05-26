<template>
  <div class="w-full mt-1 pl-6 flex items-center">
    <div class="ml-2">
      <p class="text-gray-500" style="font-family: Roboto">{{note.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallNotification",
  props: {
    note: Object
  }
}
</script>

<style scoped>

</style>
