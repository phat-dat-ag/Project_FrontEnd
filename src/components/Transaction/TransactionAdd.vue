<template>
    <div>
        <h4>Thêm Chi tiết mượn sách</h4>
        <!-- Dù addTransaction nhận tham số, nhưng nó là từ sự kiện emit mà -->
        <TransactionForm :transaction="transaction" :isAdded="true" @submit:transaction="addTransaction" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import TransactionForm from "@/components/Transaction/TransactionForm.vue";
import transactionService from "@/services/transaction.service";
export default {
    components: {
        TransactionForm,
    },
    props: {
        refreshTransactionList: { type: Function },
    },
    data() {
        return {
            transaction: {},
            message: "",
        };
    },
    methods: {
        async addTransaction(data) {
            try {
                await transactionService.create(data);
                alert(`Đã thêm Theo dõi mượn sách.`);
                // Làm mới
                this.refreshTransactionList();
                // Điều hướng trở về trang Theo dõi mượn sách, nếu không cái form vẫn còn (còn ở /transaction/add)
                this.$router.push({ name: "transaction" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
