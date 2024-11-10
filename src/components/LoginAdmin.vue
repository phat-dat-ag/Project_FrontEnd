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
    props: {
        modelValue: { type: Object, required: true },
    },
    emits: ["update:modelValue"],
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
            const input = { username: this.username, password: this.password };
            let result = await adminService.login(input);
            // result trả về {success,  token} khi thành công
            // nếu thất bại thì result là false từ BE trả về, không phải Object
            console.log(result);
            // kiểm đăng nhập thành công cùng với token được trả về
            if (result && result.token) {
                console.log(`Đăng nhập admin thành công cho: ` + input.username);
                // lưu token lên localStorage
                localStorage.setItem("token", result.token);
                let userInfor = await adminService.getProfile(result.token);
                this.$emit("update:modelValue", { ...this.modelValue, status: true, type: "admin", userInfor, token: result.token });
                return true;
            }
            else {
                console.log(`Đăng nhập thất bại cho admin: ` + input.username);
                this.$emit("update:modelValue", { ...this.modelValue, type: "admin" });
                return false;
            }
        },
        async requestLoginAdmin() {
            // Đăng nhập Admin
            let check = await this.login();
            if (!check)
                confirm("Đăng nhập Admin thất bại rồi cưng!")
        },
        async submitForm() {
            await this.requestLoginAdmin();
        },
        async changeRoleLogin() {
            this.$emit("update:modelValue", { role: this.modelValue.role * (-1) })
        }
    },
};
</script>

<template>
    <div class="form-container">
        <h1 class="text-center">Đăng nhập <br>{{ (modelValue.role > 0) ? "Người dùng" : "Admin" }}</h1>
        <Form :validation-schema="FormSchema" @submit="submitForm">
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
                <button class="btn btn-danger w-100 mt-2" type="button" @click="changeRoleLogin">Đăng nhập với vai trò
                    {{ !(modelValue.role > 0) ? "Người dùng" : "Admin" }}
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
