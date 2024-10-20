<script>
export default {
    props: {
        book: { type: Object, required: true, }
    },
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            Chi tiết sách
        </div>
        <!-- name, price, quantity, publication_year, author -->
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Tên sách: {{ book.name }}</li>
            <li class="list-group-item">Giá sách: {{ book.price }} VND</li>
            <li class="list-group-item">Số lượng: {{ book.quantity }}</li>
            <li class="list-group-item">Năm xuất bản: {{ book.publication_year }}</li>
            <li class="list-group-item">Tác giả: {{ book.author }}</li>
        </ul>
    </div>
</template>
