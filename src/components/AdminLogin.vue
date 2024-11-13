<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import adminService from "@/services/admin.service";

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
            result = await adminService.login(input);

            // Khi đã đăng nhập thành công
            if (result && result.token) {
                // lưu token lên localStorage
                localStorage.setItem("token", result.token);
                const token = localStorage.getItem("token");
                if (token) {
                    this.$router.push({ name: "interfaceAdmin" });
                }
            }
            // Khi đăng nhập đã thất bại
            else
                confirm("Đăng nhập Admin thất bại rồi cưng!");
        },
        async changeRoleLogin() {
            this.$router.push({ name: "loginUser" });
        }
    },
};
</script>

<template>
    <div class="form-container">
        <h1 class="text-center">Đăng nhập <br>Quản trị viên</h1>
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
                    Đăng nhập với vai trò Người dùng
                </button>
            </div>
        </Form>
    </div>
</template>

<style scoped>
@import "../assets/form.css";

.form-container {
    margin: 100px auto;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
