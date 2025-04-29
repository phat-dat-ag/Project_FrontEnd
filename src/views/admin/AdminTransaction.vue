<script>
import InputSearch from '@/components/InputSearch.vue';
import transactionService from '@/services/transaction.service';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { TRANSACTION_TYPE } from '@/constants/form.constants';
import ListEntity from '@/components/entities/ListEntity.vue';
export default {
    components: {
        InputSearch, ListEntity
    },
    data() {
        return {
            transactions: [],
            searchText: "",
            activeIndex: -1,
            TRANSACTION_TYPE,
        }
    },
    watch: {
        // Mỗi khi searchText thay đổi thì activeIndex đều gán lại -1
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        // Danh sách các chuỗi: Chuyển toàn bộ thông tin (trừ ID) của mỗi transaction thành 1 chuỗi để tiện cho chức năng tìm kiếm
        transactionStrings() {
            return this.transactions.map((transaction) => {
                const { book_id, reader_id, staff_id, borrow_date, return_date } = transaction;
                return [book_id, reader_id, staff_id, borrow_date, return_date].join("");
            });
        },
        // Chức năng tìm kiếm
        filteredTransactions() {
            if (!this.searchText)
                return this.transactions;
            return this.transactions.filter((_transaction, index) => {
                return this.transactionStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các transaction tìm được
        filteredTransactionsCount() {
            return this.filteredTransactions.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng transaction từ CSDL
        async retrieveTransactionList() {
            try {
                this.transactions = await transactionService.getAll();
                // console.log(this.transactions);
            } catch (error) {
                console.log(error);
            }
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshTransactionList() {
            this.retrieveTransactionList();
            this.activeIndex = -1;
            this.searchText = "";
            // Đưa về trang Transaction luôn
            this.$router.push({ name: "transaction" });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ các transaction
        async removeTransactionList() {
            if (confirm("Xóa hết lịch sử mượn sách?")) {
                try {
                    await transactionService.deleteAll();
                    this.refreshTransactionList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddTransaction() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(TRANSACTION_TYPE);
            this.$router.push({ name: "entity.add" });
        }
    },
    mounted() {
        // Khi vừa mount là refresh, => lấy dữ liệu từ CSDL
        this.refreshTransactionList();
    }
}
</script>
<template>
    <h1>Theo dõi mượn sách</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- TransactionList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->

                <div class="col-12 col-md-6">
                    <h4>Lịch sử mượn sách</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshTransactionList()">
                                Làm mới
                            </button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddTransaction()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removeTransactionList()">
                                Xóa tất cả
                            </button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <ListEntity v-if="filteredTransactionsCount > 0" :entities="filteredTransactions"
                        v-model:activeIndex="activeIndex" :interfaceType="TRANSACTION_TYPE"></ListEntity>
                    <p v-else>Không có Giao dịch mượn sách nào!</p>
                </div>

                <!-- TransactionAdd và TransactionEdit: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">

                </div>
            </div>
        </div>
    </div>
</template>