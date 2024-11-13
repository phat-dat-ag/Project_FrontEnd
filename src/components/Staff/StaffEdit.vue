<template>
    <div v-if="staff">
        <h4>Hiệu chỉnh Nhân viên </h4>
        <!-- Dù updateStaff nhận tham số, nhưng nó là từ sự kiện emit mà, deleteStaff cũng vậy -->
        <!-- Để admin không được phép thay đổi và xem mật khẩu -->
        <StaffForm :isAdded="false" :staff="staff" @submit:staff="updateStaff" @delete:staff="deleteStaff" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import StaffForm from './StaffForm.vue';
import staffService from '@/services/staff.service';
export default {
    components: {
        StaffForm,
    },
    props: {
        id: { type: String, required: true },
        refreshStaffList: { type: Function },
    },
    data() {
        return {
            staff: null,
            message: "",
        };
    },
    methods: {
        async getStaff(id) {
            try {
                this.staff = await staffService.get(id);
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
        async updateStaff(data) {
            try {
                await staffService.update(this.staff._id, data);
                alert('Nhân viên được cập nhật thành công.');
                // Làm mới
                this.refreshStaffList();
                //  Điều hướng trở về trang  Nhân viên, nếu không cái form vẫn còn (còn ở /staff/edit:id)
                this.$router.push({ name: "staff" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteStaff(id) {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await staffService.delete(id);
                    alert('Nhân viên được xóa thành công.');
                    // Làm mới
                    this.refreshStaffList();
                    //  Điều hướng trở về trang  Nhân viên, nếu không cái form vẫn còn
                    this.$router.push({ name: "staff" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getStaff(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong staff
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getStaff(newId); // Gọi lại hàm lấy dữ liệu mỗi khi id thay đổi
            // console.log("Cần cập nhật " + this.staff.last_name);
        },
    },
};
</script>
