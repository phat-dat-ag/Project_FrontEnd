<template>
    <div>
        <h4>Thêm Nhân viên</h4>
        <!-- Dù addStaff nhận tham số, nhưng nó là từ sự kiện emit mà -->
        <StaffForm :staff="staff" @submit:staff="addStaff" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import StaffForm from "./StaffForm.vue";
import staffService from "@/services/staff.service";
export default {
    components: {
        StaffForm,
    },
    props: {
        refreshStaffList: { type: Function },
    },
    data() {
        return {
            staff: {},
            message: "",
        };
    },
    methods: {
        async addStaff(data) {
            try {
                await staffService.create(data);
                alert(`Đã thêm Nhân viên.`);
                // Làm mới
                this.refreshStaffList();
                // Điều hướng trở về trang  Nhân viên, nếu không cái form vẫn còn (còn ở /staff/add)
                this.$router.push({ name: "staff" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
