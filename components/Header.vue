<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="d-flex">
          <a data-bs-toggle="offcanvas" href="#offcanvasExample" id="toggle-side">
            <div id="burger-side">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <NuxtLink :to="{ name: 'index' }">
            <a class="navbar-brand" href="#">NBQ</a>
          </NuxtLink>
        </div>
        <div class="" id="navbarSupportedContent">
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Hello, User</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Select a menu item to see more details.
        </div>
        <ul class="list-unstyled ps-0">
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                    data-bs-target="#information-collapse" aria-expanded="true">
              Thông tin
            </button>
            <div class="collapse show" id="information-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><NuxtLink :to="{name: 'index'}" class="link-dark rounded">Trang chủ</NuxtLink></li>
                <li><a href="#" class="link-dark rounded">Liên lạc</a></li>
              </ul>
            </div>
          </li>
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                    data-bs-target="#home-collapse" aria-expanded="false">
              Bài viết
            </button>
            <div class="collapse" id="home-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><NuxtLink :to="{name: 'posts'}" class="link-dark rounded">Tất cả</NuxtLink></li>
                <li style="padding-left: 15px;">
                  <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                          data-bs-target="#dashboard-collapse" aria-expanded="false">
                    Danh mục
                  </button>
                  <div class="collapse" id="dashboard-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li><a href="#" class="link-dark rounded">Đi học</a></li>
                      <li><a href="#" class="link-dark rounded">Đi làm</a></li>
                      <li><a href="#" class="link-dark rounded">Kiến thức</a></li>
                      <li><a href="#" class="link-dark rounded">Bí kíp ăn chơi</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  mounted() {
  }
}
</script>

<style scoped>
#burger-side {
  width: 30px;
  height: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#burger-side span {
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: #000000;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#burger-side span:nth-child(1) {
  top: 0px;
}

#burger-side span:nth-child(2) {
  top: 9px;
}

#burger-side span:nth-child(3) {
  top: 18px;
}

#burger-side.open span:nth-child(1) {
  top: 9px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#burger-side.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#burger-side.open span:nth-child(3) {
  top: 9px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

#toggle-side {
  height: 50%;
  margin: auto 15px auto 0;
}

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.dropdown-toggle {
  outline: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.navbar-brand {
  text-decoration: none !important;
}
</style>
