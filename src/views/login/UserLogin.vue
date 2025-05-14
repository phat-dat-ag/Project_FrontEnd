<script>
import { jwtDecode } from "jwt-decode";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import adminService from "@/services/admin.service";
import { useUserRoleStore } from "@/stores/user_role_stores";
import { USER_READER, USER_STAFF } from "@/constants/registerform.constant";
import LogInForm from "@/components/forms/LogInForm.vue";
import { userLoginDescription } from "@/constants/loginform.constants";

export default {
    components: {
        LogInForm,
    },
    data() {
        return {
            userDes: null,
        };
    },
    methods: {
        async login(input) {
            let result = false;
            // Đăng nhập thành công => {success,  token}
            // Đăng nhập thất bại => false

            // Kiểm tra coi phải là reader không
            result = await readerService.login(input);
            // Không phải reader => kiểm tra phải là staff không
            if (!result)
                result = await staffService.login(input);

            // Khi đã đăng nhập thành công: là reader hoặc staff
            if (result && result.token) {
                // lưu token lên localStorage
                localStorage.setItem("token", result.token);
                const token = localStorage.getItem("token");

                // Lưu trữ ai đăng nhập lên localStorage
                const userRole = useUserRoleStore();

                if (token) {
                    let userReader = await readerService.getProfile(token);
                    // Là Reader
                    if (userReader) {
                        userRole.setUserRole(USER_READER);
                        this.$router.push({ name: "interfaceReader" });
                    } else {
                        let userStaff = await staffService.getProfile(token);
                        // Là Staff
                        if (userStaff) {
                            userRole.setUserRole(USER_STAFF);
                            this.$router.push({ name: "interfaceStaff" });
                        }
                    }
                }
            }
            // Khi đăng nhập đã thất bại cho cả reader và staff
            else
                confirm("Đăng nhập thất bại rồi cưng!");
        },
        async checkPreLogin() {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("token");
                } else {
                    let account = await adminService.getProfile(token);
                    // Nếu không phải admin
                    if (!account) {
                        account = await readerService.getProfile(token);
                        // Nếu không phải là reader
                        if (!account) {
                            account = await staffService.getProfile(token);
                            // Nếu không phải là staff thì thôi => Trước đó đã đăng xuất tài khoản hết rồi
                            if (!account) {
                            } else {
                                // Là staff
                                this.$router.push({ name: "interfaceStaff" });
                            }
                        } else {
                            // Là reader
                            this.$router.push({ name: "interfaceReader" });
                        }
                    } else {
                        // Là admin
                        this.$router.push({ name: "interfaceAdmin" });
                    }
                }
            }
        },
    },
    // LoginUser là trang gốc, luôn được tải đầu tiên
    // Nên trước khi tải trang phải kiểm tra coi còn phiên đăng nhập không
    beforeMount() {
        this.checkPreLogin();
    },
    created() {
        this.userDes = userLoginDescription;
    },
};
</script>

<template>
    <LogInForm :formDes="userDes" @login:input="login"></LogInForm>
</template>