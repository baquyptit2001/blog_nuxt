<template>
  <div class="my-5">
    HIHI
  </div>
</template>

<script>
import Post from "@/model/post";
import User from "@/model/user";

export default {
  name: "index.vue",
  data() {
    return {
      post: new Post(),
      user: new User()
    };
  }
}
</script>

<style scoped>

</style>
