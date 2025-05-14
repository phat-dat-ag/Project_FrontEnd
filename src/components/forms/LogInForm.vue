<template>
    <div class="form-container">
        <h1 class="text-center">Đăng nhập <br>{{ formDes.roleTitle }}</h1>
        <Form :validation-schema="FormSchema" @submit="submitLoginInfor">
            <div class="form-group mb-3">
                <label for="account.username">Tên đăng nhập</label>
                <Field name="account.username" type="text" class="form-control" v-model="account.username"
                    placeholder="Nhập tên đăng nhập" />
                <ErrorMessage name="account.username" class="text-danger" />
            </div>

            <div class="form-group mb-3">
                <label for="account.password">Mật khẩu</label>
                <Field name="account.password" type="password" class="form-control" v-model="account.password"
                    placeholder="Nhập mật khẩu" />
                <ErrorMessage name="account.password" class="text-danger" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary w-100">Đăng nhập</button>
            </div>
            <div class="form-group">
                <!-- type = button: không cho phép submit form -->
                <button class="btn btn-danger w-100 mt-2" type="button" @click="changeRoleLogin">
                    {{ formDes.changeRoleLoginTitle }}
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

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
export default {
    components: {
        Form, Field, ErrorMessage,
    },
    props: {
        formDes: { type: Object, required: true },
    },
    data: () => {
        const FormSchema = yup.object().shape({
            account: yup.object().shape({
                username: yup.string().required("Phải nhập tên đăng nhập"),
                password: yup.string().required("Phải nhập mật khẩu"),
            }),
        });
        return {
            account: {
                username: "", password: "",
            },
            FormSchema,
        }
    },
    methods: {
        submitLoginInfor() {
            // Gửi account lên component cha để xử lý
            this.$emit("login:input", this.account);
        },
        async changeRoleLogin() {
            this.$router.push({ name: this.formDes.changeRoleLoginEntityName });
        },
    },
}
</script>

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