<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Nhân viên</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{}" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{}" class="nav-link">
                            Sách đang mượn
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
    <MyAccount :myInfor="accountInfor"></MyAccount>
</template>
<script>
import staffService from '@/services/staff.service';
import MyAccount from './MyAccount.vue';
export default {
    components: {
        MyAccount,
    },
    data() {
        return {
            accountInfor: {},
        }
    },
    methods: {
        async getAccountInfor() {
            let newInfor = {
                fullname: { label: "Họ và tên", },
                username: { label: "Tên đăng nhập", },
                title: { label: "Chức vụ" },
                address: { label: "Địa chỉ", },
            }
            const token = localStorage.getItem("token");
            const inforDB = await staffService.getProfile(token);
            // Bỏ cái trường ID ra
            const { _id, ...infor } = inforDB;
            for (let key in infor) {
                newInfor[key] = { ...newInfor[key], value: infor[key] };
            }
            this.accountInfor = newInfor;
        }
    },
    beforeMount() {
        // Lấy thông tin người dùng
        this.getAccountInfor();
    }
}
</script>