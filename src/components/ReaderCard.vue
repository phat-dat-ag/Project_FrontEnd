<script>
export default {
    props: {
        reader: { type: Object, required: true, }
    },
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Chi tiết liên hệ
        </div>
        <!-- address, birthday, favorite, first_name, last_name, phone, sex -->
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Họ và tên: {{ `${reader.first_name} ${reader.last_name}` }}</li>
            <li class="list-group-item">Sinh nhật: {{ reader.birthday }}</li>
            <li class="list-group-item">Giới tính: {{ reader.sex }}</li>
            <li class="list-group-item">Địa chỉ {{ reader.address }}</li>
            <li class="list-group-item">Liên lạc: {{ reader.phone }}</li>
        </ul>
    </div>
</template>