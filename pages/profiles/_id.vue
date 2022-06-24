<template>
  <div class="mt-3">
    <a-descriptions title="Thông tin người dùng" bordered>
      <a-descriptions-item label="Tên">{{ profile.name}}</a-descriptions-item>
      <a-descriptions-item label="Số điện thoại">{{ profile.phone_number}}</a-descriptions-item>
      <a-descriptions-item label="Nơi sinh">{{ profile.live }}</a-descriptions-item>
      <a-descriptions-item label="Ngày sinh">{{ profile.birthday }}</a-descriptions-item>
      <a-descriptions-item label="Địa chỉ">
        {{ profile.address }}
      </a-descriptions-item>
    </a-descriptions>
    <NuxtLink :to="{name: 'profiles-update'}">
      <a-button type="primary" class="mt-3">
        <a-icon type="edit" />
        Sửa thông tin
      </a-button>
    </NuxtLink>
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
