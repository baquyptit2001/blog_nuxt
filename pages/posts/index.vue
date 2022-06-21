<template>
  <div class="my-5 post-list">
    <a-skeleton v-if="loading"/>
    <div v-else>
      <div class="container">
        <div class="card" v-for="post in posts">
          <div class="card__header">
            <NuxtLink :to="{name: 'posts-slug', params: { slug: post.slug }}">
              <img :src="post.image" alt="card__image"
                   class="card__image" width="600">
            </NuxtLink>
          </div>
          <div class="card__body">
            <span class="tag tag-blue">{{ post.category.name }}</span>
            <NuxtLink :to="{name: 'posts-slug', params: { slug: post.slug }}" class="post-title">
              <h4>{{ post.title }}</h4>
            </NuxtLink>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus.
              Doloremque, nihil! At ea atque quidem!</p>
          </div>
          <div class="card__footer">
            <div class="user">
              <a-icon type="user" size="large"/>
              <div class="user__info">
                <h5>{{ post.user.name }}</h5>
                <small>{{ post.created_at_human }}</small>
              </div>
            </div>
          </div>
        </div>
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
      error: null
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.loading = true;
      this.error = null;
      axios
        .get(URL_API + "posts")
        .then(response => {
          this.posts = response.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
        });
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

.post-title{
  font-family: "Quicksand", sans-serif;
  text-decoration: none;
  color:  #000;
}
</style>
