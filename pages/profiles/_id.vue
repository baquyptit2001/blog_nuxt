<template>
  <div class="mt-3">
    <div v-if="loading">
      <a-skeleton active></a-skeleton>
    </div>
    <div v-else>
      <a-descriptions title="Thông tin người dùng" bordered>
        <a-descriptions-item label="Tên">{{ profile.name}}</a-descriptions-item>
        <a-descriptions-item label="Số điện thoại">{{ profile.phone_number}}</a-descriptions-item>
        <a-descriptions-item label="Nơi sinh">{{ profile.live }}</a-descriptions-item>
        <a-descriptions-item label="Ngày sinh">{{ new Date(profile.birthday).toLocaleDateString("vi-VN", {day: '2-digit', month: '2-digit', year: 'numeric'}) }}</a-descriptions-item>
        <a-descriptions-item label="Địa chỉ">
          {{ profile.address }}
        </a-descriptions-item>
      </a-descriptions>
      <NuxtLink :to="{name: 'profiles-update'}" v-if="isYou">
        <a-button type="primary" class="mt-3">
          <a-icon type="edit" />
          Sửa thông tin
        </a-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import {notification} from "ant-design-vue";
import {URL_API} from "@/common/constants";

export default {
  name: "profiles",
  data() {
    return {
      profile: {
      },
      no_infor: "Không có thông tin",
      loading: true,
      isYou: false,
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      this.loading = true;
      this.error = null;
      let id = this.$route.params.id;
      if (!id) {
        id = Cookies.get("user.id");
        if (!id) {
          notification.error({
            message: "Lỗi",
            description: "Không tìm thấy thông tin người dùng"
          });
          this.$router.push("/");
        }
      }
      axios
        .get(`${URL_API}users/${id}`)
        .then(response => {
          if (id === Cookies.get("user.id")) {
            this.isYou = true;
          }
          console.log(response.data.user);
          this.profile = response.data.user;
          Object.entries(response.data.user).forEach(([key, value]) => {
            if (value == null) {
              this.profile[key] = this.no_infor;
            } else {
              this.profile[key] = value;
            }
          });
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

</style>
