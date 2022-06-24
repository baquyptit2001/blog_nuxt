<template>
  <div class="my-3">
    <template>
      <a-skeleton active v-if="loading"/>
      <div v-else>
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="Bài viết"
          :sub-title="post.title"
          @back="$router.go(-1)"
        />
        <a-divider/>
        <div>
          <div class="mb-5">
            <div class="d-inline-block">
              <div class="mb-3">
                <a-avatar size="large">
                  {{ $avtName(post.user.name) }}
                </a-avatar>
                <a-divider type="vertical"/>
                <NuxtLink :to="{name: 'profiles-id', params: {id: post.user.id}}">
                  <a-tag color="blue">
                    <a-icon type="user"/>
                    <span>{{ post.user.name }}</span>
                  </a-tag>
                </NuxtLink>
              </div>
              <div class="mb-3">
                <a-tag color="blue">
                  <a-icon type="calendar"/>
                  <span>{{ post.created_at }}</span>
                </a-tag>
              </div>
            </div>
            <h1 class="text-3xl font-bold leading-tight mb-3 d-inline-block">{{ post.title }}</h1>
          </div>
        </div>
        <a-divider/>
        <div class="mt-3" id="post-content" v-html="post.content"></div>
        <a-divider/>
        <a-skeleton v-if="loadingComment" avatar active :paragraph="{ rows: 4 }"/>
        <div v-else>
          <a-list
            item-layout="horizontal"
          >
            <template v-for="comment in post.comments">
              <a-list-item>
                <a-comment
                  :author="comment.user.name"
                  :content="comment.content"
                  :datetime="comment.created_at"
                >
                  <template #avatar>
                    <a-avatar size="small">
                      {{ $avtName(comment.user.name) }}
                    </a-avatar>
                  </template>
                </a-comment>
              </a-list-item>
            </template>
          </a-list>
          <div class="d-flex justify-content-center">
            <a-pagination v-model:current="current" defaultPageSize="5" :total="total" @change="get_comments"/>
          </div>
          <a-comment v-if="isLoggedIn">
            <template #avatar>
              <a-avatar alt="Han Solo">
                {{ $avtName(post.user.name) }}
              </a-avatar>
            </template>
            <template #content>
              <a-form-item>
                <a-textarea v-model="comment.content" :rows="4"/>
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary" @click="add_comment">
                  Bình luận
                </a-button>
              </a-form-item>
            </template>
          </a-comment>
          <div v-else>
            <a-alert
              type="info"
              message="Bạn cần đăng nhập để bình luận"
            >
              <template #description>
                <a-button type="primary" @click="$router.push('/accounts/login')">
                  Đăng nhập
                </a-button>
              </template>
            </a-alert>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {URL_API} from "@/common/constants";
import Cookies from "js-cookie";
import checkCookie from "@/helper/checkCookie";

export default {
  name: "post-detail",
  data() {
    return {
      post: null,
      loading: true,
      error: null,
      comment: {
        content: '',
        user_id: Cookies.get('user.id'),
        post_id: this.$route.params.id
      },
      isLoggedIn: false,
      loadingComment: false,
      current: 1,
      pageSize: 5,
      total: null,
    };
  },
  mounted() {
    this.isLoggedIn = checkCookie('token');
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
          this.total = this.post.comment_count;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    add_comment() {
      axios
        .post(URL_API + "comments/" + this.$route.params.slug + '/' + Cookies.get('user.id'), this.comment)
        .then(response => {
          this.comment.content = '';
          this.current = 1;
          this.get_comments();
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    get_comments() {
      this.loadingComment = true;
      axios
        .get(URL_API + "comments/" + this.$route.params.slug + '/' + this.current)
        .then(response => {
          this.post.comments = response.data.comments;
          this.loadingComment = false;
        })
        .catch(error => {
          this.error = error;
          this.loadingComment = false;
        });
    },
  }
}
</script>

<style scoped>
#post-content {
  max-width: 100%;
}
</style>
