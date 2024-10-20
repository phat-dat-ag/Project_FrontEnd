<script>
// Lấy dữ liệu book, reader để hiển thị
import TransactionCard from '@/components/Transaction/TransactionCard.vue';
import bookService from '@/services/book.service';
import readerService from '@/services/reader.service';
export default {
    components: {
        TransactionCard,
    },
    props: {
        transactions: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            transactionsLocal: [],
        }
    },
    methods: {
        // Phát đi 1 sự kiện khi click chọn một transaction
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        // Bổ sung thêm Tên sách, Tên độc giả
        async getBookAndReader() {
            for (let transaction of this.transactions) {
                const book = await bookService.get(transaction.book_id);
                const reader = await readerService.get(transaction.reader_id);
                let transactionLocal = {
                    ...transaction,
                    book_name: book.name,
                    reader_name: reader.last_name,
                }
                this.transactionsLocal.push(transactionLocal);
            }
            // console.log(this.transactionsLocal);
        }
    },
    // transactions thay đổi thì cập nhật lại
    watch: {
        transactions() {
            this.transactionsLocal = [];
            this.getBookAndReader();
        }
    },
    created() {
        this.getBookAndReader();
    }
}
</script>
<template>
    <!-- book_id, reader_id, staff_id, borrow_date, return_date -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(transaction, index) in transactionsLocal" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ transaction.book_name }} / {{ transaction.reader_name }}
            <div v-if="index === activeIndex">
                <TransactionCard :transaction="transaction"></TransactionCard>
                <router-link :to="{
                    name: 'transaction.edit',
                    params: { id: transaction._id },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
