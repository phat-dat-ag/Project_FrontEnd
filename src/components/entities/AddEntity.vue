<template>
    <div id="entity-add">
        <h4>{{ selectedFormDes.addTitle }}</h4>
        <!-- submitEntity: sự kiện emit -->
        <component :is="selectedComponent" :isAdded="true" v-bind="{ [selectedFormDes.entityName]: entity }"
            v-on="{ [`submit:${selectedFormDes.entityName}`]: submitEntity }">
        </component>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/forms/BookForm.vue";
import PublisherForm from "@/components/forms/PublisherForm.vue";
import ReaderForm from "@/components/forms/ReaderForm.vue";
import StaffForm from "@/components/forms/StaffForm.vue";
import TransactionForm from "@/components/forms/TransactionForm.vue";
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import transactionService from "@/services/transaction.service";
import { useFormTypeStore } from "@/stores/formtype.stores";
import { BOOK_TYPE, formDescriptions, PUBLISHER_TYPE, READER_TYPE, STAFF_TYPE, TRANSACTION_TYPE } from "@/constants/form.constants";
import { markRaw } from "vue";
import { storeToRefs } from "pinia";
export default {
    components: {
        BookForm, PublisherForm, ReaderForm, StaffForm, TransactionForm
    },
    data() {
        return {
            entity: {}, // Lưu dữ liệu của đối tượng cần thêm
            message: "",
            selectedFormDes: null, // Các tiêu đề của trang được chọn
            selectedService: null,
            selectedComponent: null,
            selectedFormType: null, // Loại form đang được yêu cầu
        };
    },
    methods: {
        async submitEntity(data) {
            try {
                await this.selectedService.create(data);
                alert(`Thêm dữ liệu thành công.`);
                // Điều hướng trở về trang ban đầu
                this.$router.push({ name: this.selectedFormDes.entityName });
            } catch (error) {
                console.log(error);
            }
        },
        initData() {
            switch (this.selectedFormType) {
                case BOOK_TYPE:
                    this.selectedService = bookService;
                    this.selectedFormDes = formDescriptions.book;
                    this.selectedComponent = markRaw(BookForm);
                    break;
                case PUBLISHER_TYPE:
                    this.selectedService = publisherService;
                    this.selectedFormDes = formDescriptions.publisher;
                    this.selectedComponent = markRaw(PublisherForm);
                    break;
                case READER_TYPE:
                    this.selectedService = readerService;
                    this.selectedFormDes = formDescriptions.reader;
                    this.selectedComponent = markRaw(ReaderForm);
                    break;
                case STAFF_TYPE:
                    this.selectedService = staffService;
                    this.selectedFormDes = formDescriptions.staff;
                    this.selectedComponent = markRaw(StaffForm);
                    break;
                case TRANSACTION_TYPE:
                    this.selectedService = transactionService;
                    this.selectedFormDes = formDescriptions.transaction;
                    this.selectedComponent = markRaw(TransactionForm);
                    break;
                default:
                    confirm("Lỗi rồi");
            }
        }
    },
    created() {
        const formtype = useFormTypeStore();
        const { getFormType } = storeToRefs(formtype);
        this.selectedFormType = getFormType;
        this.initData();
        this.message = "";
    }
};
</script>

<style scoped>
#entity-add {
    max-width: 400px;
    margin: 0 auto;
}
</style>