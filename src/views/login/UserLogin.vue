<script>
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import adminService from "@/services/admin.service";
import { useUserRoleStore } from "@/stores/user_role_stores";
import { USER_READER, USER_STAFF } from "@/constants/registerform.constant";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const FormSchema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập không được để trống"),
            password: yup.string().required("Mật khẩu không được để trống"),
        })
        return {
            username: "",
            password: "",
            FormSchema,
        };
    },
    methods: {
        async login() {
            // Lấy thông tin đăng nhập
            const input = { username: this.username, password: this.password };

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
        changeRoleLogin() {
            this.$router.push({ name: "loginAdmin" });
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
};
</script>

<template>
    <div class="form-container">
        <h1 class="text-center">Đăng nhập <br>Người dùng</h1>
        <Form :validation-schema="FormSchema" @submit="login">
            <div class="form-group mb-3">
                <label for="username">Tên đăng nhập</label>
                <Field name="username" type="text" class="form-control" v-model="username"
                    placeholder="Nhập tên đăng nhập" />
                <ErrorMessage name="username" class="text-danger" />
            </div>

            <div class="form-group mb-3">
                <label for="password">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" v-model="password"
                    placeholder="Nhập mật khẩu" />
                <ErrorMessage name="password" class="text-danger" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary w-100">Đăng nhập</button>
            </div>
            <div class="form-group">
                <!-- type = button: không cho phép submit form -->
                <button class="btn btn-danger w-100 mt-2" type="button" @click="changeRoleLogin">
                    Đăng nhập với vai trò Quản trị viên
                </button>
            </div>
            <div class="form-group sign-up-option">
                Chưa có tài khoản?
                <router-link :to="{ name: 'reader.signup' }">
                    Đăng ký tại đây!
                </router-link>
            </div>
        </Form>
    </div>
</template>

<style scoped>
@import "@/assets/form.css";

.form-container {
    margin: 100px auto;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sign-up-option {
    text-align: center;
}
</style>
