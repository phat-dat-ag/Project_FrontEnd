<template>
    <h1>Đây là giao diện người dùng Độc giả {{ userInfor.username }} nè </h1>
    <button @click="logout">Đăng xuất</button>
</template>
<script>
export default {
    emits: ["logout"],
    props: {
        userInfor: { type: Object, required: true },
    },
    methods: {
        logout() {
            this.$emit('logout'); // Emit the logout event to the parent
        }
    }
}
</script>