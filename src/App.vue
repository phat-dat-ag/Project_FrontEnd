<script>
import AppHeader from './components/AppHeader.vue';
import ReaderInterface from './components/ReaderInterface.vue';
import StaffInterface from './components/StaffInterface.vue';
import Login from './components/Login.vue';

export default {
  components: {
    AppHeader, ReaderInterface, StaffInterface, Login,
  },
  data() {
    return {
      // Nó đầy đủ sẽ có type, status, userInfor, token,
      // nếu đăng nhập không thành công thì là type=staff, status=false 
      isLogin: {},
      userInfor: {},
    };
  },
  computed: {
    // Xác định giao diện cần hiển thị
    userInterface() {
      if (this.isLogin.status) {
        // console.log(this.isLogin.userInfor);
        this.userInfor = this.isLogin.userInfor;
        return this.isLogin.type === "reader" ? "ReaderInterface" : "StaffInterface";
      }
      // có sự khác biệt với false, null là không có gì cả
      return null;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.isLogin = {};
    }
  },
}
</script>

<template>
  <!-- Không đăng nhập thành công thì hiển thị Đăng nhập -->
  <!-- <Login v-if="!isLogin.status" v-model:modelValue="isLogin"></Login> -->
  <!-- Hiển thị người dùng ứng với tài khoản của họ -->
  <!-- <component v-if="isLogin.status" :is="userInterface" :userInfor="userInfor" @logout="logout"></component> -->

  <AppHeader></AppHeader>
  <!-- Đón các Component khi chuyển hướng của AppHeader -->
  <router-view></router-view>
</template>

<style>
.page {
  max-width: 1024px;
  margin: auto;
}
</style>
