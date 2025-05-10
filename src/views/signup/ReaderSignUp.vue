<template>
    <div id="register-container">
        <h4>Đăng ký Tài khoản mới</h4>
        <RegisterForm @submit:user-registration="handleRegistration" @cancel:register="handleCancelRegister"
            :user="user">
        </RegisterForm>
    </div>
</template>

<script>
import RegisterForm from '@/components/forms/RegisterForm.vue';
import adminService from '@/services/admin.service';
import staffService from '@/services/staff.service';
import readerService from '@/services/reader.service';
import { ADMIN, USER_READER, USER_STAFF } from '@/constants/registerform.constant';
export default {
    components: { RegisterForm },
    emits: ["submit:user-registration"],
    data() {
        return {
            selectedService: null,
            successfulMessage: "",
            user: {
                first_name: "", last_name: "", username: "", password: "", confirmPassword: "",
                birthday: null, sex: "", address: "", phone: "",
            },
        }
    },
    methods: {
        checkUserRole(userRole) {
            switch (userRole) {
                case ADMIN:
                    this.selectedService = adminService;
                    this.successfulMessage = "Đăng ký tài khoản Quản trị viên thành công!";
                    break;
                case USER_STAFF:
                    this.selectedService = staffService;
                    this.successfulMessage = "Đăng ký tài khoản Nhân viên thành công!";
                    break;
                case USER_READER:
                    this.selectedService = readerService;
                    this.successfulMessage = "Đăng ký tài khoản Độc giả thành công!";
                    break;
                default:
                    confirm("Đã xảy ra lỗi khi đăng ký tài khoản!");
            }
        },
        async handleRegistration(userInformation) {
            this.checkUserRole(userInformation.userRole);
            try {
                await this.selectedService.create(userInformation);
            } catch (error) {
                console.log(error);
                confirm("Đã có lỗi khi đăng ký tài khoản");
            }
            confirm(this.successfulMessage);
            this.$router.push({ name: "loginUser" });
        },
        handleCancelRegister() {
            this.$router.push({ name: "loginUser" });
        }
    },
}
</script>

<style scoped>
#register-container {
    max-width: 400px;
    margin: 40px auto 0;
}
</style>