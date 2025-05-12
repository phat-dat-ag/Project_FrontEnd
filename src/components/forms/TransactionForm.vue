<template>
    <Form v-if="readers.length !== 0 && books.length !== 0 && staffs.length !== 0" @submit="submitTransaction"
        :validation-schema="transactionFormSchema">
        <div class="form-group">
            <label for="book_id">Sách</label>
            <Field :disabled="!isAdded" as="select" name="book_id" class="form-control"
                v-model="transactionLocal.book_id">
                <option v-for="(book, index) in books" :key="index" :value="book._id">{{ book.name }}</option>
            </Field>
            <ErrorMessage name="book_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="request_quantity">Số lượng: </label>
            <Field :disabled="!isAdded" type="number" name="request_quantity" class="form-control"
                v-model="transactionLocal.request_quantity"></Field>
            <ErrorMessage name="request_quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="reader_id">Độc giả</label>
            <Field :disabled="!isAdded" as="select" name="reader_id" class="form-control"
                v-model="transactionLocal.reader_id">
                <option v-for="(reader, index) in readers" :key="index" :value="reader._id">
                    {{ reader.first_name }} {{ reader.last_name }}
                </option>
            </Field>
            <ErrorMessage name="reader_id" class="error-feedback" />
        </div>
        <!-- Chỉ có khi Update thôi -->
        <div v-if="!isAdded" class="form-group">
            <label for="request_date">Ngày gửi yêu cầu:</label>
            <Field :disabled="!isAdded" name="request_date" type="date" class="form-control"
                v-model="transactionLocal.request_date" />
            <ErrorMessage name="request_date" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="staff_id">Nhân viên</label>
            <Field as="select" name="staff_id" class="form-control" v-model="transactionLocal.staff_id">
                <option v-for="(staff, index) in staffs" :key="index" :value="staff._id">{{ staff.fullname }}</option>
            </Field>
            <ErrorMessage name="staff_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="due_date">Hạn trả</label>
            <Field name="due_date" type="date" class="form-control" v-model="transactionLocal.due_date" />
            <ErrorMessage name="due_date" class="error-feedback" />
        </div>
        <div v-if="!isAdded" class="form-group">
            <label for="return_date">Ngày trả</label>
            <Field name="return_date" type="date" class="form-control" v-model="transactionLocal.return_date" />
            <ErrorMessage name="return_date" class="error-feedback" />
        </div>
        <div class="form-group row">
            <!-- Chỉ có ở add: Lưu -->
            <div v-if="isAdded" class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100">Lưu</button>
            </div>
            <!-- Chỉ có ở update: Duyệt, Từ chối-->
            <div v-if="!isAdded" class="col-12 col-md-4 mb-2">
                <button class="btn btn-primary w-100">Duyệt</button>
            </div>
            <!-- Chưa giải quyết chức năng này -->
            <div v-if="!isAdded" class="col-12 col-md-4 mb-2">
                <button class="btn btn-danger w-100">Từ chối</button>
            </div>
            <!-- Luôn có mặt -->
            <div class="col-12 col-md-4 mb-2">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-secondary w-100" type="button" @click="Cancel">Thoát</button>
            </div>
        </div>
    </Form>
    <p v-else>Đang thiếu Độc giả/ Sách/ Nhân viên nên không thể lập biên nhận mượn sách</p>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import readerService from "@/services/reader.service";
import bookService from "@/services/book.service";
import staffService from "@/services/staff.service";
import { APPROVED } from "@/constants/transaction_status.constants";
import adminService from "@/services/admin.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:transaction", "delete:transaction"],
    props: {
        isAdded: { type: Boolean, required: true },
        transaction: { type: Object, required: true }
    },
    data() {
        // Tạo: Lưu; Cập nhật: Duyệt
        const transactionFormSchema = yup.object().shape({
            book_id: yup.string().required("Phải chọn sách."),
            request_quantity: yup.number().required("Phải chọn số lượng sách."),
            reader_id: yup.string().required("Phải chọn độc giả."),
            staff_id: yup.string().required("Phải chọn nhân viên."),
            due_date: yup.date().required("Phải nhập hạn trả.").test("is-due-date-valid", "Ngày trả không được trước ngày hôm nay", function (value) {
                if (value)
                    return new Date().setHours(0, 0, 0, 0) <= new Date(value).setHours(0, 0, 0, 0);
            }),
        });
        return {
            // Không hiệu chỉnh props, nên tạo biến cục bộ transactionLocal để liên kết với các input trên form
            transactionLocal: this.transaction,
            transactionFormSchema,
            readers: [],
            books: [],
            staffs: [],
        };
    },
    // Thêm cái này để theo dõi, mỗi khi transaction thay đổi thì thay đổi thông tin trong Form
    watch: {
        transaction: {
            immediate: true,
            // Cập nhật transactionLocal khi prop transaction thay đổi
            handler(newTransaction) {
                this.transactionLocal = { ...newTransaction };
            }
        }
    },
    methods: {
        // Lấy độc giả
        async getReaders() {
            this.readers = await readerService.getAll();
        },
        // Lấy sách
        async getBooks() {
            this.books = await bookService.getAll();
        },
        // Lấy nhân viên
        async getStaffs() {
            this.staffs = await staffService.getAll();
        },
        // Lưu: dùng cho cả Add và Edit
        async submitTransaction() {
            const token = localStorage.getItem("token");
            const admin = await adminService.getProfile(token);
            const today = new Date();
            //  Bổ sung dữ liệu trước khi gửi
            this.transactionLocal.request_date = today;
            this.transactionLocal.admin_id = admin._id;
            this.transactionLocal.borrow_date = today;
            this.transactionLocal.status = APPROVED;
            this.$emit("submit:transaction", this.transactionLocal);
        },
        // Xóa: dùng cho Edit
        deleteTransaction() {
            this.$emit("delete:transaction", this.transactionLocal._id);
        },
        // Thoát: dùng cho cả Add và Edit
        Cancel() {
            const reply = window.confirm('Chưa lưu thay đổi! Vẫn rời đi? ');
            if (!reply) {
                return false;
            } else this.$router.push({ name: "transaction" });
        }
    },
    // Khi vừa được tạo ra thì lấy danh sách liền
    created() {
        this.getBooks();
        this.getReaders();
        this.getStaffs();
    }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
