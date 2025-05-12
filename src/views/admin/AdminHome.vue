<template>
    <h1>Trưng bày sách</h1>
    <div class="container">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center col-12 col-sm-6 col-md-4 mb-2" v-if="this.bookList.length > 0"
                v-for="(book, index) in bookList">
                <div class="card" style="width: 18rem;" :key="index">
                    <img :src="book.img" class="card-img-top" :alt="book.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ book.name }}</h5>
                        <p class="card-text">Bán chạy</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Tác giả: {{ book.author }}</li>
                        <li class="list-group-item">Xuất xứ: {{ book.publisher_name }}</li>
                        <li class="list-group-item">Xuất bản: {{ book.publication_year }}</li>
                        <li class="list-group-item">Số lượng: {{ book.quantity }}</li>
                        <li class="list-group-item">Giá: {{ book.price }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bookService from '@/services/book.service';
import publisherService from '@/services/publisher.service';
export default {
    data() {
        return {
            bookList: [],
            publishers: [],
        }
    },
    methods: {
        async getBooks() {
            return await bookService.getAll();
        },
        async getPublisherOf(book) {
            return await publisherService.get(book.publisher_id);
        },
        async getBookList() {
            let books = await this.getBooks();
            for (let book of books) {
                const publisher = await this.getPublisherOf(book);
                this.bookList.push({
                    ...book,
                    publisher_name: publisher.name,
                })
            }
        }
    },
    created() {
        this.getBooks();
        this.getBookList();
    }
}
</script>