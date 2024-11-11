<template>
    <h1>Trưng bày sách</h1>
    <div class="row">
        <div class="container">
            <div class="row justify-content-center">

                <div class="d-flex justify-content-center col-12 col-sm-6 col-md-4 mb-2" v-if="this.books.length > 0"
                    v-for="(book, index) in books">
                    <div class="card" style="width: 18rem;" :key="index">
                        <img :src="book.img" class="card-img-top" :alt="book.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ book.name }}</h5>
                            <p class="card-text">Bán chạy</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Tác giả: {{ book.author }}</li>
                            <li class="list-group-item">Xuất bản: {{ book.publication_year }}</li>
                            <li class="list-group-item">Số lượng: {{ book.quantity }}</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import bookService from '@/services/book.service';
export default {
    data() {
        return {
            books: [],
        }
    },
    methods: {
        async getBooks() {
            this.books = await bookService.getAll();
        }
    },
    created() {
        this.getBooks();
    }
}
</script>