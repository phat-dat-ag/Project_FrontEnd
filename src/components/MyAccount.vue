<template>
    <div id="account-container">
        <h2>Tài khoản của tôi</h2>
        <Card v-if="isReady" :Infor="accountInfor" :title="cardTitle"></Card>
        <button class="btn btn-danger" @click="logout">Đăng xuất</button>
    </div>
</template>

<script>
import { useUserRoleStore } from '@/stores/user_role_stores';
import Card from './Card.vue';
import { staffInfor, readerInfor } from '@/constants/inforcard.constant';
import { ADMIN, USER_READER, USER_STAFF } from '@/constants/registerform.constant';
import staffService from '@/services/staff.service';
import readerService from '@/services/reader.service';
export default {
    components: { Card, },
    data: () => ({
        accountInfor: {},
        cardTitle: "",
        // Đợi lấy data cần thiết xong mới render Card
        isReady: false,
    }),
    methods: {
        // Chuyển data từ csdl sang dạng phù hợp để hiển thị trong Card
        changeToInfor(initalInfor, modelInfor) {
            // Sao chép sâu: Vì bên trong có Object nữa
            this.accountInfor = JSON.parse(JSON.stringify(modelInfor));
            for (let key in this.accountInfor)
                this.accountInfor[key].value = initalInfor[key];
        },
        // Chuẩn bị data
        async getAccountInfor() {
            const userRole = useUserRoleStore();
            const token = localStorage.getItem("token");
            // Khi không có token => không có ai đăng nhập cả
            if (!token) return;
            let initalInfor = {};
            switch (userRole.getUserRole) {
                case ADMIN:
                    confirm("Hiện chưa hỗ trợ chức năng này cho admin");
                    break;
                case USER_STAFF:
                    initalInfor = await staffService.getProfile(token);
                    this.changeToInfor(initalInfor, staffInfor);
                    this.cardTitle = "Thông tin Nhân viên";
                    break;
                case USER_READER:
                    initalInfor = await readerService.getProfile(token);
                    this.changeToInfor(initalInfor, readerInfor);
                    this.cardTitle = "Thông tin Độc giả";
                    break;
                default:
                    confirm("Xảy ra lỗi khi lấy thông tin đăng nhập");
                    break;
            }
            // Thông báo đã đủ 2 dữ liệu để truyền props cho Card
            this.isReady = true;
        },
        logout() {
            // Xóa hết các key: value trên localStorage
            localStorage.clear();
            this.$router.push({ name: "loginUser" });
        }
    },
    created() {
        this.getAccountInfor();
    }
}
</script>

<style scoped>
#account-container {
    margin-left: 40px;
    max-width: 50%;
}
</style>