<script>
import adminService from "@/services/admin.service";
import { useUserRoleStore } from "@/stores/user_role_stores";
import { ADMIN } from "@/constants/registerform.constant";
import LogInForm from "@/components/forms/LogInForm.vue";
import { adminLoginDescription } from "@/constants/loginform.constants";

export default {
    components: {
        LogInForm,
    },
    data() {
        return {
            adminDes: null,
        };
    },
    methods: {
        async login(input) {
            let result = false;
            // Đăng nhập thành công => {success,  token}
            // Đăng nhập thất bại => false

            // Kiểm tra coi phải là admin không
            result = await adminService.login(input);

            // Lưu lên localStorage xem ai đang đăng nhập
            const userRole = useUserRoleStore();

            // Khi đã đăng nhập thành công
            if (result && result.token) {
                // lưu token lên localStorage
                localStorage.setItem("token", result.token);
                const token = localStorage.getItem("token");
                if (token) {
                    userRole.setUserRole(ADMIN);
                    this.$router.push({ name: "interfaceAdmin" });
                }
            }
            // Khi đăng nhập đã thất bại
            else
                confirm("Đăng nhập Admin thất bại rồi cưng!");
        },
    },
    created() {
        this.adminDes = adminLoginDescription;
    },
};
</script>

<template>
    <LogInForm :formDes="adminDes" @login:input="login"></LogInForm>
</template>