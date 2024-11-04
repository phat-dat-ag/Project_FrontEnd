<script>
// Lấy dữ liệu book, reader, staff để hiển thị
import bookService from '@/services/book.service';
import readerService from '@/services/reader.service';
import staffService from '@/services/staff.service';
export default {
    props: {
        transaction: { type: Object, required: true, }
    },
    data() {
        return {
            book: {}, reader: {}, staff: {}
        }
    },
    methods: {
        async getBook() {
            this.book = await bookService.get(this.transaction.book_id);
        },
        async getReader() {
            this.reader = await readerService.get(this.transaction.reader_id);
        },
        async getStaff() {
            this.staff = await staffService.get(this.transaction.staff_id);
        }
    },
    async mounted() {
        await Promise.all([this.getBook(), this.getReader(), this.getStaff()]);
    }
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Chi tiết mượn sách
        </div>
        <!-- book_id, reader_id, staff_id, borrow_date, return_date -->
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Sách: {{ book.name }}</li>
            <li class="list-group-item">Độc giả: {{ reader.first_name }} {{ reader.last_name }} </li>
            <li class="list-group-item">Nhân viên: {{ staff.fullname }} </li>
            <li class="list-group-item">Ngày mượn: {{ transaction.borrow_date }}</li>
            <li class="list-group-item">Ngày trả: {{ transaction.return_date }}</li>
        </ul>
    </div>
</template>
