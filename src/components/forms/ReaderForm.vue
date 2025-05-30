<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <!-- address, birthday, favorite, first_name, last_name, phone, sex -->
        <div class="form-group">
            <label for="first_name">Họ</label>
            <Field name="first_name" type="text" class="form-control" v-model="readerLocal.first_name" />
            <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="last_name">Tên</label>
            <Field name="last_name" type="text" class="form-control" v-model="readerLocal.last_name" />
            <ErrorMessage name="last_name" class="error-feedback" />
        </div>
        <!-- Nếu là Thêm thì mới hiển thị -->
        <div v-if="isAdded" class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="readerLocal.username" />
            <ErrorMessage name="username" class="error-feedback"></ErrorMessage>
        </div>
        <!-- Nếu là Thêm thì mới hiển thị -->
        <div v-if="isAdded" class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="readerLocal.password" />
            <ErrorMessage name="password" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="readerLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="readerLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label>Giới tính</label>
            <label>
                <Field type="radio" name="sex" value="Nam" v-model="readerLocal.sex" />
                Nam
            </label>
            <label>
                <Field type="radio" name="sex" value="Nữ" v-model="readerLocal.sex" />
                Nữ
            </label>
            <ErrorMessage name="sex" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="birthday">Sinh nhật</label>
            <Field name="birthday" type="date" class="form-control" v-model="readerLocal.birthday" />
            <ErrorMessage name="birthday" class="error-feedback" />
        </div>
        <!-- 3 cái button: Lưu, Xóa (chỉ có ở update), Thoát -->
        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100" @submit="submitReader">Lưu</button>
            </div>
            <!-- Chỉ có ở update (khi tồn tại độc giả mới được xóa) -->
            <div class="col-12 col-md-4 mb-2" v-if="readerLocal._id">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-danger w-100" type="button" @click="deleteReader">Xóa</button>
            </div>
            <div class="col-12 col-md-4 mb-2">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-secondary w-100" type="button" @click="Cancel">Thoát</button>
            </div>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import "@/usernameValidation";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:reader", "delete:reader"],
    props: {
        reader: { type: Object, required: true },
        // Kiểm soát để hiển thị password và username
        isAdded: { required: true, },
    },
    data() {
        let validation = {
            first_name: yup
                .string()
                .required("Họ phải có giá trị.")
                .min(2, "Họ phải ít nhất 2 ký tự.")
                .max(50, "Họ có nhiều nhất 50 ký tự."),
            last_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().required("Địa chỉ là bắt buộc.").max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            sex: yup
                .string()
                .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ.")
                .required("Giới tính là bắt buộc."),
            birthday: yup
                .date()
                .required("Ngày sinh là bắt buộc."),
        };
        // Chỉ xác thực khi Thêm, vì không cho Admin cập nhật username và password
        if (this.isAdded) {
            validation = {
                ...validation,
                username: yup
                    .string()
                    .required("Tên đăng nhập phải có giá trị.")
                    .min(8, "Tên đăng nhập phải ít nhất 8 ký tự.")
                    .max(30, "Tên đăng nhập có nhiều nhất 30 ký tự.")
                    .checkUsername(),
                password: yup
                    .string()
                    .required("Mật khẩu phải có giá trị.")
                    .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
                    .max(20, "Mật khẩu có nhiều nhất 20 ký tự."),
            }
        }
        const readerFormSchema = yup.object().shape(validation);
        return {
            // Không hiệu chỉnh props, nên tạo biến cục bộ readerLocal để liên kết với các input trên form
            readerLocal: this.reader,
            readerFormSchema,
        };
    },
    // Thêm cái này để theo dõi, mỗi khi reader thay đổi thì thay đổi thông tin trong Form
    watch: {
        reader: {
            immediate: true,
            // Cập nhật readerLocal khi prop reader thay đổi
            handler(newReader) {
                this.readerLocal = { ...newReader };
            }
        }
    },
    methods: {
        // Lưu: dùng cho cả Add và Eidt
        submitReader() {
            this.$emit("submit:reader", this.readerLocal);
        },
        // Xóa: dùng cho Eidt
        deleteReader() {
            this.$emit("delete:reader", this.readerLocal._id);
        },
        // Thoát: dùng cho cả Add và Edit
        Cancel() {
            const reply = window.confirm('Chưa lưu thay đổi! Vẫn rời đi? ');
            if (!reply) {
                return false;
            } else this.$router.push({ name: "reader" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>