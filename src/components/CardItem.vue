<template>
    <div class="card" style="width: 18rem;" :key="index_key">
        <img :src="book.img" class="card-img-top" :alt="book.name">
        <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text">Bán chạy</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Tác giả: {{ book.author }}</li>
            <li class="list-group-item">Xuất xứ: {{ book.publisher_name }}</li>
            <li class="list-group-item">Xuất bản: {{ book.publication_year }}</li>
            <li class="list-group-item">Số lượng: {{ book.quantity }}</li>
            <li class="list-group-item">Giá: {{ book.price }}</li>
        </ul>
        <div v-if="isReader" id="request-area">
            <input v-model.number="request_quantity" type="number" min="0" :max="book.quantity" placeholder="Số lượng">
            <button class="btn btn-primary w-80" type="button" @click="handleRequestBorrowBook">Đăng ký mượn</button>
        </div>
    </div>
</template>

<script>
import readerService from '@/services/reader.service';
import { PENDING } from '@/constants/transaction_status.constants';
import transactionService from '@/services/transaction.service';

export default {
    data: () => ({
        request_quantity: 0,
    }),
    props: {
        index_key: { required: true },
        book: { required: true, type: Object },
        isReader: { required: true, type: Boolean },
    },
    methods: {
        async handleRequestBorrowBook() {
            // Phải là Reader mới được
            if (this.isReader) {
                if (this.request_quantity <= 0 || this.request_quantity > this.book.quantity) {
                    confirm(`Số lượng sách không hợp lệ:`);
                    return;
                }
                const token = localStorage.getItem("token");
                const reader = await readerService.getProfile(token);
                const transation = {
                    book_id: this.book._id,
                    reader_id: reader._id,
                    request_quantity: this.request_quantity,
                    admin_id: null,
                    staff_id: null,
                    borrow_date: null,
                    due_date: null,
                    return_date: null,
                    status: PENDING,
                };
                try {
                    await transactionService.create(transation);
                    confirm("Gửi yêu cầu mượn sách thành công");
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
}
</script>

<style scoped>
#request-area {
    padding: 4px;
    display: flex;
    justify-content: space-around;
}
</style>