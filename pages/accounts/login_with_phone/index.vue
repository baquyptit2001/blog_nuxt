<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" method="post" @submit.prevent="send_otp">
            <span class="login100-form-title p-b-32"> Đăng nhập bằng số điện thoại </span>
            <span class="txt1 p-b-11"> SĐT </span>
            <div
              class="wrap-input100 validate-input m-b-36"
              data-validate="SĐT không được bỏ trống"
            >
              <input class="input100" v-model="formState.phone_number" name="email"/>
              <span class="focus-input100"></span>
            </div>
            <div class="flex-sb-m w-full p-b-48">
              <div>
                <NuxtLink :to="{name: 'accounts-signup'}" class="txt3"> Đăng nhập</NuxtLink>
              </div>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Gửi mã</button>
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
import {notification} from "ant-design-vue";
import {URL_API} from "@/common/constants";

export default {
  name: "login_with_phone",
  layout: "authentication",
  data() {
    return {
      formState: {
        phone_number: "",
      },
    };
  },
  methods: {
    send_otp() {
      axios
        .post(`${URL_API}auth/send_sms`, this.formState)
        .then((response) => {
          notification.success({
            message: "Thành công",
            description: response.data.message,
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
