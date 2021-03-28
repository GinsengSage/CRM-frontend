<template>
  <div class="w-full h-full flex">
    <div class="w-1/6 h-full">
      <Menu></Menu>
    </div>
    <div class="w-5/6 h-full">
      <div class="h-1/12 p-8 w-full">
        <Header></Header>
      </div>
      <div class="h-11/12 w-full">
        <router-view class="h-full"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import Header from "@/components/Header";
  export default {
    name: "Layout",
    components: {
      Menu,
      Header
    }
  }
</script>

<style scoped>

</style>
