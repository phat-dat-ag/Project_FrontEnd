<template>
    <h1>Trưng bày sách</h1>
    <div class="container">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center col-12 col-sm-6 col-md-4 mb-2" v-if="this.bookList.length > 0"
                v-for="(book, index) in bookList">
                <CardItem :index_key="index" :book="book" :isReader="isReader"></CardItem>
            </div>
        </div>
    </div>
</template>
<script>
import CardItem from '@/components/CardItem.vue';
import { USER_READER } from '@/constants/registerform.constant';
import bookService from '@/services/book.service';
import publisherService from '@/services/publisher.service';
import { useUserRoleStore } from '@/stores/user_role_stores';
export default {
    data() {
        return {
            bookList: [],
            publishers: [],
            isReader: false,
        }
    },
    components: { CardItem, },
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
        },
    },
    created() {
        this.getBooks();
        this.getBookList();
        const userRole = useUserRoleStore();
        this.isReader = userRole.getUserRole === USER_READER;
    }
}
</script>