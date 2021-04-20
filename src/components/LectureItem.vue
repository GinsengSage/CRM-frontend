<template>
  <router-link :to = "{name: 'Lecture', params: {id:id}}" style="font-family: 'Roboto Medium'" class="w-11/12 py-3 mt-2 px-16 bg-blue-50 rounded flex justify-between items-center text-gray-400 hover:bg-blue-100">
    <div>
      <img>
      <p>{{name}}</p>
    </div>
    <p class="ml-24">{{date}}</p>
  </router-link>
</template>

<script>
export default {
  name: "Task",
  props: {
    id: Number,
    name: String,
    date: Date
  }
}
</script>
