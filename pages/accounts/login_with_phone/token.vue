<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" method="post" @submit.prevent="verify_token">
            <span class="login100-form-title p-b-32"> Nhập mã đã gửi qua SĐT </span>
            <span class="txt1 p-b-11"> Mã </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="Mã không được bỏ trống"
            >
              <input class="input100" v-model="formState.otp" name="email"/>
              <span class="focus-input100"></span>
            </div>
            <div class="flex-sb-m w-full p-b-48">
              <div>
                <NuxtLink :to="{name: 'accounts-signup'}" class="txt3"> Đăng nhập</NuxtLink>
              </div>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Xác nhận</button>
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
  name: "token",
  layout: "authentication",
  data() {
    return {
      formState: {
        otp: ""
      }
    };
  },
  methods: {
    verify_token() {
      axios
        .post(`${URL_API}auth/verify_otp`, {
          otp: this.formState.otp
        })
        .then(res => {
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công"
          });
          setCookie.setCookie("token", res.data.access_token);
          setCookie.setCookieObject(res.data.user, "user");
          this.$router.push("/");
        })
        .catch(error => {
          notification.error({
            message: "Lỗi",
            description: "Mã xác nhận không đúng"
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
