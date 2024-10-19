<script>
import AppHeader from './components/AppHeader.vue';
import ReaderService from './services/reader.service';
import Home from './views/Home.vue';

export default {
  components: {
    AppHeader, Home
  },
}
</script>

<template>
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
