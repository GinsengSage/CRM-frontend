<template>
  <div style="font-family: 'Roboto Medium'"
       class="w-11/12 px-8 py-3 text-gray-500 flex bg-blue-50 rounded mt-3 hover:bg-blue-100">
    <div class="w-1/5 flex justify-center items-center">
      <div>
        <img>
      </div>
      <p>{{student.name}}</p>
    </div>
    <div class="w-1/5 flex justify-center items-center">
      <p>{{student.course}}</p>
    </div>
    <div class="w-1/5 flex justify-center items-center">
      <p>{{student.group}}</p>
    </div>
    <div class="w-1/5 flex justify-center items-center">
      <p>{{student.average_score}}</p>
    </div>
    <div class="w-1/5 flex justify-center items-center">
      <p>{{student.email}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Student",
  props:{
    student: Object
  }
}
</script>

<style scoped>

</style>
