<script>
export default {
    props: {
        publisher: { type: Object, required: true, }
    },
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Chi tiết Nhà xuất bản
        </div>
        <!-- address, name -->
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Tên nhà xuất bản: {{ publisher.name }}</li>
            <li class="list-group-item">Địa chỉ: {{ publisher.address }}</li>
        </ul>
    </div>
</template>
