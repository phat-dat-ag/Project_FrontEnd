<template>
    <h1>Tài khoản của tôi</h1>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Thông tin chi tiết
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="(keyObj) in myInfor" :key="keyObj" class="list-group-item">
                {{ keyObj.label }}: {{ keyObj.value }}
            </li>
        </ul>
        <button class="btn btn-danger m-2" @click="logout">Đăng xuất</button>
    </div>
</template>

<script>
import staffService from '@/services/staff.service';

export default {
    data() {
        return {
            myInfor: {},
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: "loginUser" });
        },
        async getAccountInfor() {
            let newInfor = {
                fullname: { label: "Họ và tên", },
                username: { label: "Tên đăng nhập", },
                title: { label: "Chức vụ" },
                address: { label: "Địa chỉ", },
            }
            const token = localStorage.getItem("token");
            const inforDB = await staffService.getProfile(token);
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: inforDB[key] };
            }
            this.myInfor = newInfor;
        }
    },
    beforeMount() {
        // Lấy thông tin người dùng
        this.getAccountInfor();
    }
}
</script>
