<script>
export default {
    props: {
        staff: { type: Object, required: true, }
    },
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Chi tiết Nhân viên
        </div>
        <!-- fullname, username, password, titile, address -->
        <!-- Không show password -->
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Họ và tên: {{ staff.fullname }}</li>
            <li class="list-group-item">Tên đăng nhập: {{ staff.username }}</li>
            <li class="list-group-item">Chức vụ: {{ staff.title }}</li>
            <li class="list-group-item">Địa chỉ: {{ staff.address }}</li>

        </ul>
    </div>
</template>