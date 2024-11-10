<script>
import AppHeader from './components/AppHeader.vue';
import ReaderInterface from './components/ReaderInterface.vue';
import StaffInterface from './components/StaffInterface.vue';
import Login from './components/Login.vue';
import LoginAdmin from './components/LoginAdmin.vue';

export default {
  components: {
    AppHeader, ReaderInterface, StaffInterface, Login, LoginAdmin
  },
  data() {
    return {
      // Nó đầy đủ sẽ có type, status, userInfor, token,
      // nếu đăng nhập không thành công thì là type=staff, status=false 
      isLogin: {
        // role: user (1) or admin (-1)
        role: 1,
        status: false,
      },
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
      this.isLogin = {
        role: 1,
        status: false,
      };
    }
  },
}
</script>

<template>
  <!-- Không đăng nhập thành công thì hiển thị Đăng nhập -->
  <Login v-if="!isLogin.status && this.isLogin.role === 1" v-model:modelValue="isLogin"></Login>
  <LoginAdmin v-if="!isLogin.status && this.isLogin.role === -1" v-model:modelValue="isLogin"></LoginAdmin>

  <!-- Hiển thị người dùng ứng với tài khoản của họ -->
  <component v-if="isLogin.role === 1 && isLogin.status" :is="userInterface" :userInfor="userInfor" @logout="logout">
  </component>

  <!-- Hiển thị nếu đó là Admin -->
  <AppHeader v-if="isLogin.status && this.isLogin.role === -1" :userInfor="isLogin.userInfor" @logout="logout">
  </AppHeader>

</template>

<style>
.page {
  max-width: 1024px;
  margin: auto;
}
</style>
