<template>
    <div v-if="isReady" id="tracking-container">
        <h2>{{ titlePage }}</h2>
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center col-12 col-sm-6 col-md-4 mb-2"
                v-for="(transaction, index) in transactionInfors" :key="index">
                <Card :title="`Thông tin giao dịch`" :Infor="transaction"></Card>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserRoleStore } from '@/stores/user_role_stores';
import Card from './Card.vue';
import { ADMIN, USER_READER, USER_STAFF } from '@/constants/registerform.constant';
import staffService from '@/services/staff.service';
import readerService from '@/services/reader.service';
import transactionService from '@/services/transaction.service';
import { transactionInfor } from '@/constants/inforcard.constant';
import { formatDate, getTransactionStatusTitle } from '@/utils/date.utils';
export default {
    components: { Card, },
    data: () => ({
        transactionInfors: [],
        titlePage: "",
        isReady: false,
    }),
    methods: {
        // Chuyển từng giao dịch sang Infor
        changeToInfor(initalTransaction, transactionModel) {
            // Sao chép sâu
            const transactionResult = JSON.parse(JSON.stringify(transactionModel));
            for (let key in transactionResult)
                transactionResult[key].value = initalTransaction[key];
            transactionResult.request_date.value = formatDate(transactionResult.request_date.value);
            transactionResult.borrow_date.value = formatDate(transactionResult.borrow_date.value);
            transactionResult.due_date.value = formatDate(transactionResult.due_date.value);
            transactionResult.return_date.value = formatDate(transactionResult.return_date.value);
            transactionResult.status.value = getTransactionStatusTitle(transactionResult.status.value);
            return transactionResult;
        },
        async getTransactions() {
            const token = localStorage.getItem("token");
            const userRole = useUserRoleStore();
            if (!token)
                confirm("Lỗi không lấy được token");
            else {
                let filter = null;
                switch (userRole.getUserRole) {
                    case ADMIN:
                        confirm("Chức năng này không dành cho admin");
                        break;
                    case USER_STAFF:
                        this.titlePage = "Các giao dịch đang phụ trách";
                        const staff = await staffService.getProfile(token);
                        if (staff)
                            filter = { staff_id: staff._id };
                        break;
                    case USER_READER:
                        this.titlePage = "Các giao dịch có liên quan";
                        const reader = await readerService.getProfile(token);
                        if (reader)
                            filter = { reader_id: reader._id };
                        break;
                    default:
                        confirm("Lỗi khi lấy các giao dịch của tài khoản");
                };
                if (filter) {
                    // Danh sách các giao dịch
                    const initalTransactions = await transactionService.getAllTransactionWithFullInformationById(filter);
                    // Chuyển danh sách sang dạng Infor để hiển thị
                    for (let initalTransaction of initalTransactions) {
                        // Sao chép sâu
                        const transInfor = JSON.parse(JSON.stringify(this.changeToInfor(initalTransaction, transactionInfor)));
                        this.transactionInfors.push(transInfor);
                    }
                }
                // Đánh dấu dữ liệu đã sẵn sàng
                this.isReady = true;
            }
        },
    },
    created() {
        this.getTransactions();
    },
}
</script>