<template>
  <div class="my-5 post-list">
    <a-page-header
      class="mb-5 p-3"
      style="border: 1px solid rgb(235, 237, 240)"
    >
      <h1>
        Lọc bài viết
      </h1>
      <div class="d-flex mt-3">
        <span class="me-3">
          <span class="label">
            Danh mục:
          </span>
          <a-select
            ref="select"
            v-model:value=filter.category
            style="width: 120px"
            @change="fetchPosts"
          >
            <a-select-option :value="0" selected>Danh mục</a-select-option>
            <a-select-option v-for="(category, index) in categories" v-bind:value="category.id" v-bind:key="category.name">
                {{ category.name }}
            </a-select-option>
          </a-select>
        </span>
        <span class="me-3">
          <span class="label">
            Sắp xếp:
          </span>
          <a-select
            ref="select"
            v-model:value=filter.sort
            style="width: 120px"
            @change="fetchPosts"
          >
            <a-select-option :value="1">Mới nhất</a-select-option>
            <a-select-option :value="2">Cũ nhất</a-select-option>
          </a-select>
        </span>
        <span class="me-3">
          <span class="label">
            Hiển thị:
          </span>
          <a-select
            ref="select"
            v-model:value=pageSize
            style="width: 120px"
            @change="changePageSize"
          >
            <a-select-option :value="1">1</a-select-option>
            <a-select-option :value="5">5</a-select-option>
            <a-select-option :value="10">10</a-select-option>
            <a-select-option :value="20">20</a-select-option>
          </a-select>
        </span>
      </div>
    </a-page-header>
    <a-skeleton v-if="loading"/>
    <div v-else>
      <div class="row">
        <div class="col-md-4 mt-3" v-for="post in posts">
          <div class="card">
            <div class="card__header">
              <NuxtLink :to="{name: 'posts-slug', params: { slug: post.slug }}">
                <img :src="post.image" alt="card__image"
                     class="card__image" width="600">
              </NuxtLink>
            </div>
            <div class="card__body">
              <span class="tag tag-blue">{{ post.category.name }}</span>
              <NuxtLink :to="{name: 'posts-slug', params: { slug: post.slug }}" class="post-title">
                <h4>{{ $longName(post.title) }}</h4>
              </NuxtLink>
            </div>
            <div class="card__footer">
              <div class="user">
                <a-avatar size="large">
                  {{ $avtName(post.user.name) }}
                </a-avatar>
                <div class="user__info">
                  <h5>{{ post.user.name }}</h5>
                  <small>{{ post.created_at_human }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <a-pagination  :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`" v-model:current="current" :showQuickJumper="true" :hideOnSinglePage="true" :defaultPageSize="pageSize" :total="total" show-less-items v-on:change="switchPage"/>
      </div>
    </div>
  </div>
</template>

<script>


import axios from "axios";
import {URL_API} from "@/common/constants";

export default {
  name: "index.vue",
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
      filter: {
        category: 0,
        sort: 1
      },
      categories: [],
      current: 1,
      pageSize: 1,
      total: null
    };
  },
  mounted() {
    this.current = this.$store.getters["paginate/getPage"]
    this.pageSize = this.$store.getters["paginate/getPageSize"]
    this.filter.category = this.$store.getters["paginate/getCategory"]
    this.filter.sort = this.$store.getters["paginate/getSort"]
    this.fetchPosts();
    this.fetchCategories();
  },
  methods: {
    fetchPosts() {
      this.loading = true;
      this.error = null;
      this.$store.commit("paginate/setSort", this.filter.sort);
      this.$store.commit("paginate/setCategory", this.filter.category);
      axios
        .get(URL_API + "posts/" + this.filter.category + "/" + this.filter.sort + "/" + this.current + "/" + this.pageSize)
        .then(response => {
          this.posts = response.data.posts;
          this.total = response.data.total;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
        });
    },
    fetchCategories() {
      axios
        .get(URL_API + "categories")
        .then(response => {
          this.categories = response.data.categories;
          console.log(this.categories);
        })
        .catch(error => {
          this.error = error;
        });
    },
    switchPage() {
      this.$store.commit("paginate/setPage", this.current);
      this.fetchPosts();
    },
    changePageSize() {
      this.$store.commit("paginate/setPageSize", this.pageSize);
      this.fetchPosts();
    },
    sorting() {
      console.log(this.filter.category)
    }
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Quicksand", sans-serif;
  display: grid;
  place-items: center;
  height: 100vh;
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ECE9E6;
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);

}


.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}


.tag {
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  font-size: .75rem;
}

.tag + .tag {
  margin-left: .5em;
}

.tag-blue {
  background: #56CCF2;
  background: linear-gradient(to bottom, #2F80ED, #56CCF2);
  color: #fafafa;
}

.card__body h4 {
  font-size: 1.5rem;
  text-transform: capitalize;
}

.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}

.user {
  display: flex;
  gap: .5rem;
}

.user__info > small {
  color: #666;
}

.post-title {
  font-family: "Quicksand", sans-serif;
  text-decoration: none;
  color: #000;
  height: 2.5rem;
}

.label {
  margin-right: 5px;
}
</style>
