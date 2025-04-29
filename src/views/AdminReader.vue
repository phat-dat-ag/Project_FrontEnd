<script>
import InputSearch from '@/components/InputSearch.vue';
import readerService from '@/services/reader.service';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { READER_TYPE } from '@/constants/form.constants';
import ListEntity from '@/entities/ListEntity.vue';
export default {
    components: {
        InputSearch, ListEntity
    },
    data() {
        return {
            readers: [],
            searchText: "",
            activeIndex: -1,
            READER_TYPE,
        }
    },
    watch: {
        // Mỗi khi searchText thay đổi thì activeIndex đều gán lại -1
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        // Danh sách các chuỗi: Chuyển toàn bộ thông tin (trừ ID và favorite) của mỗi reader thành 1 chuỗi để tiện cho chức năng tìm kiếm
        readerStrings() {
            return this.readers.map((reader) => {
                const { address, birthday, favorite, first_name, last_name, phone, sex } = reader;
                return [address, birthday, favorite, first_name, last_name, phone, sex].join("");
            });
        },
        // Chức năng tìm kiếm
        filteredReaders() {
            if (!this.searchText)
                return this.readers;
            return this.readers.filter((_reader, index) => {
                return this.readerStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các reader tìm được
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng reader từ CSDL
        async retrieveReaderList() {
            try {
                this.readers = await readerService.getAll();
                // console.log(this.readers);
            } catch (error) {
                console.log(error);
            }
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshReaderList() {
            this.retrieveReaderList();
            this.activeIndex = -1;
            this.searchText = "";
            // Đưa về trang Reader luôn
            this.$router.push({ name: "reader" });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ các reader
        async removeReaderList() {
            if (confirm("Xóa hết các Độc giả?")) {
                try {
                    await readerService.deleteAll();
                    this.refreshReaderList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddReader() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(READER_TYPE);
            this.$router.push({ name: "entity.add" });
        }
    },
    mounted() {
        // Khi vừa mount là refresh, => lấy dữ liệu từ CSDL
        this.refreshReaderList();
    }
}
</script>
<template>
    <h1>Quản lý Độc giả</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- ReaderList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->

                <div class="col-12 col-md-6">
                    <h4>Danh sách Độc giả</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshReaderList()">Làm mới</button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddReader()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removeReaderList()">Xóa tất cả</button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <ListEntity v-if="filteredReadersCount > 0" :entities="filteredReaders"
                        v-model:activeIndex="activeIndex" :interfaceType="READER_TYPE"></ListEntity>
                    <p v-else>Không có Độc giả nào!</p>
                </div>

                <!-- ReaderAdd và ReaderEdit: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">

                </div>
            </div>
        </div>
    </div>
</template>