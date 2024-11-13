<template>
    <h1>Sách đang quản lý</h1>
    <div class="container">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center col-12 col-sm-6 col-md-4 mb-2"
                v-if="this.myTransactionList.length > 0" v-for="(transaction) in myTransactionList">
                <Card :Infor="transaction" :title="'Thông tin giao dịch'"></Card>
            </div>
        </div>
    </div>
</template>
<script>
import bookService from '@/services/book.service';
import readerService from '@/services/reader.service';
import staffService from '@/services/staff.service';
import transactionService from '@/services/transaction.service';
import Card from '../components/Card.vue';

export default {
    components: {
        Card,
    },
    data() {
        return {
            myTransactionList: [],
        }
    },
    methods: {
        async getTransactionInfor(transaction) {
            let newInfor = {
                book_name: { label: "Sách", },
                reader_name: { label: "Độc giả", },
                borrow_date: { label: "Ngày mượn" },
                return_date: { label: "Ngày trả", },
            }
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: transaction[key] };
            }
            return newInfor;
        },
        async getListTransaction() {
            const token = localStorage.getItem("token");
            const inforDB = await staffService.getProfile(token);
            // Lấy tất cả transaction
            const transactions = await transactionService.getAll();
            // Lọc lại theo staff 
            // Sau đó Bổ sung thêm tên sách, tên độc giả
            let myTransactions = [];
            for (let i = 0; i < transactions.length; i++) {
                if (inforDB._id !== transactions[i].staff_id)
                    continue;
                const book = await bookService.get(transactions[i].book_id);
                const reader = await readerService.get(transactions[i].reader_id);
                let newTran = {
                    ...transactions[i],
                    book_name: book.name,
                    reader_name: reader.first_name + " " + reader.last_name,
                };
                newTran = await this.getTransactionInfor(newTran);
                myTransactions.push(newTran);
            };
            this.myTransactionList = myTransactions;
        },
    },
    created() {
        this.getListTransaction();
    }
}
</script>