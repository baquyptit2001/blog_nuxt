<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="register">
            <span class="login100-form-title p-b-32"> Đăng ký </span>
            <span class="txt1 p-b-11"> Email </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Email không được bỏ trống"
            >
              <input class="input100" type="text" name="email" v-model="formState.email"/>
              <span class="focus-input100"></span>
            </div>
            <span class="txt1 p-b-11"> Tên hiển thị </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Tên không được bỏ trống"
            >
              <input class="input100" type="text" name="name" v-model="formState.name"/>
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
            <span class="txt1 p-b-11"> Nhập lại mật khẩu </span>
            <div
              class="wrap-input100 validate-input m-b-12"
              data-validate="Vui lòng nhập lại mật khẩu"
            >
              <span class="btn-show-pass">
                <i class="fa fa-eye"></i>
              </span>
              <input class="input100" type="password" name="pass" v-model="formState.password_confirmation"/>
              <span class="focus-input100"></span>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Đăng ký</button>
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
import axios from "axios";
import {URL_API} from "@/common/constants";

export default {
  name: "signup",
  layout: "authentication",
  data() {
    return {
      formState: {
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
      },
    };
  },
  methods: {
    register() {
      // notification['error']({
      //   message: 'Notification Title',
      //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      // });
      axios
        .post(URL_API + "auth/register", this.formState)
        .then(response => {
          console.log(response);
          notification["success"]({
            message: "Đăng ký thành công",
            description: "Bạn có thể đăng nhập ngay",
          });
          this.$router.push("/accounts/login");
        })
        .catch(error => {
          notification["error"]({
            message: "Đăng ký thất bại",
            description: error.response.data.errors,
          });
        });
    }
  }
};
</script>
