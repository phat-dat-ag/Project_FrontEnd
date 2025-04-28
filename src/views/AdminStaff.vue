<script>
import InputSearch from '@/components/InputSearch.vue';
import StaffList from '@/components/Staff/StaffList.vue';
import staffService from '@/services/staff.service';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { STAFF_TYPE } from '@/constants/form.constants';
export default {
    components: {
        InputSearch, StaffList,
    },
    data() {
        return {
            staffs: [],
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
        // Danh sách các chuỗi: Chuyển toàn bộ thông tin (trừ ID và password) của mỗi staff thành 1 chuỗi để tiện cho chức năng tìm kiếm
        staffStrings() {
            return this.staffs.map((staff) => {
                const { fullname, username, title, address } = staff;
                return [fullname, username, title, address].join("");
            });
        },
        // Chức năng tìm kiếm
        filteredStaffs() {
            if (!this.searchText)
                return this.staffs;
            return this.staffs.filter((_staff, index) => {
                return this.staffStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các staff tìm được
        filteredStaffsCount() {
            return this.filteredStaffs.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng staff từ CSDL
        async retrieveStaffList() {
            try {
                this.staffs = await staffService.getAll();
                // console.log(this.staffs);
            } catch (error) {
                console.log(error);
            }
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshStaffList() {
            this.retrieveStaffList();
            this.activeIndex = -1;
            this.searchText = "";
            // Đưa về trang Staff luôn
            this.$router.push({ name: "staff" });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ các staff
        async removeStaffList() {
            if (confirm("Xóa hết các Nhân viên?")) {
                try {
                    await staffService.deleteAll();
                    this.refreshStaffList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddStaff() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(STAFF_TYPE);
            this.$router.push({ name: "entity.add" });
        }
    },
    mounted() {
        // Khi vừa mount là refresh, => lấy dữ liệu từ CSDL
        this.refreshStaffList();
    }
}
</script>
<template>
    <h1>Quản lý Nhân viên</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- StaffList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->

                <div class="col-12 col-md-6">
                    <h4>Danh sách Nhân viên</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshStaffList()">Làm mới</button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddStaff()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removeStaffList()">Xóa tất cả</button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <StaffList v-if="filteredStaffsCount > 0" :staffs="filteredStaffs"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Không có Nhân viên nào.</p>
                </div>

                <!-- StaffCard và StaffEdit: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">

                </div>
            </div>
        </div>
    </div>
</template>