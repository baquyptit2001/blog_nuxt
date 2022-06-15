<template>
  <div>
    <Hero></Hero>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from "~/components/Home/Hero.vue";

export default Vue.extend({
  name: 'IndexPage',
  components: {Hero}
})
</script>
