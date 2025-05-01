<script>
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import transactionService from "@/services/transaction.service";
import InputSearch from '@/components/InputSearch.vue';
import { useAdminUITypeStore } from '@/stores/admin_ui_type.stores';
import ListEntity from '@/components/entities/ListEntity.vue';
import { BOOK_TYPE, PUBLISHER_TYPE, READER_TYPE, STAFF_TYPE, TRANSACTION_TYPE } from "@/constants/form.constants";
import { pageAdminDescriptions } from '@/constants/pageadmin.constants';
import { getAllEntities } from '@/services/getInfor.service';
export default {
    components: {
        InputSearch, ListEntity
    },
    data() {
        return {
            searchText: "",
            activeIndex: -1,
            entities: [],
            selectedAdminUIType: null,
            selectedPageAdminDes: null,
            selectedService: null
        }
    },
    watch: {
        // Mỗi khi searchText thay đổi thì activeIndex đều gán lại -1
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        // Danh sách các chuỗi
        entityStrings() {
            return this.entities.map((entity) => {
                // Từ entity => mảng các value => chuỗi
                return Object.values(entity).join("");
            });
        },
        // Lọc các entities theo chuỗi searchText
        filteredEntities() {
            if (!this.searchText)
                return this.entities;
            return this.entities.filter((_entity, index) => {
                return this.entityStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các entity tìm được
        filteredEntitiesCount() {
            return this.filteredEntities.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng từ CSDL
        async retrieveEntityList() {
            this.entities = await getAllEntities();
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshEntityList() {
            this.retrieveEntityList();
            this.activeIndex = -1;
            this.searchText = "";
            this.$router.push({ name: this.selectedPageAdminDes.entityName });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ dữ liệu
        async removeEntityList() {
            if (confirm(`${this.selectedPageAdminDes.deleteAllConfirm}`)) {
                try {
                    await this.selectedService.deleteAll();
                    this.refreshEntityList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddEntity() {
            this.$router.push({ name: this.selectedPageAdminDes.addEntityName });
        },
        initData() {
            switch (this.selectedAdminUIType) {
                case BOOK_TYPE:
                    this.selectedPageAdminDes = pageAdminDescriptions.book;
                    this.selectedService = bookService;
                    break;
                case PUBLISHER_TYPE:
                    this.selectedPageAdminDes = pageAdminDescriptions.publisher;
                    this.selectedService = publisherService;
                    break;
                case READER_TYPE:
                    this.selectedPageAdminDes = pageAdminDescriptions.reader;
                    this.selectedService = readerService;
                    break;
                case STAFF_TYPE:
                    this.selectedPageAdminDes = pageAdminDescriptions.staff;
                    this.selectedService = staffService;
                    break;
                case TRANSACTION_TYPE:
                    this.selectedPageAdminDes = pageAdminDescriptions.transaction;
                    this.selectedService = transactionService;
                    break;
                default:
                    confirm("Lỗi trong quá trình hiển thị trang của admin");
            }
        }
    },
    created() {
        const adminUIType = useAdminUITypeStore();
        this.selectedAdminUIType = adminUIType.getAdminUIType;
        this.initData();
        this.retrieveEntityList();
    },
}
</script>

<template>
    <h1>{{ selectedPageAdminDes.pageTitle }}</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- BookList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">
                    <h4>{{ selectedPageAdminDes.listTitle }}</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshEntityList()">Làm mới</button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddEntity()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removeEntityList()">Xóa tất cả</button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <ListEntity v-if="filteredEntitiesCount > 0" :entities="filteredEntities"
                        v-model:activeIndex="activeIndex"></ListEntity>
                    <p v-else>{{ selectedPageAdminDes.nodataNotify }}</p>
                </div>

                <!-- AddEntity và EditEntity: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>