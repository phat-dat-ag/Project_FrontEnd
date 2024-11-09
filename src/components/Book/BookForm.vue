<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <!-- name, price, quantity, publication_year, author -->
        <div class="form-group">
            <label for="name">Tên sách</label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="img">Tải ảnh sách</label>
            <!-- Chỉ cho phép tải ảnh -->
            <Field name="img" type="file" accept="image/*" @change="handleImageChange" class="form-control" />
            <ErrorMessage name="img" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá sách (VND)</label>
            <Field name="price" type="number" class="form-control" v-model="bookLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field name="quantity" type="number" class="form-control" v-model="bookLocal.quantity" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publication_year">Năm xuất bản</label>
            <Field name="publication_year" type="number" class="form-control" v-model="bookLocal.publication_year" />
            <ErrorMessage name="publication_year" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tên tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <!-- 3 cái button: Lưu, Xóa (chỉ có ở update), Thoát -->
        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100" @submit="submitBook">Lưu</button>
            </div>
            <!-- Chỉ có ở update (khi tồn tại sách mới được xóa) -->
            <div class="col-12 col-md-4 mb-2" v-if="bookLocal._id">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-danger w-100" type="button" @click="deleteBook">Xóa</button>
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
import bookService from "@/services/book.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên sách phải có giá trị.")
                .min(2, "Tên sách phải ít nhất 2 ký tự.")
                .max(100, "Tên sách có nhiều nhất 100 ký tự."),
            price: yup
                .number()
                .required("Giá sách phải có giá trị.")
                .min(1000, "Giá sách phải từ 1,000 VND.")
                .max(2000000000, "Giá sách không vượt quá 2 tỷ VND."),
            quantity: yup
                .number()
                .required("Số lượng sách là bắt buộc.")
                .min(1, "Số lượng sách ít nhất là 1.")
                .max(1000, "Số lượng sách tối đa là 1000."),
            publication_year: yup
                .number()
                .required("Năm xuất bản là bắt buộc.")
                .min(1900, "Năm xuất bản không thể trước 1900.")
                .max(new Date().getFullYear(), "Năm xuất bản không thể trong tương lai."),
            author: yup
                .string()
                .required("Tên tác giả là bắt buộc.")
                .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
                .max(100, "Tên tác giả tối đa 100 ký tự."),
        });
        return {
            // Không hiệu chỉnh props, nên tạo biến cục bộ bookLocal để liên kết với các input trên form
            bookLocal: this.book,
            bookFormSchema,
            selectedFile: null,
        };
    },
    // Thêm cái này để theo dõi, mỗi khi book thay đổi thì thay đổi thông tin trong Form
    watch: {
        book: {
            immediate: true,
            // Cập nhật bookLocal khi prop book thay đổi
            handler(newBook) {
                this.bookLocal = { ...newBook };
            }
        }
    },
    methods: {
        // Lưu: dùng cho cả Add và Edit
        async submitBook() {
            if (!this.selectedFile) {
                alert("Phải chọn ảnh sách!");
                return;
            }
            // phải chọn ảnh mới cho thêm
            await this.handleSubmitImage();
            this.$emit("submit:book", this.bookLocal);
        },
        // Xóa: dùng cho Edit
        deleteBook() {
            this.$emit("delete:book", this.bookLocal._id);
        },
        // Thoát: dùng cho cả Add và Edit
        Cancel() {
            const reply = window.confirm('Chưa lưu thay đổi! Vẫn rời đi?');
            if (!reply) {
                return false;
            } else this.$router.push({ name: "book" });
        },
        // Mỗi khi chọn ảnh mới là cập nhật
        handleImageChange(e) {
            this.selectedFile = e.target.files[0];
        },
        async handleSubmitImage() {
            if (this.selectedFile) {
                try {
                    const respone = await bookService.uploadBookImage(this.selectedFile);
                    this.bookLocal.img = respone.imageUrl;
                    console.log(respone);
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
