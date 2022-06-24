<template>
  <div class="mt-3">
    <a-skeleton active v-if="loading" />
    <div class="row justify-content-center" v-else>
      <div class="col-lg-8">
        <form method="post" @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Tên hiển thị</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                   v-model="formState.name">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" v-model="formState.email">
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" v-model="formState.phone_number">
          </div>
          <div class="mb-3">
            <label class="form-label">Nơi sinh</label>
            <input type="text" class="form-control" v-model="formState.live">
          </div>
          <div class="mb-3">
            <label class="form-label">Ngày sinh</label>
            <input type="date" class="form-control" v-model="formState.birthday">
          </div>
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" v-model="formState.address">
          </div>
          <button type="submit" class="btn btn-primary">Sửa</button>
          <NuxtLink to="/profiles">
            <button class="btn btn-primary">
              <a-icon type="arrow-left" />
              Trở về
            </button>
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


import Cookies from "js-cookie";
import {notification} from "ant-design-vue";
import axios from "axios";
import {URL_API} from "@/common/constants";

export default {
  name: "update",
  data() {
    return {
      formState: {
        name: "",
        email: "",
        phone_number: "",
        live: "",
        birthday: "",
        address: "",
      },
      loading: true
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
          this.formState = response.data.user;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    updateProfile() {
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
          this.$router.push({name: "profiles-id"});
        }
      }
      axios
        .post(`${URL_API}users/${id}`, this.formState)
        .then(response => {
          notification.success({
            message: "Thành công",
            description: "Cập nhật thông tin thành công"
          });
          this.loading = false;
          this.$router.push({name: "profiles-id"});
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
