<script>
import InputSearch from '@/components/InputSearch.vue';
import PublisherList from '@/components/Publisher/PublisherList.vue';
import publisherService from '@/services/publisher.service';

export default {
    components: {
        InputSearch, PublisherList,
    },
    data() {
        return {
            publishers: [],
            searchText: "",
            activeIndex: -1,
        }
    },
    watch: {
        // Mỗi khi searchText thay đổi thì activeIndex đều gán lại -1
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        // Danh sách các chuỗi: Chuyển toàn bộ thông tin (trừ ID) của mỗi publisher thành 1 chuỗi để tiện cho chức năng tìm kiếm
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { address, name } = publisher;
                return [address, name].join("");
            });
        },
        // Chức năng tìm kiếm
        filteredPublishers() {
            if (!this.searchText)
                return this.publishers;
            return this.publishers.filter((_publisher, index) => {
                return this.publisherStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các publisher tìm được
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng publisher từ CSDL
        async retrievePublisherList() {
            try {
                this.publishers = await publisherService.getAll();
                // console.log(this.publishers);
            } catch (error) {
                console.log(error);
            }
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshPublisherList() {
            this.retrievePublisherList();
            this.activeIndex = -1;
            this.searchText = "";
            // Đưa về trang Publisher luôn
            this.$router.push({ name: "publisher" });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ các publisher
        async removePublisherList() {
            if (confirm("Xóa hết các Nhà xuất bản?")) {
                try {
                    await publisherService.deleteAll();
                    this.refreshPublisherList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
        }
    },
    mounted() {
        // Khi vừa mount là refresh, => lấy dữ liệu từ CSDL
        this.refreshPublisherList();
    }
}
</script>

<template>
    <h1>Quản lý Nhà xuất bản</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- PublisherList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">
                    <h4>Danh sách Nhà xuất bản</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshPublisherList()">Làm mới</button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddPublisher()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removePublisherList()">Xóa tất cả</button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <PublisherList v-if="filteredPublishersCount > 0" :publishers="filteredPublishers"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Không có Nhà xuất bản nào.</p>
                </div>

                <!-- PublisherAdd và PublisherEdit: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">
                    <!-- Truyền xuống cho PublisherAdd và PublisherEdit -->
                    <!-- Nơi xuất hiện của PublisherAdd và PublisherEdit -->
                    <router-view :refreshPublisherList="refreshPublisherList"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>