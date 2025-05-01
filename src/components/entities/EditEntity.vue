<template>
    <div id="entity-edit" v-if="entity">
        <h4>{{ selectedFormDes.updateTitle }}</h4>
        <!-- updateEntity và deleteEntity: sự kiện emit -->
        <component :is="selectedComponent" :isAdded="false" v-bind="{ [selectedFormDes.entityName]: entity }"
            v-on="{ [`submit:${selectedFormDes.entityName}`]: updateEntity, [`delete:${selectedFormDes.entityName}`]: deleteEntity }">
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
export default {
    components: {
        BookForm, PublisherForm, ReaderForm, StaffForm, TransactionForm
    },
    props: {
        id: { type: String, required: true },
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
        async getEntity(id) {
            try {
                this.entity = await this.selectedService.get(id);
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
        async updateEntity(data) {
            try {
                await this.selectedService.update(this.entity._id, data);
                alert('Dữ liệu được cập nhật thành công.');
                //  Điều hướng trở về trang trước
                this.$router.push({ name: this.selectedFormDes.entityName });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteEntity(id) {
            if (confirm("Bạn muốn xóa dữ liệu này?")) {
                try {
                    await this.selectedService.delete(id);
                    alert('Dữ liệu được xóa thành công.');
                    //  Điều hướng trở về trang trước
                    this.$router.push({ name: this.selectedFormDes.entityName });
                } catch (error) {
                    console.log(error);
                }
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
        this.selectedFormType = formtype.getFormType;
        this.initData();
        this.getEntity(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong book
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getEntity(newId);
        },
    },
};
</script>

<style>
#entity-edit {
    max-width: 400px;
    margin: 0 auto;
}
</style>