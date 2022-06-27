<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" method="post" @submit.prevent="reset_password">
            <span class="login100-form-title p-b-32"> Thay đổi mật khẩu </span>
            <span class="txt1 p-b-11"> Mật khẩu </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Mật khẩu không được bỏ trống"
            >
              <input class="input100" v-model="formState.password" type="password"/>
              <span class="focus-input100"></span>
            </div>
            <span class="txt1 p-b-11"> Email </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Email không được bỏ trống"
            >
              <input class="input100" v-model="formState.password_confirmation" type="password"/>
              <span class="focus-input100"></span>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div id="dropDownSelect1"></div>
  </div>
</template>

<script>

import axios from 'axios';
import {URL_API} from "@/common/constants";
import {notification} from "ant-design-vue";

export default {
  name: "reset_password",
  layout: "authentication",
  data() {
    return {
      formState: {
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    reset_password() {
      axios
        .post(`${URL_API}auth/reset_password/${this.$route.params.token}`, this.formState)
        .then((response) => {
          this.$router.push({name: "accounts-login"});
          notification.success({
            message: "Thành công",
            description: "Mật khẩu đã được đổi, bạn có thể đăng nhập ngay",
          });
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Lỗi",
            description: error.response.data.message,
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
