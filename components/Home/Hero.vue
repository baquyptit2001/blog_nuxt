<template>
  <div class="px-4 pt-5 my-5 text-center">
    <h1 class="display-4 fw-bold">Centered screenshot</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <NuxtLink :to="{name: 'posts'}">
          <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Bài viết</button>
        </NuxtLink>
        <button type="button" class="btn btn-outline-info btn-lg px-4">Liên lạc</button>
      </div>
    </div>
    <div class="overflow-hidden">
      <div class="container">
        <img src="~/assets/dog.jpg" class="img-fluid rounded-3 shadow-lg mb-4" alt="Example image" width="700" loading="lazy">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero"
}
</script>

<style scoped>

</style>
