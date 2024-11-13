<template>
    <div v-if="transaction">
        <h4>Hiệu chỉnh Chi tiết mượn sách</h4>
        <!-- Dù updateTransaction nhận tham số, nhưng nó là từ sự kiện emit mà, deleteTransaction cũng vậy -->
        <TransactionForm :transaction="transaction" @submit:transaction="updateTransaction"
            @delete:transaction="deleteTransaction" />
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
        id: { type: String, required: true },
        refreshTransactionList: { type: Function },
    },
    data() {
        return {
            transaction: null,
            message: "",
        };
    },
    methods: {
        async getTransaction(id) {
            try {
                this.transaction = await transactionService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateTransaction(data) {
            try {
                await transactionService.update(this.transaction._id, data);
                alert('Theo dõi mượn sách được cập nhật thành công.');
                // Làm mới
                this.refreshTransactionList();
                //  Điều hướng trở về trang Theo dõi mượn sách, nếu không cái form vẫn còn (còn ở /transaction/edit:id)
                this.$router.push({ name: "transaction" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTransaction(id) {
            if (confirm("Bạn muốn xóa Theo dõi mượn sách này?")) {
                try {
                    await transactionService.delete(id);
                    alert('Theo dõi mượn sách được xóa thành công.');
                    // Làm mới
                    this.refreshTransactionList();
                    //  Điều hướng trở về trang Theo dõi mượn sách, nếu không cái form vẫn còn
                    this.$router.push({ name: "transaction" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getTransaction(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong transaction
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getTransaction(newId); // Gọi lại hàm lấy dữ liệu mỗi khi id thay đổi
        },
    },
};
</script>
