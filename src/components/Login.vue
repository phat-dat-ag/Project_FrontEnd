<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";

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
        async ReaderLogin() {
            const input = { username: this.username, password: this.password };
            // Vào CSDL lấy reader có username được nhập ra
            const result = await readerService.login(input);
            let message = { type: "reader" };
            if (result) {
                console.log("Đăng nhập thành công cho tài khoản Độc giả: " + input.username);
                this.$emit("update:modelValue", { ...message, status: true });
                return true;
            }
            else {
                console.log("Đăng nhập thất bại cho tài khoản Độc giả: " + input.username);
                this.$emit("update:modelValue", { ...message, status: false });
                return false;
            }
        },
        async StaffLogin() {
            const input = { username: this.username, password: this.password };
            // Vào CSDL lấy staff có username được nhập ra
            const result = await staffService.login(input);
            let message = { type: "staff" };
            if (result) {
                console.log("Đăng nhập thành công cho tài khoản Nhân viên: " + input.username);
                this.$emit("update:modelValue", { ...message, status: true });
                return true;
            }
            else {
                console.log("Đăng nhập thất bại cho tài khoản Nhân viên: " + input.username);
                this.$emit("update:modelValue", { ...message, status: false });
                return false;
            }
        },
        async requestLogin() {
            // Kiểm tra có phải là Reader
            let check = await this.ReaderLogin();
            // Kiểm tra có phải là Staff
            if (!check)
                check = await this.StaffLogin();
            // Đăng nhập thất bại hoàn toàn
            if (!check)
                confirm("Đăng nhập thất bại rồi cưng!")
        },
        async submitForm() {
            await this.requestLogin();
        }
    },
};
</script>

<template>
    <div class="form-container">
        <h1 class="text-center">Đăng nhập</h1>
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
