<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" method="post" @submit.prevent="login">
            <span class="login100-form-title p-b-32"> Đăng nhập </span>
            <span class="txt1 p-b-11"> Email </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Email không được bỏ trống"
            >
              <input class="input100" v-model="formState.email" name="email"/>
              <span class="focus-input100"></span>
            </div>
            <span class="txt1 p-b-11"> Mật khẩu </span>
            <div
              class="wrap-input100 validate-input m-b-12"
              data-validate="Mật khẩu không được bỏ trống"
            >
              <span class="btn-show-pass">
                <i class="fa fa-eye"></i>
              </span>
              <input class="input100" type="password" name="pass" v-model="formState.password"/>
              <span class="focus-input100"></span>
            </div>
            <div class="flex-sb-m w-full p-b-48">
              <div>
                <a href="#" class="txt3"> Quên mật khẩu? </a>
              </div>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div id="dropDownSelect1"></div>
  </div>
</template>

<script>

import axios from "axios";
import {URL_API} from "@/common/constants";
import {notification} from "ant-design-vue";
import setCookie from "@/helper/setCookie";

export default {
  name: "login",
  layout: "authentication",
  data() {
    return {
      formState: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${URL_API}auth/login`, this.formState)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res.data);
            setCookie.setCookie("token", res.data.access_token);
            setCookie.setCookieObject(res.data.user, "user");
            this.$router.push("/");
            notification.success({
              message: "Đăng nhập thành công",
              description: "Bạn sẽ được chuyển đến trang chủ",
            });
          } else {
            notification.error({
              message: "Đăng nhập thất bại",
              description: res.data.message,
            });
          }
        })
        .catch((err) => {
          // notification.error({
          //   message: "Đăng nhập thất bại",
          //   description: err.response.data.errors,
          // });
        });
    }
  },
};
</script>
