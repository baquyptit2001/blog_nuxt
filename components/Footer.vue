<template>
  <footer class="bg-light py-3 fixed-bottom d-flex justify-content-around">
    <span>
      <a href="#">
        <img src="~/assets/logo.png" width="30px" alt="logo">
      </a>
    </span>
    <span class="text-muted">&copy; Designed by NBQ</span>
    <span class="icon">
      <a href="#">
        <MaterialIconFacebook/>
      </a>
      <a href="#">
        <MaterialIconInstagram/>
      </a>
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.icon a{
  color: #656565;
}
</style>
