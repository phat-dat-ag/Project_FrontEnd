<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader
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
