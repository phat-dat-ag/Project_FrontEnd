<script>
import AppHeader from './components/AppHeader.vue';
import ReaderService from './services/reader.service';
import Home from './views/Home.vue';

export default {
  components: {
    AppHeader, Home
  },
  // data() {
  //   return {
  //     readers: [],  // Mảng lưu danh sách các readers
  //   };
  // },
  // async created() {
  //   try {
  //     // Gọi API để lấy danh sách các reader khi component được tạo
  //     const response = await ReaderService.getAll();
  //     this.readers = response;  // Gán dữ liệu vào mảng readers
  //     console.log(this.readers);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu readers:", error);
  //   }
  // }
}
</script>

<template>
  <AppHeader></AppHeader>
  <!-- Đón các Component khi chuyển hướng của AppHeader -->
  <router-view></router-view>
  <!-- <h1>Hello VueJS</h1>
  <div class="page">
    <ul>
      <li v-for="reader in readers" :key="reader._id">
        {{ reader.first_name }} - {{ reader.last_name }}
      </li>
    </ul>
  </div> -->
</template>

<style>
.page {
  max-width: 1024px;
  margin: auto;
}
</style>
