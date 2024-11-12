<template>
    <h1>Tài khoản của tôi</h1>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Thông tin chi tiết
        </div>
        <!-- address, birthday, favorite, first_name, last_name, phone, sex -->
        <ul class="list-group list-group-flush">
            <li v-for="(keyObj) in myInfor" :key="keyObj" class="list-group-item">
                {{ keyObj.label }}: {{ keyObj.value }}
            </li>
        </ul>
        <button class="btn btn-danger m-2" @click="logout">Đăng xuất</button>
    </div>
    <button @click="show">Show</button>
</template>

<script>
export default {
    props: {
        myInfor: { type: Object, required: true, }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: "loginUser" });
        },
    },
}
</script>
