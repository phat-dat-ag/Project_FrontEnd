<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="first_name">Họ</label>
            <Field name="first_name" type="text" class="form-control" v-model="userInformation.first_name"></Field>
            <ErrorMessage name="first_name" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="last_name">Tên</label>
            <Field name="last_name" type="text" class="form-control" v-model="userInformation.last_name"></Field>
            <ErrorMessage name="last_name" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="userRole">Vai trò người dùng</label>
            <Field as="select" name="userRole" class="form-control" v-model="userInformation.userRole">
                <option v-for="(account, id) in accountTypes" :key="id" :value="account.id">{{ account.title }}</option>
            </Field>
            <ErrorMessage name="userRole" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="userInformation.username"></Field>
            <ErrorMessage name="username" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userInformation.password"></Field>
            <ErrorMessage name="password" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <Field name="confirmPassword" type="password" class="form-control"
                v-model="userInformation.confirmPassword"></Field>
            <ErrorMessage name="confirmPassword" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100">Đăng ký</button>
            </div>
            <div class="col-12 col-md-4 mb-2">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-secondary w-100" type="button" @click="cancel">Thoát</button>
            </div>
        </div>
    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup"
import "@/usernameValidation"
import { accountTypes } from '@/constants/registerform.constant';
export default {
    components: { Form, Field, ErrorMessage, },
    props: {
        user: { type: Object, required: true },
    },
    data() {
        let validation = {
            first_name: yup
                .string()
                .required("Phải nhập Họ")
                .min(2, "Họ phải có ít nhất 2 ký tự")
                .max(10, "Họ có tối đa 10 ký tự"),
            last_name: yup
                .string()
                .required("Phải nhập tên")
                .min(2, "Tên phải có ý nhất 2 ký tự")
                .max(15, "Tên có tối đa 15 ký tự"),
            userRole: yup
                .string()
                .required("Vai trò người dùng là bắt buộc"),
            username: yup
                .string()
                .required("Vui lòng nhập Tên đăng nhập")
                .min(8, "Tên đăng nhập ít nhất 8 ký tự")
                .max(15, "Tên đăng nhập không quá 15 ký tự")
                .checkUsername(),
            password: yup
                .string()
                .required("Vui lòng nhập Mật khẩu")
                .min(8, "Mật khẩu ít nhất 8 ký tự")
                .max(20, "Mật khẩu không quá 20 ký tự"),
            confirmPassword: yup
                .string()
                .required("Vui lòng xác nhận mật khẩu")
                .test("double-check-password", "Mật khẩu xác thực không khớp", function (value) {
                    const { password } = this.parent;
                    // Một trong hai không có giá trị thì bỏ qua
                    if (!password || !value) return true;
                    return password === value;
                }),
        }
        const userFormSchema = yup.object().shape(validation);
        return {
            accountTypes: [],
            userInformation: this.user,
            userFormSchema,
        }
    },
    methods: {
        submitUser() {
            // Trong Staff chỉ chấp nhận fullname
            this.userInformation.fullname = this.userInformation.first_name + " " + this.userInformation.last_name;
            this.$emit("submit:user-registration", this.userInformation);
        },
        cancel() {
            this.$emit("cancel:register");
        },
    },
    created() {
        this.accountTypes = accountTypes;
    }
}
</script>

<style scoped>
@import "@/assets/form.css";
</style>