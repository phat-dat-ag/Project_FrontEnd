<script>
import publisherService from '@/services/publisher.service';
import Card from '../Card.vue';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { BOOK_TYPE } from '@/constants/form.constants';
export default {
    components: {
        Card
    },
    data() {
        return {
            newBookList: [],
        }
    },
    props: {
        books: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một book
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changeToNewBook(book) {
            let newInfor = {
                _id: { label: "Mã sách", },
                name: { label: "Tên sách" },
                author: { label: "Tác giả" },
                price: { label: "Giá sách" },
                quantity: { label: "Số lượng" },
                publisher_name: { label: "Nhà xuất bản" },
                publication_year: { label: "Năm xuất bản" },
            };
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: book[key] };
            }
            return newInfor;
        },
        async getNewBooks() {
            let newBooks = [];
            for (let book of this.books) {
                const publisher = await publisherService.get(book.publisher_id);
                const tempBook = {
                    ...book,
                    publisher_name: publisher.name,
                }
                newBooks.push(this.changeToNewBook(tempBook));
            }
            this.newBookList = newBooks;
        },
        handleClickUpdateButton() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(BOOK_TYPE);
        }
    },
    // Danh sách hiển thị cần thay đổi thì cập nhật
    // Hỗ trợ refresh
    watch: {
        books() {
            this.newBookList = [];
            this.getNewBooks();
        }
    },
    created() {
        this.getNewBooks();
    }
}
</script>

<template>
    <!-- name, price, quantity, publication_year, author -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(book, index) in newBookList" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ book.name.value }}
            <div v-if="index === activeIndex">
                <Card :Infor="book" :title="'Thông tin về sách'"></Card>
                <router-link :to="{
                    name: 'entity.edit',
                    params: { id: book._id.value },
                }">
                    <button class="btn btn-warning" @click="handleClickUpdateButton">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
