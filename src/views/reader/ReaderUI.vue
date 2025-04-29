<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Độc giả</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'readerHome' }" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'borrowingBook' }" class="nav-link">
                            Lịch sử mượn sách
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'readerAccount' }" class="nav-link">
                            Trang cá nhân
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>
<script>
import readerService from '@/services/reader.service';

export default {
    data() {
        return {
            accountInfor: {},
        }
    },
    methods: {
        async getAccountInfor() {
            let newInfor = {
                first_name: { label: "Họ", },
                last_name: { label: "Tên", },
                username: { label: "Tên đăng nhập", },
                birthday: { label: "Sinh nhật", },
                sex: { label: "Giới tính", },
                address: { label: "Địa chỉ", },
                phone: { label: "Số điện thoại", },

            }
            const token = localStorage.getItem("token");
            const inforDB = await readerService.getProfile(token);
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