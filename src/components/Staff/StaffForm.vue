<template>
    <Form @submit="submitStaff" :validation-schema="staffFormSchema">
        <!-- fullname, username, password, titile, address -->
        <div class="form-group">
            <label for="fullname">Họ và tên</label>
            <Field name="fullname" type="text" class="form-control" v-model="staffLocal.fullname" />
            <ErrorMessage name="fullname" class="error-feedback" />
        </div>
        <!-- Khi nào thêm thì mới hiển thị trường Tên đăng nhập -->
        <div v-if="isAdded" class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="staffLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <!-- Khi nào thêm thì mới hiển thị trường Mật khẩu -->
        <div v-if="isAdded" class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="staffLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <!-- Lấy từ danh sách đã tạo sẵn -->
        <div class="form-group">
            <label for="title">Chức vụ</label>
            <select name="title" class="form-control" v-model="staffLocal.title">
                <option v-for="(titl, index) in titles" :key="index" :value="titl">{{ titl }}</option>
            </select>
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="staffLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <!-- 3 cái button: Lưu, Xóa (chỉ có ở update), Thoát -->
        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100" @submit="submitStaff">Lưu</button>
            </div>
            <!-- Chỉ có ở update (khi tồn tại nhân viên mới được xóa) -->
            <div class="col-12 col-md-4 mb-2" v-if="staffLocal._id">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-danger w-100" type="button" @click="deleteStaff">Xóa</button>
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
    emits: ["submit:staff", "delete:staff"],
    props: {
        staff: { type: Object, required: true },
        isAdded: { required: true, },
    },
    data() {
        const titles = ["Quản lý lưu hành", "Nhân viên tham khảo", "Nhân viên phân loại và biên mục", "Nhân viên lưu trữ", "Nhân viên kỹ thuật"];
        let validation = {
            fullname: yup
                .string()
                .required("Họ và tên phải có giá trị.")
                .min(2, "Họ phải ít nhất 2 ký tự.")
                .max(50, "Họ có nhiều nhất 50 ký tự."),
            address: yup.string().required("Địa chỉ là bắt buộc.").max(100, "Địa chỉ tối đa 100 ký tự."),
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
        const staffFormSchema = yup.object().shape(validation);
        return {
            // Không hiệu chỉnh props, nên tạo biến cục bộ staffLocal để liên kết với các input trên form
            staffLocal: this.staff,
            staffFormSchema,
            // Danh sách các chức vụ được định nghĩa trước
            titles,
        };
    },
    // Thêm cái này để theo dõi, mỗi khi staff thay đổi thì thay đổi thông tin trong Form
    watch: {
        staff: {
            immediate: true,
            // Cập nhật staffLocal khi prop staff thay đổi
            handler(newStaff) {
                this.staffLocal = { ...newStaff };
            }
        }
    },
    methods: {
        // Lưu: dùng cho cả Add và Eidt
        submitStaff() {
            this.$emit("submit:staff", this.staffLocal);
        },
        // Xóa: dùng cho Eidt
        deleteStaff() {
            this.$emit("delete:staff", this.staffLocal._id);
        },
        // Thoát: dùng cho cả Add và Edit
        Cancel() {
            const reply = window.confirm('Chưa lưu thay đổi! Vẫn rời đi? ');
            if (!reply) {
                return false;
            } else this.$router.push({ name: "staff" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>