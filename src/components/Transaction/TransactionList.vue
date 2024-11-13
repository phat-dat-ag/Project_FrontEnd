<script>
// Lấy dữ liệu book, reader để hiển thị
import bookService from '@/services/book.service';
import readerService from '@/services/reader.service';
import staffService from '@/services/staff.service';
import Card from '../Card.vue';
export default {
    components: {
        Card,
    },
    props: {
        transactions: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            newTransactionList: [],
        }
    },
    methods: {
        // Phát đi 1 sự kiện khi click chọn một transaction
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changeToNewTransaction(transaction) {
            let newInfor = {
                _id: { label: "Mã giao dịch", },
                book_name: { label: "Sách", },
                reader_name: { label: "Độc giả", },
                staff_name: { label: "Nhân viên", },
                borrow_date: { label: "Ngày mượn", },
                return_date: { label: "Ngày trả", },
            };
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: transaction[key] };
            }
            return newInfor;
        },
        // Bổ sung thêm Tên sách, Tên độc giả, Tên nhân viên
        async getFullTransaction() {
            for (let transaction of this.transactions) {
                const book = await bookService.get(transaction.book_id);
                const reader = await readerService.get(transaction.reader_id);
                const staff = await staffService.get(transaction.staff_id);
                let updatedTransaction = {
                    ...transaction,
                    book_name: book.name,
                    reader_name: reader.last_name,
                    staff_name: staff.fullname,
                }
                let newTransaction = this.changeToNewTransaction(updatedTransaction);
                this.newTransactionList.push(newTransaction);
            }
        }
    },
    // transactions thay đổi thì cập nhật lại
    watch: {
        transactions() {
            this.newTransactionList = [];
            this.getFullTransaction();
        }
    },
    created() {
        this.getFullTransaction();
    }
}
</script>
<template>
    <!-- book_id, reader_id, staff_id, borrow_date, return_date -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(transaction, index) in newTransactionList" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ transaction.book_name.value }} / {{ transaction.reader_name.value }}
            <div v-if="index === activeIndex">
                <Card :Infor="transaction" :title="'Thông tin về giao dịch'"></Card>
                <router-link :to="{
                    name: 'transaction.edit',
                    params: { id: transaction._id.value },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
