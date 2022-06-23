<template>
  <div class="my-3">
    <template>
      <a-skeleton v-if="loading" />
      <div v-else>
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="Bài viết"
          :sub-title="post.title"
          @back="$router.go(-1)"
        />
        <a-divider />
        <div>
          <div class="mb-5">
            <div class="d-inline-block">
              <div class="mb-3">
                <a-avatar size="large">
                  {{ $avtName(post.user.name) }}
                </a-avatar>
                <a-divider type="vertical" />
                <a-tag color="blue">
                  <a-icon type="user" />
                  <span>{{ post.user.name }}</span>
                </a-tag>
              </div>
              <div class="mb-3">
                <a-tag color="blue">
                  <a-icon type="calendar" />
                  <span>{{ post.created_at }}</span>
                </a-tag>
              </div>
            </div>
            <h1 class="text-3xl font-bold leading-tight mb-3 d-inline-block">{{ post.title }}</h1>
          </div>
        </div>
        <a-divider />
        <div class="mt-3" id="post-content" v-html="post.content"></div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {URL_API} from "@/common/constants";

export default {
  name: "post-detail",
  data() {
    return {
      post: null,
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
        .get(URL_API + "posts/" + this.$route.params.slug)
        .then(response => {
          this.post = response.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
#post-content {
  max-width: 100%;
}
</style>
