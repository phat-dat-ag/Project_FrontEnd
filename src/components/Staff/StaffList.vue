<script>
import Card from '../Card.vue';
export default {
    components: {
        Card
    },
    data() {
        return {
            newStaffList: [],
        }
    },
    props: {
        staffs: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một staff
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changeToNewStaff(staff) {
            let newInfor = {
                _id: { label: "Mã Nhân viên", },
                fullname: { label: "Họ và tên", },
                username: { label: "Tên đăng nhập", },
                title: { label: "Chức vụ", },
                address: { label: "Địa chỉ", },
            };
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: staff[key] };
            }
            return newInfor;
        },
        getNewStaffs() {
            let newStaff = [];
            this.staffs.forEach((staff) => {
                newStaff.push(this.changeToNewStaff(staff));
            });
            this.newStaffList = newStaff;
        }
    },
    created() {
        this.getNewStaffs();
    }
}
</script>
<template>
    <!-- fullname, username, password, titile, address -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(staff, index) in newStaffList" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ staff.fullname.value }}
            <div v-if="index === activeIndex">
                <Card :Infor="staff" :title="'Thông tin về nhân viên'"></Card>
                <router-link :to="{
                    name: 'staff.edit',
                    params: { id: staff._id.value },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>