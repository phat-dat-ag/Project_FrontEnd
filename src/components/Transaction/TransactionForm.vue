<template>
    <Form v-if="readers.length !== 0 && books.length !== 0 && staffs.length !== 0" @submit="submitTransaction"
        :validation-schema="transactionFormSchema">
        <!-- book_id, reader_id, staff_id, borrow_date, return_date -->
        <div class="form-group">
            <label for="book_id">Sách</label>
            <Field as="select" name="book_id" class="form-control" v-model="transactionLocal.book_id">
                <option v-for="(book, index) in books" :key="index" :value="book._id">{{ book.name }}</option>
            </Field>
            <ErrorMessage name="book_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="reader_id">Độc giả</label>
            <Field as="select" name="reader_id" class="form-control" v-model="transactionLocal.reader_id">
                <option v-for="(reader, index) in readers" :key="index" :value="reader._id">
                    {{ reader.first_name }} {{ reader.last_name }}
                </option>
            </Field>
            <ErrorMessage name="reader_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="staff_id">Nhân viên</label>
            <Field as="select" name="staff_id" class="form-control" v-model="transactionLocal.staff_id">
                <option v-for="(staff, index) in staffs" :key="index" :value="staff._id">{{ staff.fullname }}</option>
            </Field>
            <ErrorMessage name="staff_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="borrow_date">Ngày mượn</label>
            <Field name="borrow_date" type="date" class="form-control" v-model="transactionLocal.borrow_date" />
            <ErrorMessage name="borrow_date" class="error-feedback" />
        </div>
        <div v-if="!isAdded" class="form-group">
            <label for="return_date">Ngày trả</label>
            <Field name="return_date" type="date" class="form-control" v-model="transactionLocal.return_date" />
            <ErrorMessage name="return_date" class="error-feedback" />
        </div>
        <!-- 3 cái button: Lưu, Xóa (chỉ có ở update), Thoát -->
        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <!-- Không để type => mặc định là submit -->
                <button class="btn btn-primary w-100" @submit="submitTransaction">Lưu</button>
            </div>
            <!-- Chỉ có ở update (khi tồn tại transaction mới được xóa) -->
            <div class="col-12 col-md-4 mb-2" v-if="transactionLocal._id">
                <!-- Nếu không có type button thì nó được coi là submit, nên gọi đến sự kiện submit -->
                <button class="btn btn-danger w-100" type="button" @click="deleteTransaction">Xóa</button>
            </div>
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
        const transactionFormSchema = yup.object().shape({
            book_id: yup.string().required("Phải chọn sách."),
            reader_id: yup.string().required("Phải chọn độc giả."),
            staff_id: yup.string().required("Phải chọn nhân viên."),
            // Phải có ngày mượn
            borrow_date: yup.date().required("Ngày mượn là bắt buộc."),
            // Không bắt buộc ngày trả
            // Nhưng nếu có ngày trả thì phải hợp lý: ngày trả >= ngày mượn
            return_date: yup
                .date()
                // value là return_date được truyền tự động vào
                .test("is-return-date-after-borrow-date", "Ngày trả phải sau ngày mượn", function (value) {
                    // Không có ngày trả => bỏ qua
                    if (!value)
                        return true;
                    // Truy cập giá trị borrow_date từ cùng object form
                    const { borrow_date } = this.parent;
                    return borrow_date && value && new Date(value) >= new Date(borrow_date);
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
        submitTransaction() {
            if (!this.transactionLocal.return_date)
                this.transactionLocal = {
                    ...this.transactionLocal,
                    status: "Đang mượn",
                }
            else
                this.transactionLocal = {
                    ...this.transactionLocal,
                    status: "Đã trả",
                }
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
