<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" method="post" @submit.prevent="forgot_password">
            <span class="login100-form-title p-b-32"> Quên mật khẩu </span>
            <span class="txt1 p-b-11"> Email </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Email không được bỏ trống"
            >
              <input class="input100" v-model="formState.email" name="email"/>
              <span class="focus-input100"></span>
            </div>
            <div class="flex-sb-m w-full p-b-48">
              <div>
                <NuxtLink :to="{name: 'accounts-signup'}" class="txt3"> Đăng nhập</NuxtLink>
              </div>
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
import {notification} from "ant-design-vue";
import {URL_API} from "@/common/constants";
import axios from "axios";

export default {
  name: "forgot_password",
  layout: "authentication",
  data() {
    return {
      formState: {
        email: "",
      },
    };
  },
  methods: {
    forgot_password() {
      axios
        .post(`${URL_API}auth/forgot_password`, this.formState)
        .then((response) => {
          notification.success({
            message: "Thành công",
            description: "Một email đã được gửi đến email của bạn",
          });
        })
        .catch((error) => {
          notification.error({
            message: "Lỗi",
            description: error.response.data.message,
          });
        });
    },
  },
}
</script>

<style scoped>

</style>
